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
 * Render the form submit button.
 *
 * @param  array $atts Block attributes.
 *
 * @return mixed Form submit button markup.
 */
function coblocks_render_field_submit_button_block( $atts ) {

	$btn_text             = isset( $atts['submitButtonText'] ) ? $atts['submitButtonText'] : __( 'Submit', 'coblocks' );
	$btn_class            = isset( $atts['className'] ) ? " {$atts['className']}" : '';
	$styles               = array();
	$recaptcha_site_key   = get_option( 'coblocks_google_recaptcha_site_key' );
	$recaptcha_secret_key = get_option( 'coblocks_google_recaptcha_secret_key' );

	if ( isset( $atts['className'] ) ) {

		$btn_class = str_replace(
			array(
				'is-style-fill',
				'is-style-outline',
				'is-style-circular',
				'is-style-3d',
				'is-style-shadow',
			),
			$atts['className'],
			$btn_class
		);
	}

	if ( isset( $atts['customBackgroundButtonColor'] ) ) {
		$styles[] = "background-color: {$atts['customBackgroundButtonColor']};";
	}

	if ( isset( $atts['customTextButtonColor'] ) ) {
		$styles[] = "color: {$atts['customTextButtonColor']};";
	}

	ob_start();
	?>

		<div class="coblocks-form__submit wp-block-button">
			<button type="submit" class="wp-block-button__link<?php echo esc_attr( $btn_class ); ?>" style="<?php echo esc_attr( implode( ' ', $styles ) ); ?>"><?php echo esc_html( $btn_text ); ?></button>
		<?php wp_nonce_field( 'coblocks-form-submit', 'form-submit' ); ?>
			<input type="hidden" name="action" value="coblocks-form-submit">

		<?php if ( $recaptcha_site_key && $recaptcha_secret_key ) : ?>
				<input type="hidden" class="g-recaptcha-token" name="g-recaptcha-token" />
			<?php endif; ?>
		</div>

		<?php
		return ob_get_clean();
}
