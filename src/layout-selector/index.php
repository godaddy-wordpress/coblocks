<?php
/**
 * Feature: Layout Selector
 *
 * @package CoBlocks
 */

/**
 * Load custom layouts from the theme directory, if they exist.
 */
function coblocks_register_custom_layouts() {
	$layouts = array();

	$custom_layout_path = get_stylesheet_directory() . '/coblocks/layouts';
	$custom_layout_glob = glob( $custom_layout_path . '/*.php' );

	if ( file_exists( $custom_layout_path ) && count( $custom_layout_glob ) > 0 ) {
		foreach ( $custom_layout_glob as $layout_file_path ) {
			$layouts[] = include_once $layout_file_path;
		}
	}

	wp_localize_script(
		'coblocks-editor',
		'coblocksLayoutSelector',
		array(
			'customLayouts' => $layouts,
		)
	);
}

add_action( 'admin_enqueue_scripts', 'coblocks_register_custom_layouts' );
