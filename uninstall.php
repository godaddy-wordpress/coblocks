<?php
/**
 * CoBlocks Uninstall
 *
 * @package CoBlocks
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {

	die;

}

$coblocks_options = array(
	'coblocks_settings_api',
	'coblocks_plugin_feedback_activation_date',
	'coblocks_date_installed',
	'coblocks_google_maps_api_key',
	'coblocks_plugin_feedback_no_bug',
);

foreach ( $coblocks_options as $coblocks_option ) {

	delete_option( $coblocks_option );

}
