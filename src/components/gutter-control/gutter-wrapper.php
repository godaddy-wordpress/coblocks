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
	if ( isset( $attributes['columns'] ) && 1 < intval( $attributes['columns'] ) && isset( $attributes['gutter'] ) ) {
		array_push( $classes, 'has-' . $attributes['gutter'] . '-gutter' );
	}

	return $classes;
}
add_filter( 'coblocks_render_wrapper_class', 'coblocks_add_gutter_class', 10, 2 );

/**
 * Add gutter attribute in php
 *
 * @param WP_Block_Type $block_type Block Type.
 */
function coblocks_register_gutter_support( $block_type ) {
	$has_gutter_support = false;

	if ( isset( $block_type->supports ) && is_array( $block_type->supports ) ) {

		$has_gutter_support = array_key_exists( 'gutter', $block_type->supports );

	}

	if ( ! $has_gutter_support ) {

		return;

	}

	if ( ! $block_type->attributes ) {

		$block_type->attributes = array();

	}

	if ( ! array_key_exists( 'gutter', $block_type->attributes ) ) {

		$block_type->attributes['gutter'] = array(
			'type'    => 'string',
			'default' => 'medium',
		);

	}

	if ( ! array_key_exists( 'gutterCustom', $block_type->attributes ) ) {

		$block_type->attributes['gutterCustom'] = array(
			'type'    => 'string',
			'default' => '',
		);

	}
}


// Register the block support. Only since 5.6.0.
if ( class_exists( 'WP_Block_Supports' ) ) {

	WP_Block_Supports::get_instance()->register(
		'gutter',
		array(
			'register_attribute' => 'coblocks_register_gutter_support',
		)
	);

}
