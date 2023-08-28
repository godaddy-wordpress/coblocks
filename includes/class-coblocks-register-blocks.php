<?php
/**
 * Register blocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load registration for our blocks.
 *
 * @since 1.6.0
 */
class CoBlocks_Register_Blocks {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Register_Blocks
	 */
	private static $instance;

	/**
	 * This plugin's CoBlocks Form class instance.
	 *
	 * @var CoBlocks_Form
	 */
	private static $coblocks_form;

	/**
	 * Registers the plugin.
	 *
	 * @return CoBlocks_Register_Blocks
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Register_Blocks();

			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-form.php';
			self::$coblocks_form = new CoBlocks_Form();
		}

		return self::$instance;
	}

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->slug = 'coblocks';

		add_action( 'init', array( $this, 'register_blocks' ), 99 );
	}

	/**
	 * Get the path of the block metadata file (block.json) for a given block.
	 *
	 * @param string $block_name     The name of the block to look for.
	 * @param bool   $is_child_block A flag indicating whether the block is a child block or not.
	 *
	 * @return string|array The path to the block metadata file, or an array of paths if not found.
	 */
	public function get_block_metadata_path( $block_name, $is_child_block ) {
		$blocks_base_path = COBLOCKS_PLUGIN_DIR . 'src/blocks/';
		$path_pattern     = $is_child_block ? '*/' . $block_name . '/block.json' : $block_name . '/block.json';

		$file_glob = glob( $blocks_base_path . $path_pattern, GLOB_NOSORT );

		if ( $is_child_block && ! isset( $file_glob[0] ) ) {
			$file_glob = glob( $blocks_base_path . '*/' . $path_pattern, GLOB_NOSORT );
		}

		return isset( $file_glob[0] ) ? $file_glob[0] : $file_glob;
	}

	/**
	 * Load block metadata from block.json file.
	 *
	 * @param string $block_name     The name of the block.
	 * @param bool   $is_child_block Optional. Set to true if it's a child block. Default false.
	 *
	 * @return array The block metadata or an empty JSON object if no content is found.
	 */
	public function load_block_metadata( $block_name, $is_child_block = false ) {

		$file_path = $this->get_block_metadata_path( $block_name, $is_child_block );
		$metadata  = json_decode( '{}', true );

		if ( file_exists( $file_path ) ) {
			ob_start();
			include $file_path;
			$file_metadata = json_decode( ob_get_clean(), true );
			$metadata      = $file_metadata;
		}

		return $metadata;
	}

	/**
	 * Some blocks are conditionally registered this function determines if block should be conditional.
	 * Returns true if restricted and false otherwise.
	 *
	 * @param string $path The path to the block.json file.
	 * @return bool
	 */
	public function is_excluded_block_filepaths( $path ) {
		$restricted = array( '/gallery-masonry/v1' );
		foreach ( $restricted as $r ) {
			if ( strpos( $path, $r ) !== false ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Build a block manifest. The resulting array is used to register blocks and parses block.json files.
	 * For now we need to collect the `render` property from the block.json files and require manually.
	 *
	 * @return array The block manifest or an empty array if no content is found.
	 */
	public function load_block_manifest() {
		$block_json_paths = array(
			COBLOCKS_PLUGIN_DIR . 'src/blocks/*/block.json',
			COBLOCKS_PLUGIN_DIR . 'src/blocks/*/*/block.json',
			COBLOCKS_PLUGIN_DIR . 'src/blocks/form/fields/*/block.json',
		);

		$manifest = array();
		foreach ( $block_json_paths as $block_json_path ) {
			$block_json_files = glob( $block_json_path, GLOB_NOSORT );
			foreach ( $block_json_files as $block_json_file ) {
				// We conditionally load some block for backward compat.
				if ( $this->is_excluded_block_filepaths( $block_json_file ) ) {
					continue;
				}

				$block_json                              = json_decode( file_get_contents( $block_json_file ), true );
				$manifest[ $block_json['name'] ]['path'] = str_replace( '/block.json', '', $block_json_file );

				if ( isset( $block_json['render'] ) ) {
					$manifest[ $block_json['name'] ]['render_callback'] = $block_json['render'];
				}
			}
		}

		return $manifest;
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug   = $this->slug;
		$blocks = $this->load_block_manifest();
		foreach ( $blocks as $block_name => $block_options ) {

			// Bulk styles for blocks. `style-coblocks-1` AKA `coblocks-frontend`.
			// We need to split the styles and specify the handle for each block in the block.json file.
			// For now we have all style files combined into either editor or frontend styles.
			$default_options = array(
				'editor_style' => $slug . '-editor',
				'style'        => $slug . '-frontend',
			);

			// Block has a render_callback defined.
			if ( isset( $block_options['render_callback'] ) ) {

				// Include the render_callback.
				$render_callback_require_path = $block_options['path'] . '/' . $block_options['render_callback'];
				if ( file_exists( $render_callback_require_path ) ) {
					require_once $render_callback_require_path;
				}
				$render_callback_block_name = str_replace( array( '-', '/' ), array( '_', '_' ), $block_name );
				$render_callback_handle     = "coblocks_render_{$render_callback_block_name}_block";

				// Most SSR blocks have render_callback defined in the block index.php.
				if ( function_exists( $render_callback_handle ) ) {
					$default_options['render_callback'] = $render_callback_handle;
				}

				// Some blocks like Form and child Field blocks have render_callback defined in the CoBlocks_Form class.
				if ( class_exists( 'CoBlocks_Form' ) && method_exists( 'CoBlocks_Form', $render_callback_handle ) ) {
					$default_options['render_callback'] = array( self::$coblocks_form, $render_callback_handle );
				}
			}

			// Register the block.
			register_block_type(
				$block_options['path'] . '/block.json',
				$default_options
			);

		}
	}
}

CoBlocks_Register_Blocks::register();
