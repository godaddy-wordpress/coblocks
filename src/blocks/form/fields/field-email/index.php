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
 * Render the email field
 *
 * @param array $atts Block attributes.
 *
 * @return mixed Markup for the email field.
 */
function coblocks_render_field_email_block( $atts ) {

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Email', 'coblocks' );
	$label_slug    = sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	$coblocks_form = new \CoBlocks_Form();
	$coblocks_form->render_field_label( $atts, $label, $checkbox_count );

	?>

		<input type="hidden" id="email-field-id" name="email-field-id" class="coblocks-email-field-id" value="field-<?php echo esc_attr( $label_slug ); ?>" />
		<input type="email" id="<?php echo esc_attr( $label_slug ); ?>" aria-label="<?php echo esc_attr( $label ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--email" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		return ob_get_clean();

}
