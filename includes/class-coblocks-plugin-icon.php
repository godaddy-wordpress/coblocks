<?php
/**
 * Register icons to display on the Manage Plugins screen
 * for plugins that aren't in the WordPress.org directory (@@pkg.title Pro).
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
 * Main @@pkg.title Plugin Icon Class
 *
 * @since 1.0.0
 */
class CoBlocks_Plugin_Icon {

	/**
	 * This class's instance.
	 *
	 * @var CoBlocks_Plugin_Icon
	 */
	private static $instance;

	/**
	 * Registers the class.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Plugin_Icon();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		add_filter( 'site_transient_update_plugins', array( $this, 'icon' ) );
	}

	/**
	 * Register plugin icons.
	 *
	 * WordPress 4.9 introduced icons in the list table on the Manage Plugins
	 * screen. The icons are pulled from the W.org update API. If an icon isn't
	 * available, a generic plugin Dashicon is shown instead.
	 *
	 * @param  array $value Plugin update data.
	 * @return array
	 */
	public function icon( $value ) {

		// Unique vendor slug.
		$vendor_slug = 'coblocks';

		// Relative path to the main plugin file from the plugins directory.
		$plugin_file = 'coblocks/coblocks.php';

		// URL to the plugin icon.
		$plugin_icon = 'https://coblocks.com/wp-content/uploads';

		$icons = array(
			'1x'      => '',
			'2x'      => '',
			'default' => $plugin_icon,
		);

		$plugin_slug = dirname( $plugin_file );
		if ( isset( $value->no_update[ $plugin_file ] ) ) {
			$value->no_update[ $plugin_file ]->icons = $icons;
		} elseif ( isset( $value->response[ $plugin_file ] ) ) {
			$value->response[ $plugin_file ]->icons = $icons;
		} else {
			$data                             = new stdClass();
			$data->id                         = $vendor_slug . '/' . $plugin_slug;
			$data->slug                       = $plugin_slug;
			$data->plugin                     = $plugin_file;
			$data->icons                      = $icons;
			$value->no_update[ $plugin_file ] = $data;
		}
		return $value;
	}
}

CoBlocks_Plugin_Icon::register();
