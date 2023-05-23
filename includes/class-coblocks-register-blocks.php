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
	public function get_block_metadata_path( $block_name, $is_child_block = false ) {
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
		$slug = $this->slug;

		register_block_type(
			$slug . '/accordion',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/alert',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/author',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/click-to-tweet',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/dynamic-separator',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gif',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/highlight',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gallery-carousel',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gallery-masonry',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gallery-stacked',
			array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);

		require_once COBLOCKS_PLUGIN_DIR . 'src/blocks/search/index.php';
		// Begin block.json registration.
		register_block_type(
			$this->get_block_metadata_path( 'search' ),
			array(
				'render_callback' => 'coblocks_render_coblocks_search_block',
			)
		);
	}
}

CoBlocks_Register_Blocks::register();
