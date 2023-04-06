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
 * Render the name field
 *
 * @param array $atts Block attributes.
 *
 * @return mixed Markup for the name field.
 */
function coblocks_render_field_name_block( $atts ) {

	static $name_count = 1;

	$label            = isset( $atts['label'] ) ? $atts['label'] : __( 'Name', 'coblocks' );
	$label_slug       = $name_count > 1 ? sanitize_title( $label . '-' . $name_count ) : sanitize_title( $label );
	$required_attr    = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';
	$has_last_name    = ( isset( $atts['hasLastName'] ) && $atts['hasLastName'] );
	$label_first_name = isset( $atts['labelFirstName'] ) ? $atts['labelFirstName'] : __( 'First', 'coblocks' );
	$label_last_name  = isset( $atts['labelLastName'] ) ? $atts['labelLastName'] : __( 'Last', 'coblocks' );

	ob_start();

	\CoBlocks_Form::render_field_label( $atts, $label, $name_count );

	?>
		<input type="hidden" id="name-field-id" name="name-field-id" class="coblocks-name-field-id" value="field-<?php echo esc_attr( $label_slug ); ?>" />
		<?php

		if ( $has_last_name ) {

			$style   = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_styles', array(), $atts ) );
			$styles  = empty( $style ) ? '' : " style='$style'";
			$classes = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_class', array( 'coblocks-form__subtext' ), $atts ) );

			?>
			<div class="coblocks-form__inline-fields">
				<div class="coblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr( $label_slug ); ?>-firstname" aria-label="<?php esc_attr_e( 'Plus One First Name', 'coblocks' ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value][first-name]" class="coblocks-field coblocks-field--name first" <?php echo esc_attr( $required_attr ); ?> />
					<small class="<?php echo esc_attr( $classes ); ?>"<?php echo wp_kses_post( $styles ); ?>><?php echo esc_html( $label_first_name ); ?></small>
				</div>

				<div class="coblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr( $label_slug ); ?>-lastname" aria-label="<?php esc_attr_e( 'Plus One Last Name', 'coblocks' ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value][last-name]" class="coblocks-field coblocks-field--name last" <?php echo esc_attr( $required_attr ); ?> />
					<small class="<?php echo esc_attr( $classes ); ?>"<?php echo wp_kses_post( $styles ); ?>><?php echo esc_html( $label_last_name ); ?></small>
				</div>
			</div>

			<?php

			$name_count++;

			return ob_get_clean();

		}

		?>

		<input type="text" id="<?php echo esc_attr( $label_slug ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--name" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		$name_count++;

		return ob_get_clean();

}
