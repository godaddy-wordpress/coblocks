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
 * Render the checkbox field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the checkbox field.
 */
function coblocks_render_field_checkbox_block( $atts ) {

	if ( empty( $atts['options'] ) ) {

		return;

	}

	static $checkbox_count = 1;

	$the_options = array_filter( $atts['options'] );

	$label      = isset( $atts['label'] ) ? $atts['label'] : __( 'Select', 'coblocks' );
	$label_slug = $checkbox_count > 1 ? sanitize_title( $label . '-' . $checkbox_count ) : sanitize_title( $label );
	$required   = ( isset( $atts['required'] ) && $atts['required'] );

	if ( $required ) {

		wp_enqueue_script(
			'coblocks-checkbox-required',
			CoBlocks()->asset_source( 'js' ) . 'coblocks-checkbox-required.js',
			array(),
			COBLOCKS_VERSION,
			true
		);

	}

	ob_start();

	printf(
		'<div class="coblocks-field checkbox%1$s">
				%2$s',
		esc_attr( $required ? ' required' : '' ),
		wp_kses_post(
			$required ? sprintf(
				'<div class="required-error hidden">%s</div>',
				/**
				* Filter the checkbox required text that displays when no checkbox is
				* selected when the form is submitted.
				*
				* @param string $error_text Error text displayed to the user.
				*/
				apply_filters( 'coblocks_form_checkbox_required_text', __( 'Please select at least one checkbox.', 'coblocks' ) )
			) : ''
		)
	);

	$coblocks_form = new \CoBlocks_Form();
	$coblocks_form->render_field_label( $atts, $label, $checkbox_count );

	if ( isset( $atts['isInline'] ) ) {

		print( '<div class="coblocks--inline">' );

	}

	foreach ( $the_options as $value ) {

		printf(
			'<input id="%1$s" type="checkbox" name="field-%2$s[value][]" value="%3$s" class="checkbox">
				<label class="coblocks-checkbox-label" for="%1$s">%4$s</label>',
			esc_attr( $label_slug . '-' . sanitize_title( $value ) ),
			esc_attr( $label_slug ),
			esc_attr( $value ),
			esc_html( $value )
		);

	}

	if ( isset( $atts['isInline'] ) ) {

		print( '</div>' );

	}

	print( '</div>' );

	$checkbox_count++;

	return ob_get_clean();

}
