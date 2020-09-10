<?php
/**
 * Add inline attributes to blocks rendered with label colors.
 *
 * @package CoBlocks
 */

/**
 * Add label color styles in php
 *
 * @param array $styles array of styles
 * @param array $attributes block attributes
 *
 * @return array
 */
function coblocks_add_label_color_styles( $styles, $attributes ) {
	if ( isset( $attributes['customTextColor'] ) ) {
		array_push( $styles, "color: {$attributes['customTextColor']};" );
	}

	return $styles;
}

add_filter( 'coblocks_render_label_color_wrapper_styles', 'coblocks_add_label_color_styles', 10, 2 );


/**
 * Add label class in php
 *
 * @param array  $classes array of classes
 * @param array $attributes block attributes
 *
 * @return array
 */
function coblocks_add_label_color_class( $classes, $attributes ) {
    if ( isset( $attributes['textColor']) || isset( $attributes['customTextColor'] )) {

        array_push( $classes, 'has-text-color' );

    }
	if ( isset( $attributes['textColor'] ) && ! isset( $attributes['customTextColor'] ) ) {

        array_push( $classes, 'has-' . $attributes['textColor'] . '-color' );
        
	}

	return $classes;
}

add_filter( 'coblocks_render_label_color_wrapper_class', 'coblocks_add_label_color_class', 10, 2 );
