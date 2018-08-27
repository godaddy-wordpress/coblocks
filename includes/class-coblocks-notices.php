<?php
/**
 * Admin notices.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Notice Class
 *
 * @since 1.0.3
 */
class CoBlocks_Notices {

	/**
	 * This class's instance.
	 *
	 * @var CoBlocks_Notices
	 */
	private static $instance;

	/**
	 * Registers the class.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Notices();
			self::$instance->includes();
		}
	}

	/**
	 * Setup the class.
	 *
	 * @access public
	 * @since  1.1.5
	 * @return void
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'notices' ) );
	}

	/**
	 * Include required files.
	 *
	 * @access private
	 * @since 1.1.5
	 * @return void
	 */
	private function includes() {
		require_once plugin_dir_path( __FILE__ ) . '/vendors/dismiss-notices/dismiss-notices.php';
	}

	/**
	 * Fire dashboard notices.
	 *
	 * @access public
	 * @since 1.1.5
	 * @return void
	 */
	public function notices() {
		add_action( 'admin_init', array( 'PAnD', 'init' ) );
		add_action( 'admin_notices', array( $this, 'theme_notice' ) );
	}

	/**
	 * Reccommend the CoBlocks WordPress theme, if the theme is not installed.
	 *
	 * @access public
	 */
	public function theme_notice() {

		// Do not show the notice if it has been dismissed.
		if ( ! PAnD::is_admin_notice_active( 'dismiss-coblocks-theme-notice' ) ) {
			return;
		}

		// Return if the CoBlocks theme is activated.
		if ( array_key_exists( 'coblocks', wp_get_themes() ) && function_exists( 'coblocks_setup' ) ) {
			return;
		}

		// Return if the 'ThemeBeans' is the theme author.
		$theme = wp_get_theme();

		if ( 'ThemeBeans' === $theme->get( 'Author' ) ) {
			return;
		}

		// Only display on the dashboard and plugins pages.
		$screen = get_current_screen();

		if ( isset( $screen->base ) && 'themes' !== $screen->base && 'plugins' !== $screen->base && 'dashboard' !== $screen->base ) {
			return;
		}

		// Check if the CoBlocks theme is activated or not.
		if ( array_key_exists( 'coblocks', wp_get_themes() ) && ! function_exists( 'coblocks_setup' ) ) {

			$action = esc_html__( 'Activate', '@@textdomain' );

			// Set the URL to run the theme activation.
			$url = wp_nonce_url(
				add_query_arg(
					array(
						'action'     => 'activate',
						'stylesheet' => 'coblocks',
					),
					admin_url( 'themes.php' )
				),
				'switch-theme_coblocks'
			);

		} else {
			$action = esc_html__( 'Install', '@@textdomain' );

			// Set the URL to run the theme installation.
			$url = wp_nonce_url(
				add_query_arg(
					array(
						'action' => 'install-theme',
						'theme'  => 'coblocks',
					),
					admin_url( 'update.php' )
				),
				'install-theme_coblocks'
			);
		}

		// Generate the call to action link.
		// translators: %1$s: Activate, or Install.
		$link = '<a href="' . esc_url( $url ) . '">' . sprintf( esc_html__( '%1$s the CoBlocks WordPress theme &rarr;', '@@textdomain' ), $action ) . '</a>';

		// Array of allowed HTML.
		$allowed_html_array = array(
			'a' => array(
				'href'   => array(),
				'target' => array(),
			),
		);

		// translators: %1$s: The action link.
		echo '<div data-dismissible="dismiss-coblocks-theme-notice" class="notice notice-info is-dismissible"><p>' . wp_kses( sprintf( __( 'We\'ve built a companion WordPress theme for the CoBlocks plugin. %1$s', '@@textdomain' ), $link ), $allowed_html_array ) . '</p></div>';
	}
}

CoBlocks_Notices::register();
