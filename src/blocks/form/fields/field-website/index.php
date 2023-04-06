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
 * Render the website field
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Markup for the website field.
 */
function coblocks_render_field_website_block( $atts ) {

	static $website_count = 1;

	$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Website', 'coblocks' );
	$label_slug    = $website_count > 1 ? sanitize_title( $label . '-' . $website_count ) : sanitize_title( $label );
	$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $website_count );

	?>

		<input type="url" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--website" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		$website_count++;

		return ob_get_clean();

}
