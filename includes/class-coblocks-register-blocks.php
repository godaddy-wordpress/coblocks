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
	 * Registers the plugin.
	 *
	 * @return CoBlocks_Register_Blocks
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Register_Blocks();
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
	 * Load block manifest from block-manifest.json file.
	 *
	 * @return array The block manifest or an empty array if no content is found.
	 */
	public function load_block_manifest() {
		$manifest_path = dirname( __DIR__ ) . '/block-manifest.json';
		$manifest      = array();

		if ( file_exists( $manifest_path ) ) {
			$manifest = json_decode( file_get_contents( $manifest_path ), true );
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
			$default_options = array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			);

			$path_to_block_json = $this->get_block_metadata_path( $block_name, $block_options['child'] ?? false );

			// Load block attributes from block.json file.
			if ( isset( $block_options['attributes'] ) && $block_options['attributes'] ) {
				$metadata                      = $this->load_block_metadata( $block_name, $block_options['child'] ?? false );
				$default_options['attributes'] = $metadata['attributes'];
			}

			// Script can be boolean true or array of script handles/paths using file:.
			if ( isset( $block_options['script'] ) ) {
				if ( is_bool( $block_options['script'] ) && $block_options['script'] ) {
					$default_options['script'] = "coblocks-{$block_name}-script";
				} elseif ( is_array( $block_options['script'] ) ) {
					$default_options['script'] = $block_options['script'];
				}
			}

			// Script can be boolean true or array of script handles/paths using file:.
			if ( isset( $block_options['view_script'] ) ) {
				if ( is_bool( $block_options['view_script'] ) && $block_options['view_script'] ) {
					$default_options['view_script'] = "coblocks-{$block_name}-script";
				} elseif ( is_array( $block_options['view_script'] ) ) {
					$default_options['view_script'] = $block_options['view_script'];
				}
			}

			// Get render callback should be named "coblocks_render_{$render_callback_block_name}_block".
			if ( isset( $block_options['render_callback'] ) ) {
				$path_to_block = str_replace( '/block.json', '', $path_to_block_json );
				// Include the render_callback.
				if ( file_exists( "{$path_to_block}/index.php" ) ) {
					require_once "{$path_to_block}/index.php";
				}
				$render_callback_block_name         = str_replace( '-', '_', $block_name );
				$default_options['render_callback'] = "coblocks_render_{$render_callback_block_name}_block";
			}

			register_block_type(
				$path_to_block_json,
				$default_options
			);
		}
	}
}

CoBlocks_Register_Blocks::register();
