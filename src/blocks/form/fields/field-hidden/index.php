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
 * Render the hidden field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the hidden field.
 */
function coblocks_render_field_hidden_block( $atts ) {

	static $hidden_count = 1;

	$atts['hidden'] = true;

	$value      = isset( $atts['value'] ) ? $atts['value'] : '';
	$label      = isset( $atts['label'] ) ? $atts['label'] : __( 'Hidden', 'coblocks' );
	$label_slug = $hidden_count > 1 ? sanitize_title( $label . '-' . $hidden_count ) : sanitize_title( $label );

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $hidden_count );

	?>

		<input type="hidden" value="<?php echo esc_attr( $value ); ?>" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--hidden" />

		<?php

		$hidden_count++;

		return ob_get_clean();

}
