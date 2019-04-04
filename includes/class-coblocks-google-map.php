<?php
/**
 * Load assets and meta for Google Map Block
 *
 * @package   CoBlocks
 * @author    Rich Tabor & Jeffrey Carandang from CoBlocks
 * @link      https://coblocks.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our Google Map blocks.
 *
 * @since 1.0.0
 */
class CoBlocks_Block_GoogleMap {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Block_GoogleMap
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_GoogleMap();
		}
	}

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The Plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The Plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_version = COBLOCKS_VERSION;
		$this->_slug    = 'coblocks';
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'map_assets' ) );
		add_action( 'the_post', array( $this, 'map_assets' ) );
		add_action( 'init', array( $this, 'register_settings' ) );
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function map_assets() {

		// Retrieve the Google Maps API key.
		$key = get_option( 'coblocks_google_maps_api_key' );

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );

		// Determine whether a $post contains a Map block.
		if ( has_block( 'coblocks/map' ) && $key ) {

			wp_enqueue_script(
				$this->_slug . '-google-maps',
				$dir . $this->_slug . '-google-maps' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);

			wp_enqueue_script(
				$this->_slug . '-google-maps-api',
				'https://maps.googleapis.com/maps/api/js?key=' . esc_url( $key ),
				array( $this->_slug . '-google-maps' ),
				$this->_version,
				true
			);

			wp_localize_script( $this->_slug . '-google-maps', 'baAtts', array( 'url' => $this->_url ) );
		}
	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_google_maps_api_key',
			'coblocks_google_maps_api_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google Map API key for map rendering', '@@textdomain' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}

}

CoBlocks_Block_GoogleMap::register();
