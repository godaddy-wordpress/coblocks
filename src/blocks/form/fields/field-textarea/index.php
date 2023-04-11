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
 * Render the textarea field
 *
 * @param  array $atts    Block attributes.
 *
 * @return mixed Markup for the textarea field.
 */
function coblocks_render_field_textarea_block( $atts ) {

	static $textarea_count = 1;

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Message', 'coblocks' );
	$label_slug    = $textarea_count > 1 ? sanitize_title( $label . '-' . $textarea_count ) : sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	$coblocks_form = new \CoBlocks_Form();
	$coblocks_form->render_field_label( $atts, $label, $checkbox_count );

	?>

		<textarea name="field-<?php echo esc_attr( $label_slug ); ?>[value]" aria-label="<?php echo esc_attr( $label ); ?>" id="<?php echo esc_attr( $label_slug ); ?>" class="coblocks-field coblocks-textarea" rows="20" <?php echo esc_attr( $required_attr ); ?>></textarea>

		<?php

		$textarea_count++;

		return ob_get_clean();

}
