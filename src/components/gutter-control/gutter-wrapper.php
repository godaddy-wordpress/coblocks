<?php

/**
 * Add gutter styles in php
 *
 * @param $styles { array } array of styles
 * @param $attributes { array } block attributes
 *
 * @return array
 */
function coblocks_add_gutter_styles( $styles, $attributes ) {
	if ( isset( $attributes['gutterCustom'] ) ) {
		array_push( $styles, '--coblocks-custom-gutter:' . $attributes['gutterCustom'] . 'em' );
	}

	return $styles;
}

add_filter( 'coblocks/render/wrapper/styles', 'coblocks_add_gutter_styles', 10, 2 );


/**
 * Add gutter class in php
 *
 * @param $classes { array } array of classes
 * @param $attributes { array } block attributes
 *
 * @return array
 */
function coblocks_add_gutter_class( $classes, $attributes ) {
	if ( isset( $attributes['columns'] ) && isset( $attributes['gutter'] ) ) {
		array_push( $classes, 'has-' . $attributes['gutter'] . '-gutter' );
	}

	return $classes;
}
add_filter( 'coblocks/render/wrapper/class', 'coblocks_add_gutter_class', 10, 2 );
