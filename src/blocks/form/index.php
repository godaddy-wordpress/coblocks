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

	$form_hash;


/**
 * Render the form
 *
 * @param array $atts    Block attributes.
 * @param mixed $content Block content.
 *
 * @return mixed Form markup or success message when form submits successfully.
 */
function coblocks_render_form_block( $atts, $content ) {

	$form_hash      = sha1( $content );
	$submitted_hash = filter_input( INPUT_POST, 'form-hash' );

	ob_start();
	?>

		<div class="coblocks-form" id="<?php echo esc_attr( $form_hash ); ?>">

		<?php
		if ( $submitted_hash && htmlspecialchars( $submitted_hash ) === $form_hash ) {

			$submit_form = \CoBlocks_Form::process_form_submission( $atts );

			if ( $submit_form ) {

				\CoBlocks_Form::success_message( $atts );

				print( '</div>' );

				return ob_get_clean();
			}
		}
		?>

			<form action="<?php echo esc_url( sprintf( '%1$s#%2$s', set_url_scheme( get_the_permalink() ), $form_hash ) ); ?>" method="post">
			<?php echo do_blocks( $content ); ?>
				<input class="coblocks-field verify" aria-label="<?php esc_attr_e( 'Enter your email address to verify', 'coblocks' ); ?>" type="email" name="coblocks-verify-email" autocomplete="off" placeholder="<?php esc_attr_e( 'Email', 'coblocks' ); ?>" tabindex="-1">
				<input type="hidden" name="form-hash" value="<?php echo esc_attr( $form_hash ); ?>">

			<?php
			// Output a submit button if it's not found in the block content.
			if ( false === strpos( $content, 'coblocks-form__submit' ) ) :
				echo \CoBlocks_Form::render_field_submit_button( $atts );
				endif;
			?>
			</form>

		</div>

		

		<?php

		do_action( 'coblocks_register_form_blocks' );

		return ob_get_clean();
}
