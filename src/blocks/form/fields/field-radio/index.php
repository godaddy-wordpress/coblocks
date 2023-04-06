<?php
/**
 * Render form block fields
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Render the radio field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the radio field.
 */
function coblocks_render_field_radio_block( $atts ) {

	if ( empty( $atts['options'] ) ) {

		return;

	}

	static $radio_count = 1;

	$the_options = array_filter( $atts['options'] );

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Choose one', 'coblocks' );
	$label_desc    = sanitize_title( $label ) !== 'choose-one' ? sanitize_title( $label ) : 'choose-one';
	$label_slug    = $radio_count > 1 ? sanitize_title( $label_desc . '-' . $radio_count ) : sanitize_title( $label_desc );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? ' required' : '';
	$styles        = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_styles', array(), $atts ) );
	$classes       = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_class', array( 'coblocks-label' ), $atts ) );

	ob_start();

	print( '<div class="coblocks-field"><fieldset>' );

	printf(
		'<legend class="%1$s"%2$s>%3$s</legend>',
		esc_attr( $classes ),
		empty( $styles ) ? '' : wp_kses_post( " style='$styles'" ),
		esc_html( $label )
	);

	if ( isset( $atts['isInline'] ) ) {

		print( '<div class="coblocks--inline">' );

	}

	foreach ( $the_options as $key => $value ) {

		printf(
			'<input id="%1$s" type="radio" name="field-%2$s[value]" value="%3$s" class="radio"%4$s>
				<label class="coblocks-radio-label" for="%1$s">%5$s</label>',
			esc_attr( $label_slug . '-' . sanitize_title( $value ) ),
			esc_attr( $label_slug ),
			esc_attr( $value ),
			0 === $key ? esc_attr( $required_attr ) : '',
			esc_html( $value )
		);

	}

	if ( isset( $atts['isInline'] ) ) {

		print( '</div>' );

	}

	print( '</fieldset></div>' );

	$radio_count++;

	return ob_get_clean();

}
