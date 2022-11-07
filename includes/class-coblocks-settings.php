<?php
/**
 * Register CoBlocks Settings
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
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
class CoBlocks_Settings {
	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Settings
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CoBlocks_Settings
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Settings();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'coblocks_settings_assets' ), 11 );
		add_action( 'wp_loaded', array( $this, 'coblocks_feature_propagation' ) );
	}

	/**
	 * Localize CoBlock Settings Status CoBlocks settings.
	 *
	 * @access public
	 */
	public function coblocks_settings_assets() {
		wp_localize_script(
			'coblocks-editor',
			'coblocksSettings',
			array(
				'coblocksSettingsEnabled' => (bool) apply_filters( 'coblocks_show_settings_panel', true ),
				'deprecateWith61'         => (bool) $this->deprecate_with_61(),
			)
		);
	}

	/**
	 * Compare current version with 6.1 WordPress.
	 *
	 * @access public
	 */
	public function deprecate_with_61() {
		return (bool) is_wp_version_compatible( '6.1' );
	}

	/**
	 * Propagate CoBlocks settings to editor.
	 * Starting with WordPress 6.1 Color settings are disabled.
	 * We no longer propagate settings for 6.1 color settings.
	 *
	 * @access public
	 */
	public function coblocks_feature_propagation() {
		// Short-circuit feature propagation to prevent missing color controls in 6.1.
		if ( $this->deprecate_with_61() ) {
			return;
		}

		if ( ! get_option( 'coblocks_custom_colors_controls_enabled' ) ) {
			add_theme_support( 'disable-custom-colors' );
		}

		if ( ! get_option( 'coblocks_gradient_presets_enabled' ) ) {
			add_theme_support( 'editor-gradient-presets', array() );
			add_theme_support( 'disable-custom-gradients' );

			// 5.7.2 support
			add_theme_support( '__experimental-editor-gradient-presets', array() );
			add_theme_support( '__experimental-disable-custom-gradients', true );
		}

		if ( ! get_option( 'coblocks_color_panel_controls_enabled' ) ) {
			add_theme_support( 'editor-color-palette', array() );
			add_theme_support( 'editor-gradient-presets', array() );
			add_theme_support( 'disable-custom-colors' );
			add_theme_support( 'disable-custom-gradients' );

			// 5.7.2 support
			add_theme_support( '__experimental-editor-gradient-presets', array() );
			add_theme_support( '__experimental-disable-custom-gradients', true );
		}
	}

	/**
	 * Register CoBlocks settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_layout_selector_controls_enabled',
			'coblocks_layout_selector_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable layout selector controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => false,
			)
		);

		register_setting(
			'coblocks_typography_controls_enabled',
			'coblocks_typography_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable typography controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_custom_colors_controls_enabled',
			'coblocks_custom_colors_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable custom color controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_color_panel_controls_enabled',
			'coblocks_color_panel_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable all color controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_gradient_presets_enabled',
			'coblocks_gradient_presets_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable gradient controls and presets across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'coblocks_animation_controls_enabled',
			'coblocks_animation_controls_enabled',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Setting use to disable or enable animation controls across the site.', 'coblocks' ),
				'sanitize_callback' => null,
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

	}
}

CoBlocks_Settings::register();
