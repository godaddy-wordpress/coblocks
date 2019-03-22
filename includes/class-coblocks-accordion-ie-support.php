<?php
/**
 * Load assets and meta for browser legacy support
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

		add_action( 'wp_enqueue_scripts', array( $this, 'load_assets' ) );
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function load_assets() {
		global $post;

		//load only of post ID exists
		if( isset( $post->ID ) ){
			$legacy_support = get_post_meta( $post->ID, '_coblocks_accordion_ie_support', true );

			if ( "'true'" === $legacy_support ) {
				$dir = CoBlocks()->asset_source( 'js' );

				wp_enqueue_script(
					$this->_slug . '-accordion-polyfill',
					$dir . $this->_slug . '-accordion-polyfill' . COBLOCKS_ASSET_SUFFIX . '.js',
					array(),
					$this->_version,
					true
				);
			}
		}
	}
}

CoBlocks_Accordion_IE_Support::register();
