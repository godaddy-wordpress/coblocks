<?php
/**
 * Register settings to enable and disable blocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers setting for the CoBlocks Block Manager.
 *
 * @since 1.0.0
 */
class CoBlocks_Block_Settings {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Block_Settings
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_Settings();
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

		add_action( 'init', array( $this, 'register_settings' ) );
	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_settings_api',
			'coblocks_settings_api',
			array(
				'type'              => 'string',
				'description'       => __( 'Enable or disable blocks', 'coblocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}

}

CoBlocks_Block_Settings::register();
