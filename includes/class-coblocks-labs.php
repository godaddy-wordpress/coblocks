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
	public static function is_go_active() {
		return defined( 'GO_VERSION' ) && 'go' === get_option( 'stylesheet' );
	}

	/**
	 * Go theme is installed.
	 *
	 * @since 2.22.4
	 * @return string
	 */
	public static function is_go_installed() {
		$go_theme_path   = get_theme_root() . '/go/index.php';
		$is_go_installed = file_exists( $go_theme_path );
		return $is_go_installed;
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
		$go_active = self::is_go_active();

		if ( ! $go_active ) {
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
			array(
				'isGoThemeActive'     => self::is_go_active(),
				'isGoThemeInstalled'  => self::is_go_installed(),
				'goThemeInstallUri'   => admin_url( 'theme-install.php?theme=go' ),
				'goThemeDetailsUri'   => admin_url( 'themes.php' ) . '?theme=go',
				'launchGuideEligible' => ! empty( get_option( 'wpnux_export_data' ) ),
			)
		);
	}

}

CoBlocks_Labs::register();
