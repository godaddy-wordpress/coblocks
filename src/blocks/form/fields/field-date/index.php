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
 * Render the date field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the date field.
 */
function coblocks_render_field_date_block( $atts ) {

	static $date_count = 1;

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Date', 'coblocks' );
	$label_slug    = $date_count > 1 ? sanitize_title( $label . '-' . $date_count ) : sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $date_count );

	?>

		<input type="date" id="<?php echo esc_attr( $label_slug ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--date" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		$date_count++;

		return ob_get_clean();

}
