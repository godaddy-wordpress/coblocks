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
 * Render the select field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the select field.
 */
function coblocks_render_field_select_block( $atts ) {

	if ( empty( $atts['options'] ) ) {

		return;

	}

	static $select_count = 1;

	$the_options = array_filter( $atts['options'] );

	$label      = isset( $atts['label'] ) ? $atts['label'] : __( 'Select', 'coblocks' );
	$label_slug = $select_count > 1 ? sanitize_title( $label . '-' . $select_count ) : sanitize_title( $label );

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $select_count );

	printf(
		'<select class="select coblocks-field" name="field-%1$s[value]">',
		esc_attr( $label_slug )
	);

	foreach ( $the_options as $value ) {

		printf(
			'<option value="%1$s">%2$s</option>',
			esc_attr( $value ),
			esc_html( $value )
		);

	}

	print( '</select>' );

	$select_count++;

	return ob_get_clean();

}
