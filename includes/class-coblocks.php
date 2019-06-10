<?php
/**
 * CoBlocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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
				self::$instance->init_hooks();
				self::$instance->constants();
				self::$instance->asset_suffix();
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
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheating huh?', 'coblocks' ), '1.0' );
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
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheating huh?', 'coblocks' ), '1.0' );
		}

		/**
		 * Define constant if not already set.
		 *
		 * @param  string|string $name Name of the definition.
		 * @param  string|bool   $value Default value.
		 */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		/**
		 * Setup plugin constants.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function constants() {
			$this->define( 'COBLOCKS_VERSION', '1.10.0' );
			$this->define( 'COBLOCKS_HAS_PRO', false );
			$this->define( 'COBLOCKS_ABSPATH', dirname( COBLOCKS_PLUGIN_FILE ) . '/' );
			$this->define( 'COBLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
			$this->define( 'COBLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			$this->define( 'COBLOCKS_PLUGIN_BASE', plugin_basename( __FILE__ ) );
			$this->define( 'COBLOCKS_SHOP_URL', 'https://coblocks.com/' );
			$this->define( 'COBLOCKS_REVIEW_URL', 'https://wordpress.org/support/plugin/coblocks/reviews/?filter=5' );
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-block-assets.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-block-assets.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-register-blocks.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-generated-styles.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-body-classes.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-form.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-font-loader.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-post-meta.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-google-map-block.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-accordion-ie-support.php';
			include_once COBLOCKS_ABSPATH . 'includes/class-coblocks-block-settings.php';
			include_once COBLOCKS_ABSPATH . 'includes/get-dynamic-blocks.php';

			if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) ) {
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-getting-started-page.php';
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-action-links.php';
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-admin-footer.php';
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-feedback.php';
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-install.php';
				include_once COBLOCKS_ABSPATH . 'includes/admin/class-coblocks-url-generator.php';
			}
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init_hooks() {
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 99 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_localization' ) );
		}

		/**
		 * Change the plugin's minified or src file name, based on debug mode.
		 *
		 * @since 1.0.0
		 */
		public function asset_suffix() {

			$suffix = SCRIPT_DEBUG ? null : '.min';

			$this->define( 'COBLOCKS_ASSET_SUFFIX', $suffix );
		}

		/**
		 * If debug is on, serve unminified source assets.
		 *
		 * @since 1.0.0
		 * @param string|string $type The type of resource.
		 * @param string|string $directory Any extra directories needed.
		 */
		public function asset_source( $type = 'js', $directory = null ) {

			if ( 'js' === $type ) {
				if ( SCRIPT_DEBUG ) {
					return plugins_url( 'src/' . $type . '/' . $directory, COBLOCKS_PLUGIN_FILE );
				} else {
					return plugins_url( 'dist/' . $type . '/' . $directory, COBLOCKS_PLUGIN_FILE );
				}
			} else {
				return plugins_url( 'dist/css/' . $directory, COBLOCKS_PLUGIN_FILE );
			}
		}

		/**
		 * Get the plugin url.
		 *
		 * @return string
		 */
		public function plugin_url() {
			return untrailingslashit( plugins_url( '/', COBLOCKS_PLUGIN_FILE ) );
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'coblocks', false, plugin_basename( dirname( COBLOCKS_PLUGIN_FILE ) ) . '/languages/' );
		}

		/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		public function block_localization() {
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'coblocks-editor', 'coblocks' );
			}
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
