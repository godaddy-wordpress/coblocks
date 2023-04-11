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
 * Render the phone field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the phone field.
 */
function coblocks_render_field_phone_block( $atts ) {

	static $phone_count = 1;

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Phone', 'coblocks' );
	$label_slug    = $phone_count > 1 ? sanitize_title( $label . '-' . $phone_count ) : sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $phone_count );

	?>

		<input type="tel" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--telephone" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		$phone_count++;

		return ob_get_clean();

}