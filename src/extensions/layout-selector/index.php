<?php
/**
 * Feature: Layout Selector
 *
 * @package CoBlocks
 */

/**
 * Get the categories for the layout selector.
 *
 * @return array
 */
function coblocks_layout_selector_categories() {
	$categories = array(
		array(
			'slug'  => 'most-used',
			'title' => __( 'Most Used', 'coblocks' ),
		),
		array(
			'slug'  => 'about',
			'title' => __( 'About', 'coblocks' ),
		),
		array(
			'slug'  => 'contact',
			'title' => __( 'Contact', 'coblocks' ),
		),
		array(
			'slug'  => 'home',
			'title' => __( 'Home', 'coblocks' ),
		),
		array(
			'slug'  => 'portfolio',
			'title' => __( 'Portfolio', 'coblocks' ),
		),
	);

	/**
	 * Filters the available categories used by the Layout Selector.
	 *
	 * @param array $categories The available categories.
	 */
	return apply_filters( 'coblocks_layout_selector_categories', $categories );
}

/**
 * Get the layouts for the layout selector.
 *
 * @return array
 */
function coblocks_layout_selector_layouts() {
	$layouts = array();

	/**
	 * Filters the available layouts used by the Layout Selector.
	 *
	 * @param array $layouts The available layouts.
	 */
	return apply_filters( 'coblocks_layout_selector_layouts', $layouts );
}

/**
 * Localize layout and category definitions for the Layout Selector component.
 */
function coblocks_localize_layout_selector() {
	$current_screen   = get_current_screen();
	$screen_post_type = $current_screen->post_type;

	$allowed_post_types = array(
		'page',
	);

	wp_localize_script(
		'coblocks-editor',
		'coblocksLayoutSelector',
		array(
			'postTypeEnabled' => in_array( $screen_post_type, $allowed_post_types, true ),
			'layouts'         => coblocks_layout_selector_layouts(),
			'categories'      => coblocks_layout_selector_categories(),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'coblocks_localize_layout_selector' );
