<?php
/**
 * Register plugin deactivation class.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Plugin_Deactivation Class
 *
 * @since NEXT
 */
class CoBlocks_Plugin_Deactivation {

	/**
	 * Constructor
	 */
	public function __construct() {

		add_filter( 'admin_enqueue_scripts', array( $this, 'equeue_scripts' ) );

	}

	/**
	 * Register meta.
	 */
	public function equeue_scripts() {

		global $pagenow;

		if ( 'plugins.php' !== $pagenow ) {

			return;

		}

		$name       = 'coblocks-plugin-deactivation';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		// Enqueue modal script here
		// wp_enqueue_script(
		// 	'coblocks-plugin-deactivation',
		// 	COBLOCKS_PLUGIN_URL . $filepath . '.js',
		// 	$asset_file['dependencies'],
		// 	$asset_file['version'],
		// 	true
		// );

	}

}

return new CoBlocks_Plugin_Deactivation();
