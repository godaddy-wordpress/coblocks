<?php
/**
 * Load assets and meta for browser legacy support.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our accordion polyfill
 *
 * @since 1.0.0
 */
class CoBlocks_Accordion_IE_Support {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Accordion_IE_Support
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Accordion_IE_Support();
		}
	}

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $url
	 */
	private $url;

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
		$this->url  = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'load_assets' ) );
		add_action( 'the_post', array( $this, 'load_assets' ) );
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function load_assets() {

		global $post;

		// Validate Post ID.
		if ( ! isset( $post->ID ) || empty( $post->ID ) ) {

			return;

		}

		$legacy_support = get_post_meta( $post->ID, '_coblocks_accordion_ie_support', true );

		// Determine whether a $post contains an Accordion block.
		if ( has_block( 'coblocks/accordion' ) && "'true'" === $legacy_support ) {

			$dir = CoBlocks()->asset_source( 'js' );

			wp_enqueue_script(
				$this->slug . '-accordion-polyfill',
				$dir . $this->slug . '-accordion-polyfill.js',
				array(),
				COBLOCKS_VERSION,
				true
			);
		}
	}
}

CoBlocks_Accordion_IE_Support::register();
