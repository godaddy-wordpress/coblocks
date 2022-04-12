<?php
/**
 * Register CoBlocks Labs
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 2.0.0
 */
class CoBlocks_Labs {
	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Labs
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CoBlocks_Labs
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Labs();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'init', array( $this, 'propagate_settings' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );

	}

	/**
	 * Go theme is active.
	 *
	 * @since 2.24.4
	 * @return boolean
	 */
	public static function is_go_theme_active() {
		$template_part      = explode( 'themes/', esc_attr( wp_get_theme( get_template() )->get_template() ) );
		$active_template    = isset( $template_part ) && isset( $template_part[0] ) ? $template_part[0] : false;
		$active_theme_is_go = 'go' === $active_template;
		return $active_theme_is_go;
	}

	/**
	 * Go theme is installed.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function is_go_theme_installed() {
		$go_theme_path   = get_theme_root() . '/go/index.php';
		$is_go_installed = file_exists( $go_theme_path );
		return $is_go_installed;
	}

	/**
	 * Site themes.php page.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function get_themes_php_uri() {
		return admin_url( 'themes.php' );
	}

	/**
	 * Go theme installation page.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function get_themes_install_php_go_uri() {
		return admin_url( 'theme-install.php?theme=go' );
	}

	/**
	 * Go theme details page.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function get_go_theme_details_uri() {
		return self::get_themes_php_uri() . '?theme=go';
	}

	/**
	 * Get `wpnux_export_data` option for Launch Guide eligibility.
	 *
	 * `get_option` returns boolean false if option does not exist. If option exists we have a good export.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function get_site_export_status() {
		return get_option( 'wpnux_export_data' ) === false ? false : true;
	}

	/**
	 * Function get_coblocks_labs_data is used to set a global object
	 * `coblocksLabs` with relevant data.
	 *
	 * @since 2.22.4
	 * @return array Array of relevant CoBlocks labs data.
	 */
	public static function get_coblocks_labs_data() {
		return array(
			'isGoThemeActive'     => self::is_go_theme_active(),
			'isGoThemeInstalled'  => self::is_go_theme_installed(),
			'goThemeInstallUri'   => self::get_themes_install_php_go_uri(),
			'goThemeDetailsUri'   => self::get_go_theme_details_uri(),
			'launchGuideEligible' => self::get_site_export_status(),
			'isLabsEnabled'       => apply_filters( 'coblocks_labs_controls_enabled', false ),
		);
	}

	/**
	 * Register CoBlocks labs settings for Site Design and Site Content.
	 *
	 * @access public
	 */
	public function register_settings() {

		register_setting(
			'coblocks_site_design_controls_enabled',
			'coblocks_site_design_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable typography controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => false,
			)
		);

		register_setting(
			'coblocks_site_content_controls_enabled',
			'coblocks_site_content_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable custom color controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => false,
			)
		);

	}

	/**
	 * Propagate settings controls for Site Design.
	 * Disable Layout Selector and Site Design controls depending on Go.
	 *
	 * @access public
	 */
	public function propagate_settings() {
		$go_installed = self::is_go_theme_installed();
		$go_active    = self::is_go_theme_active();

		if ( ! $go_installed || ! $go_active ) {
			update_option( 'coblocks_site_design_controls_enabled', 0 );
			update_option( 'coblocks_layout_selector_controls_enabled', 0 );
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {
		wp_localize_script(
			'coblocks-editor',
			'coblocksLabs',
			self::get_coblocks_labs_data()
		);
	}

}

CoBlocks_Labs::register();
