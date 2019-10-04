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
	 * Email content
	 *
	 * @var string
	 */
	private $email_content;

	/**
	 * Form hash
	 *
	 * @var string
	 */
	private $form_hash;

	/**
	 * Google Recaptcha v3 verify endpoint
	 *
	 * @var string
	 */
	const GCAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'init', [ $this, 'register_settings' ] );
		add_action( 'init', [ $this, 'register_form_blocks' ] );

		add_action( 'wp_enqueue_scripts', [ $this, 'form_recaptcha_assets' ] );

	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_google_recaptcha_site_key',
			'coblocks_google_recaptcha_site_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google reCaptcha site key for form spam protection', 'coblocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);

		register_setting(
			'coblocks_google_recaptcha_secret_key',
			'coblocks_google_recaptcha_secret_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google reCaptcha secret key for form spam protection', 'coblocks' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}

	/**
	 * Enqueue form block assets when recaptcha site & secret keys are present
	 */
	public function form_recaptcha_assets() {

		$recaptcha_site_key   = get_option( 'coblocks_google_recaptcha_site_key' );
		$recaptcha_secret_key = get_option( 'coblocks_google_recaptcha_secret_key' );

		if ( has_block( 'coblocks/form' ) && ! empty( $recaptcha_site_key ) && ! empty( $recaptcha_secret_key ) ) {

			wp_enqueue_script(
				'google-recaptcha',
				'https://www.google.com/recaptcha/api.js?render=' . esc_attr( $recaptcha_site_key ),
				array( 'jquery' ),
				'3.0.0',
				true
			);

			wp_enqueue_script(
				'coblocks-google-recaptcha',
				CoBlocks()->asset_source( 'js' ) . 'coblocks-google-recaptcha' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery', 'google-recaptcha' ),
				COBLOCKS_VERSION,
				true
			);

			wp_localize_script(
				'coblocks-google-recaptcha',
				'coblocksFormBlockAtts',
				[
					'recaptchaSiteKey' => $recaptcha_site_key,
				]
			);

		}

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

		/**
		 * Fires when the coblocks/form block and sub-blocks are registered
		 */
		do_action( 'coblocks_register_form_blocks' );

	}

	/**
	 * Render the form
	 *
	 * @param  array $atts    Block attributes.
	 * @param  mixed $content Block content.
	 *
	 * @return mixed Form markup or success message when form submits successfully.
	 */
	public function render_form( $atts, $content ) {

		$this->form_hash      = sha1( json_encode( $atts ) . $content );
		$submitted_hash       = filter_input( INPUT_POST, 'form-hash', FILTER_SANITIZE_STRING );
		$recaptcha_site_key   = get_option( 'coblocks_google_recaptcha_site_key' );
		$recaptcha_secret_key = get_option( 'coblocks_google_recaptcha_secret_key' );

		ob_start();

		?>

		<div class="coblocks-form" id="<?php echo esc_attr( $this->form_hash ); ?>">

			<?php

			if ( $submitted_hash === $this->form_hash ) {

				$submit_form = $this->process_form_submission( $atts );

				if ( $submit_form ) {

					$this->success_message();

					print( '</div>' );

					return ob_get_clean();

				}
			}

			?>

			<form action="<?php echo esc_url( sprintf( '%1$s#%2$s', set_url_scheme( untrailingslashit( get_the_permalink() ) ), $this->form_hash ) ); ?>" method="post">
				<?php echo do_blocks( $content ); ?>
				<input class="coblocks-field verify" type="email" name="coblocks-verify-email" autocomplete="off" placeholder="<?php esc_attr_e( 'Email', 'coblocks' ); ?>" tabindex="-1">
				<div class="coblocks-form__submit wp-block-button">
					<?php $this->render_submit_button( $atts ); ?>
					<?php wp_nonce_field( 'coblocks-form-submit', 'form-submit' ); ?>
					<input type="hidden" name="action" value="coblocks-form-submit">
					<input type="hidden" name="form-hash" value="<?php echo esc_attr( $this->form_hash ); ?>">
					<?php
					if ( $recaptcha_site_key && $recaptcha_secret_key ) {
						?>
						<input type="hidden" class="g-recaptcha-token" name="g-recaptcha-token" />
						<?php
					}
					?>
				</div>
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

		$label            = isset( $atts['label'] ) ? $atts['label'] : __( 'Name', 'coblocks' );
		$label_slug       = sanitize_title( $label );
		$required_attr    = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';
		$has_last_name    = ( isset( $atts['hasLastName'] ) && $atts['hasLastName'] );
		$label_first_name = isset( $atts['labelFirstName'] ) ? $atts['labelFirstName'] : __( 'First', 'coblocks' );
		$label_last_name  = isset( $atts['labelLastName'] ) ? $atts['labelLastName'] : __( 'Last', 'coblocks' );

		ob_start();

		$this->render_field_label( $atts, $label );

		if ( $has_last_name ) {

			?>

			<div class="coblocks-form__inline-fields">
				<div class="coblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value][first-name]" class="coblocks-field coblocks-field--name first" <?php echo esc_attr( $required_attr ); ?> />
					<small class="coblocks-form__subtext"><?php echo esc_html( $label_first_name ); ?></small>
				</div>

				<div class="coblocks-form__inline-field">
					<input type="text" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value][last-name]" class="coblocks-field coblocks-field--name last" <?php echo esc_attr( $required_attr ); ?> />
					<small class="coblocks-form__subtext"><?php echo esc_html( $label_last_name ); ?></small>
				</div>
			</div>

			<?php

			return ob_get_clean();

		}

		?>

		<input type="text" id="<?php echo esc_attr( sanitize_title( $label ) ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--name" <?php echo esc_attr( $required_attr ); ?> />

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

		$label         = isset( $atts['label'] ) ? $atts['label'] : __( 'Email', 'coblocks' );
		$label_slug    = sanitize_title( $label );
		$required_attr = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';

		ob_start();

		$this->render_field_label( $atts, $label );

		?>

		<input type="email" id="<?php echo esc_attr( $label_slug ); ?>" name="field-<?php echo esc_attr( $label_slug ); ?>[value]" class="coblocks-field coblocks-field--email" <?php echo esc_attr( $required_attr ); ?> />

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

		<textarea name="field-<?php echo esc_attr( $label_slug ); ?>[value]" id="<?php echo esc_attr( $label_slug ); ?>" class="coblocks-field coblocks-textarea" rows="20"></textarea>

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
		$required_text  = (string) apply_filters( 'coblocks_form_label_required_text', '&#42;', $field_label );
		$required_attr  = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';
		$required_label = empty( $required_attr ) ? '' : sprintf( ' <span class="required">%s</span>', $required_text );

		/*
		 * Format an array of allowed HTML tags and attributes for the $copyrighttext value.
		 *
		 * @link https://codex.wordpress.org/Function_Reference/wp_kses
		 */
		$allowed_html = array(
			'span' => array( 'class' => array() ),
		);
		?>

		<label for="<?php echo esc_attr( $label_slug ); ?>" class="coblocks-label"><?php echo esc_html( $label ); ?><?php echo wp_kses( $required_label, $allowed_html ); ?></label>
		<input type="hidden" name="field-<?php echo esc_attr( $label_slug ); ?>[label]" value="<?php echo esc_attr( $label ); ?>">

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

		<button type="submit" class="wp-block-button__link <?php echo esc_attr( $btn_class ); ?>"<?php echo $styles; ?>><?php echo esc_html( $btn_text ); ?></button>

		<?php

	}

	/**
	 * Process the form submission
	 *
	 * @return bool True when an email is sent, else false.
	 */
	public function process_form_submission( $atts ) {

		$form_submission = filter_input( INPUT_POST, 'action', FILTER_SANITIZE_STRING );

		if ( ! $form_submission || 'coblocks-form-submit' !== $form_submission ) {

			return;

		}

		$nonce = filter_input( INPUT_POST, 'form-submit', FILTER_SANITIZE_STRING );

		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'coblocks-form-submit' ) ) {

			return;

		}

		/**
		 * Check if the honeypot field was filled out and if so, bail.
		 */
		$honeypot_check = filter_input( INPUT_POST, 'coblocks-verify-email', FILTER_SANITIZE_STRING );

		if ( ! empty( $honeypot_check ) ) {

			$this->remove_url_form_hash();

			return;

		}

		/**
		 * Fires before a form is submitted.
		 *
		 * @param array $_POST User submitted form data.
		 * @param array $atts  Form block attributes.
		 */
		do_action( 'coblocks_before_form_submit', $_POST, $atts );

		/**
		 * Filter to disable the CoBlocks form emails.
		 *
		 * @param bool false Whether or not the emails should be disabled.
		 */
		$send_email = (bool) apply_filters( 'coblocks_form_email_send', true );

		if ( ! $send_email ) {

			return true;

		}

		$post_id    = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
		$post_title = get_bloginfo( 'name' ) . ( ( false === $post_id ) ? '' : sprintf( ' - %s', get_the_title( $post_id ) ) );

		$to      = isset( $atts['to'] ) ? sanitize_email( $atts['to'] ) : get_option( 'admin_email' );
		$subject = isset( $atts['subject'] ) ? sanitize_text_field( $atts['subject'] ) : $post_title;

		unset( $_POST['form-submit'], $_POST['_wp_http_referer'], $_POST['action'], $_POST['form-hash'], $_POST['coblocks-verify-email'] );

		if ( isset( $_POST['g-recaptcha-token'] ) ) {

			if ( ! $this->verify_recaptcha( $_POST['g-recaptcha-token'] ) ) {

				$this->remove_url_form_hash();

				return false;

			}

			unset( $_POST['g-recaptcha-token'] );

		}

		$this->email_content = '<ul>';

		foreach ( $_POST as $key => $data ) {

			if ( is_array( $data['value'] ) ) {

				$data['value'] = implode( ' ', $data['value'] );

			}

			$this->email_content .= '<li>' . sanitize_text_field( $data['label'] ) . ': ' . sanitize_text_field( $data['value'] ) . '</li>';

		}

		$this->email_content .= '</ul>';

		/**
		 * Filter the email to
		 *
		 * @param string  $to      Email to.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$to = (string) apply_filters( 'coblocks_form_email_to', $to, $_POST, $post_id );

		/**
		 * Filter the email subject
		 *
		 * @param string  $subject Email subject.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$subject = (string) apply_filters( 'coblocks_form_email_subject', $subject, $_POST, $post_id );

		/**
		 * Filter the form email content.
		 *
		 * @param string  $this->email_content Email content.
		 * @param array   $_POST               Submitted form data.
		 * @param integer $post_id             Current post ID.
		 */
		$email_content = (string) apply_filters( 'coblocks_form_email_content', $this->email_content, $_POST, $post_id );

		add_filter( 'wp_mail_content_type', [ $this, 'enable_html_email' ] );

		$email = wp_mail( $to, $subject, $email_content );

		remove_filter( 'wp_mail_content_type', [ $this, 'enable_html_email' ] );

		/**
		 * Fires when a form is submitted.
		 *
		 * @param array   $_POST User submitted form data.
		 * @param array   $atts  Form block attributes.
		 * @param boolean $email True when email sends, else false.
		 */
		do_action( 'coblocks_form_submit', $_POST, $atts, $email );

		return $email;

	}

	/**
	 * Enable HTML emails
	 *
	 * @return string HTML content type header
	 */
	public function enable_html_email() {

		return 'text/html';

	}

	/**
	 * Display the form success data
	 *
	 * @return mixed Markup for a preview of the submitted data
	 */
	public function success_message() {

		/**
		 * Filter the sent notice above the success message.
		 */
		$sent_notice = (string) apply_filters( 'coblocks_form_sent_notice', __( 'Your message was sent:', 'coblocks' ) );

		/**
		 * Filter the success message after a form submission
		 *
		 * @param mixed   Success message markup.
		 * @param string  Sent notice.
		 * @param integer Current post ID.
		 */
		$success_message = (string) apply_filters(
			'coblocks_form_success_message',
			sprintf(
				'<div class="coblocks-form__submitted">%s %s</div>',
				wp_kses_post( $sent_notice ),
				wp_kses_post( $this->email_content )
			),
			get_the_ID()
		);

		$this->remove_url_form_hash();

		echo wp_kses_post( $success_message );

	}

	/**
	 * Remove the form has from the URL in the browser address bar
	 */
	private function remove_url_form_hash() {

		?>

		<script type="text/javascript">
		if ( window.history.replaceState && window.location.hash ) {
			document.getElementById( window.location.hash.substring( 1 ) ).scrollIntoView();
			window.history.replaceState( null, null, ' ' );
		}
		</script>

		<?php

	}

	/**
	 * Verify recaptcha to prevent spam
	 *
	 * @param string $recaptcha_token The recaptcha token submitted with the form
	 *
	 * @return bool True when token is valid, else false
	 */
	private function verify_recaptcha( $recaptcha_token ) {

		$verify_token_request = wp_remote_post(
			self::GCAPTCHA_VERIFY_URL,
			[
				'timeout' => 30,
				'body'    => [
					'secret'   => get_option( 'coblocks_google_recaptcha_secret_key' ),
					'response' => $recaptcha_token,
				],
			]
		);

		if ( is_wp_error( $verify_token_request ) ) {

			return false;

		}

		$response = wp_remote_retrieve_body( $verify_token_request );

		if ( is_wp_error( $response ) ) {

			return false;

		}

		$response = json_decode( $response, true );

		if ( ! isset( $response['success'] ) ) {

			return false;

		}

		return $response['success'];

	}
}

new CoBlocks_Form();
