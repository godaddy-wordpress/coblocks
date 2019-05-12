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
 * Main @@pkg.title Class
 *
 * @since 2.0.0
 */
class CoBlocks_Form {

	/**
	 * The Constructor.
	 */
	public function __construct() {

		$this->register_form_blocks();

	}

	/**
	 * Register the form blocks.
	 */
	public function register_form_blocks() {

		register_block_type(
			'coblocks/form',
			[
				'render_callback' => [ $this, 'render_form' ],
			]
		);

		register_block_type(
			'coblocks/field-name',
			[
				'parent'          => [ 'coblocks/form' ],
				'render_callback' => [ $this, 'render_field_name' ],
			]
		);

		register_block_type(
			'coblocks/field-email',
			[
				'parent'          => [ 'coblocks/form' ],
				'render_callback' => [ $this, 'render_field_email' ],
			]
		);

		register_block_type(
			'coblocks/field-textarea',
			[
				'parent'          => [ 'coblocks/form' ],
				'render_callback' => [ $this, 'render_field_textarea' ],
			]
		);

	}

	/**
	 * Render the form
	 *
	 * @param  array $atts    Block attributes.
	 * @param  mixed $content Block content.
	 *
	 * @return mixed Form markup
	 */
	public function render_form( $atts, $content ) {

		$post_id  = get_the_ID();
		$page_url = set_url_scheme( get_the_permalink() );

		/**
		 * Filter the form action URL.
		 *
		 * @param string {$page_url}#form-{$post_id} Form post URL.
		 * @param object $GLOBALS['post']            Global post object.
		 * @param int    $id                         Post ID.
		 */
		$form_url = apply_filters( 'coblocks_form_action_url', "{$page_url}#form-{$post_id}", $GLOBALS['post'], $post_id );

		ob_start();

		?>

		<div id="<?php echo esc_attr( sprintf( 'coblocks-form-%s', $post_id ) ); ?>" class="coblocks-form">
			<form action="<?php echo esc_url( $form_url ); ?>" method="post">
				<?php echo do_blocks( $content ); ?>
				<p class="form-submit">
					<?php $this->render_submit_button( $atts ); ?>
					<?php wp_nonce_field( 'coblocks-form-submit', 'form-submit' ); ?>
					<input type="hidden" name="form-id" value="<?php echo esc_attr( $post_id ); ?>">
					<input type="hidden" name="action" value="coblocks-form-submit">
				</p>
			</form>
		</div>

		<?php

		return ob_get_clean();

	}

	/**
	 * Render the name field
	 *
	 * @param  array $atts    Block attributes.
	 * @param  mixed $content Block content.
	 *
	 * @return mixed Markup for the name field.
	 */
	public function render_field_name( $atts, $content ) {

		$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Name', 'coblocks' );
		$label_slug    = sanitize_title( $label );
		$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

		ob_start();

		$this->render_field_label( $atts, $label );

		?>

		<input type="text" id="<?php echo esc_attr( $label_slug ); ?>" name="<?php echo esc_attr( $label_slug ); ?>" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		return ob_get_clean();

	}

	/**
	 * Render the email field
	 *
	 * @param  array $atts    Block attributes.
	 * @param  mixed $content Block content.
	 *
	 * @return mixed Markup for the email field.
	 */
	public function render_field_email( $atts, $content ) {

		$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Name', 'coblocks' );
		$label_slug    = sanitize_title( $label );
		$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

		ob_start();

		$this->render_field_label( $atts, $label );

		?>

		<input type="email" id="<?php echo esc_attr( $label_slug ); ?>" name="<?php echo esc_attr( $label_slug ); ?>" <?php echo esc_attr( $required_attr ); ?> />

		<?php

		return ob_get_clean();

	}

	/**
	 * Render the textarea field
	 *
	 * @param  array $atts    Block attributes.
	 * @param  mixed $content Block content.
	 *
	 * @return mixed Markup for the textarea field.
	 */
	public function render_field_textarea( $atts, $content ) {

		$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Message', 'coblocks' );
		$label_slug    = sanitize_title( $label );
		$required_attr = ( isset( $is_required ) && $is_required ) ? 'required' : '';

		ob_start();

		$this->render_field_label( $atts, $label );

		?>

		<textarea name="<?php echo esc_attr( $label_slug ); ?>" id="<?php echo esc_attr( $label_slug ); ?>" rows="20"></textarea>

		<?php

		return ob_get_clean();

	}

	/**
	 * Generate the form field label.
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Form field label markup.
	 */
	private function render_field_label( $atts, $field_label ) {

		$label      = isset( $atts['label'] ) ? $atts['label'] : $field_label;
		$label_slug = sanitize_title( $label );

		/**
		 * Filter the required text in the field label.
		 *
		 * @param string $field_label Form field label text.
		 */
		$required_text  = apply_filters( 'coblocks_form_label_required_text', __( '(required)', 'coblocks' ), $field_label );
		$required_attr  = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';
		$required_label = empty( $required_attr ) ? '' : sprintf( ' <span class="required"><small>%s</small></span>', $required_text );

		?>

		<label for="<?php echo esc_attr( $label_slug ); ?>"><?php echo esc_html( $label ); ?><?php echo $required_label; ?></label>

		<?php

	}

	/**
	 * Render the form submit button.
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return mixed Form submit button markup.
	 */
	private function render_submit_button( $atts ) {

		$btn_text  = isset( $atts['submitButtonText'] ) ? $atts['submitButtonText'] : __( 'Submit', 'coblocks' );
		$btn_class = isset( $atts['submitButtonClasses'] ) ? $atts['submitButtonClasses'] : '';
		$styles    = '';

		if ( isset( $atts['customBackgroundButtonColor'] ) ) {

			$styles .= "background-color: {$atts['customBackgroundButtonColor']};";

		}

		if ( isset( $atts['customTextButtonColor'] ) ) {

			$styles .= "color: {$atts['customTextButtonColor']};";

		}

		if ( ! empty( $styles ) ) {

			$styles = " style='{$styles}'";

		}

		?>

		<button type="submit" class="<?php echo esc_attr( $btn_class ); ?>"<?php echo $styles; ?>><?php echo esc_html( $btn_text ); ?></button>

		<?php

	}

}

new CoBlocks_Form();
