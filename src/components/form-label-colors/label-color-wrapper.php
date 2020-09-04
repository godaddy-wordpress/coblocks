<?php

/**
 * Add label color styles in php
 *
 * @param $styles { array } array of styles
 * @param $attributes { array } block attributes
 *
 * @return array
 */
function coblocks_add_label_color_styles( $styles, $attributes ) {
	// if ( isset( $attributes['customTextColor'] ) ) {
		array_push( $styles, "color: {$attributes['customTextColor']};" );
	// }

	return $styles;
}

add_filter( 'coblocks/render/label-color-wrapper/styles', 'coblocks_add_label_color_styles', 10, 2 );


/**
 * Add label class in php
 *
 * @param $classes { array } array of classes
 * @param $attributes { array } block attributes
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

add_filter( 'coblocks/render/label-color-wrapper/class', 'coblocks_add_label_color_class', 10, 2 );
