<?php
/**
 * Add inline attributes to blocks rendered with gutters.
 *
 * @package CoBlocks
 */

/**
 * Add gutter styles in php
 *
 * @param array $styles array of styles.
 * @param array $attributes block attributes.
 *
 * @return array
 */
function coblocks_add_gutter_styles( $styles, $attributes ) {
	if ( isset( $attributes['gutterCustom'] ) ) {
		array_push( $styles, '--coblocks-custom-gutter:' . $attributes['gutterCustom'] . 'em' );
	}

	return $styles;
}

add_filter( 'coblocks_render_wrapper_styles', 'coblocks_add_gutter_styles', 10, 2 );


/**
 * Add gutter class in php
 *
 * @param array $classes array of classes.
 * @param array $attributes block attributes.
 *
 * @return array
 */
function coblocks_add_gutter_class( $classes, $attributes ) {
	if ( isset( $attributes['columns'] ) && isset( $attributes['gutter'] ) ) {
		array_push( $classes, 'has-' . $attributes['gutter'] . '-gutter' );
	}

	return $classes;
}
add_filter( 'coblocks_render_wrapper_class', 'coblocks_add_gutter_class', 10, 2 );
