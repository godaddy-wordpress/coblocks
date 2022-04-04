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

		add_action( 'init', array( $this, 'is_go_theme_active' ) );
		add_action( 'init', array( $this, 'is_go_theme_installed' ) );
		add_action( 'init', array( $this, 'get_themes_php_uri' ) );

	}

	/**
	 * Go theme is active.
	 *
	 * @since 2.24.4
	 * @return boolean
	 */
	public function is_go_theme_active() {
		$template_part      = explode( 'themes/', esc_attr( wp_get_theme( get_template() )->get_template() ) );
		$active_template    = isset( $template_part ) && isset( $template_part[1] ) ? $template_part[1] : false;
		$active_theme_is_go = 'go' === $active_template;
		return $active_theme_is_go;
	}

	/**
	 * Go theme is installed.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public function is_go_theme_installed() {
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
	public function get_themes_php_uri() {
		return admin_url( 'themes.php' );
	}

	/**
	 * Go theme installation page.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public function get_themes_install_php_go_uri() {
		return admin_url( 'theme-install.php?theme=go' );
	}

	/**
	 * Go theme details page.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public function get_go_theme_details_uri() {
		return get_themes_php_uri() . '?theme=go';
	}

	/**
	 * Get `wpnux_export_data` option for Launch Guide eligibility.
	 *
	 * `get_option` returns boolean false if option does not exist. If option exists we have a good export.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public function get_site_export_status() {
		return get_option( 'wpnux_export_data' ) === false ? false : true;
	}

}

CoBlocks_Labs::register();
