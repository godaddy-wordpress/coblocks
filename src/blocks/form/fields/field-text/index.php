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
 * Render the text field
 *
 * @param  array $atts    Block attributes.
 *
 * @return mixed Markup for the text field.
 */
function coblocks_render_field_text_block( $atts ) {

	static $text_count = 1;

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Text', 'coblocks' );
	$label_slug    = $text_count > 1 ? sanitize_title( $label . '-' . $text_count ) : sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $text_count );

	?>

		<input type="text" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" id="<?php echo esc_attr( $label_slug ); ?>" class="coblocks-field coblocks-text" <?php echo esc_attr( $required_attr ); ?>>

		<?php

		$text_count++;

		return ob_get_clean();

}
