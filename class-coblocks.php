<?php
/**
 * Plugin Name: CoBlocks
 * Description: CoBlocks is a suite of professional <strong>page building content blocks</strong> for the WordPress Gutenberg block editor. Our blocks are hyper-focused on empowering makers to build beautifully rich pages in WordPress.
 * Author: GoDaddy
 * Author URI: https://www.godaddy.com
 * Version: 3.0.4
 * Text Domain: coblocks
 * Domain Path: /languages
 * Tested up to: 6.2
 *
 * CoBlocks is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with CoBlocks. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'COBLOCKS_VERSION', '3.0.4' );
define( 'COBLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'COBLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'COBLOCKS_PLUGIN_FILE', __FILE__ );
define( 'COBLOCKS_PLUGIN_BASE', plugin_basename( __FILE__ ) );
define( 'COBLOCKS_REVIEW_URL', 'https://wordpress.org/support/plugin/coblocks/reviews/?filter=5' );
define( 'COBLOCKS_API_NAMESPACE', 'coblocks' );

if ( ! class_exists( 'CoBlocks' ) ) :
	/**
	 * Main CoBlocks Class.
	 *
	 * @since 1.0.0
	 */
	final class CoBlocks {
		/**
		 * This plugin's instance.
		 *
		 * @var CoBlocks
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Main CoBlocks Instance.
		 *
		 * Insures that only one instance of CoBlocks exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @return object|CoBlocks The one true CoBlocks
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof CoBlocks ) ) {
				self::$instance = new CoBlocks();
				self::$instance->init();
				self::$instance->includes();
			}
			return self::$instance;
		}

		/**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'coblocks' ), '1.0' );
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'coblocks' ), '1.0' );
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			// Traits.
			require_once COBLOCKS_PLUGIN_DIR . 'includes/traits/trait-coblocks-singleton.php';

			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-block-patterns.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-block-assets.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-register-blocks.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-generated-styles.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-body-classes.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-form.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-font-loader.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-post-meta.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-google-map-block.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-accordion-ie-support.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-settings.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-labs.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/get-dynamic-blocks.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/ical-parser/class-coblocks-event.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/ical-parser/class-coblocks-ical.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-site-design.php';
			require_once COBLOCKS_PLUGIN_DIR . 'includes/class-coblocks-site-content.php';

			// Require CoBlocks custom filters.
			require_once COBLOCKS_PLUGIN_DIR . 'src/components/gutter-control/gutter-wrapper.php';
			require_once COBLOCKS_PLUGIN_DIR . 'src/components/form-label-colors/label-color-wrapper.php';

			// Forced Block Migration Processor.
			require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/loader.php';

			if ( is_admin() ) {
				require_once COBLOCKS_PLUGIN_DIR . 'src/extensions/layout-selector/index.php';
				require_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-plugin-deactivation.php';
			}

			if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
				require_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-action-links.php';
				require_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-install.php';
				require_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-crop-settings.php';
			}

			// StylesLoader.
			require_once COBLOCKS_PLUGIN_DIR . 'includes/Dependencies/GoDaddy/Styles/StylesLoader.php';
			GoDaddy\WordPress\Plugins\CoBlocks\Dependencies\GoDaddy\Styles\StylesLoader::getInstance()->setBasePath( COBLOCKS_PLUGIN_DIR . 'includes/Dependencies/GoDaddy/Styles/' );
			GoDaddy\WordPress\Plugins\CoBlocks\Dependencies\GoDaddy\Styles\StylesLoader::getInstance()->setBaseUrl( COBLOCKS_PLUGIN_URL . 'includes/Dependencies/GoDaddy/Styles/' );
			add_action( 'plugins_loaded', array( GoDaddy\WordPress\Plugins\CoBlocks\Dependencies\GoDaddy\Styles\StylesLoader::getInstance(), 'boot' ) );
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init() {
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 99 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_localization' ) );
		}

		/**
		 * Returns URL to the asset path.
		 *
		 * @param string $path Any extra directories needed.
		 */
		public function asset_source( $path = null ) {
			return COBLOCKS_PLUGIN_URL . trailingslashit( path_join( 'dist', $path ) );
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'coblocks', false, basename( COBLOCKS_PLUGIN_DIR ) . '/languages' );
		}

		/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		public function block_localization() {
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'coblocks-editor', 'coblocks', COBLOCKS_PLUGIN_DIR . '/languages' );
			}
		}

		/**
		 * Is an AMP endpoint.
		 *
		 * @return bool Whether the current response will be AMP.
		 */
		public function is_amp() {
			return function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();
		}
	}
endif;

/**
 * The main function for that returns CoBlocks
 *
 * The main function responsible for returning the one true CoBlocks
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $coblocks = CoBlocks(); ?>
 *
 * @since 1.0.0
 * @return object|CoBlocks The one true CoBlocks Instance.
 */
function coblocks() {
	return CoBlocks::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if ( function_exists( 'is_multisite' ) && is_multisite() ) {
	add_action( 'plugins_loaded', 'coblocks', 90 );
} else {
	coblocks();
}
