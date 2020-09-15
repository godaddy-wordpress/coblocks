<?php
/**
 * Add inline attributes to blocks rendered with label colors.
 *
 * @package CoBlocks
 */

/**
 * Add label color styles
 *
 * @param array $styles     Array of styles.
 * @param array $attributes Block attributes.
 *
 * @return array
 */
function coblocks_add_label_color_styles( $styles, $attributes ) {

	if ( isset( $attributes['customTextColor'] ) ) {

		$styles[] = 'color: ' . sanitize_hex_color( $attributes['customTextColor'] ) . ';';

	}

	return $styles;

}
add_filter( 'coblocks_render_label_color_wrapper_styles', 'coblocks_add_label_color_styles', PHP_INT_MAX, 2 );


/**
 * Add label class
 *
 * @param array $classes    Array of classes.
 * @param array $attributes Block attributes.
 *
 * @return array
 */
function coblocks_add_label_color_class( $classes, $attributes ) {

	if ( isset( $attributes['textColor'] ) || isset( $attributes['customTextColor'] ) ) {

		$classes[] = 'has-text-color';

	}

	if ( isset( $attributes['textColor'] ) && ! isset( $attributes['customTextColor'] ) ) {

		$classes[] = "has-{$attributes['textColor']}-color";

	}

	return $classes;

}
add_filter( 'coblocks_render_label_color_wrapper_class', 'coblocks_add_label_color_class', PHP_INT_MAX, 2 );
