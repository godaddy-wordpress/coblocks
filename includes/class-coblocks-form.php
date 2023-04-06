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
	 * Default email subject line
	 *
	 * @var string
	 */
	public function default_subject() {
		// translators: placeholder for 'email' string.
		return sprintf( __( 'Form submission from [%1$s]', 'coblocks' ), __( 'email', 'coblocks' ) );
	}

	/**
	 * Default success text
	 *
	 * @var string
	 */
	public function default_success_text() {
		/**
		 * Filter the sent notice above the success message.
		 */
		return (string) apply_filters( 'coblocks_form_sent_notice', __( 'Your message was sent:', 'coblocks' ) );
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'form_recaptcha_assets' ) );

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
				array(),
				'3.0.0',
				true
			);

			wp_enqueue_script(
				'coblocks-google-recaptcha',
				CoBlocks()->asset_source( 'js' ) . 'coblocks-google-recaptcha.js',
				array( 'google-recaptcha' ),
				COBLOCKS_VERSION,
				true
			);

			wp_localize_script(
				'coblocks-google-recaptcha',
				'coblocksFormBlockAtts',
				array(
					'recaptchaSiteKey' => $recaptcha_site_key,
				)
			);

		}

	}

	/**
	 * Generate the form field label.
	 *
	 * @param  array $atts        Block attributes.
	 * @param  mixed $field_label Block content.
	 * @param  int   $count       Number of times the field has been rendered in the form.
	 *
	 * @return mixed Form field label markup.
	 */
	public function render_field_label( $atts, $field_label, $count = 1 ) {

		$label      = isset( $atts['label'] ) ? $atts['label'] : $field_label;
		$label_slug = $count > 1 ? sanitize_title( $label . '-' . $count ) : sanitize_title( $label );
		$styles     = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_styles', array(), $atts ) );
		$classes    = implode( ' ', (array) apply_filters( 'coblocks_render_label_color_wrapper_class', array( 'coblocks-label' ), $atts ) );

		/**
		 * Filter the required text in the field label.
		 *
		 * @param string $field_label Form field label text.
		 */
		$required_text  = (string) apply_filters( 'coblocks_form_label_required_text', '&#42;', $field_label );
		$required_attr  = ( isset( $atts['required'] ) && $atts['required'] ) ? 'required' : '';
		$required_label = empty( $required_attr ) ? '' : sprintf( ' <span class="required">%s</span>', esc_html( $required_text ) );

		/*
		 * Format an array of allowed HTML tags and attributes for the $required_label value.
		 *
		 * @link https://codex.wordpress.org/Function_Reference/wp_kses
		 */
		$allowed_html = array(
			'span' => array( 'class' => array() ),
		);

		if ( ! isset( $atts['hidden'] ) ) {
			printf(
				'<label class="%1$s"%2$s>%3$s%4$s</label>',
				esc_attr( $classes ),
				empty( $styles ) ? '' : wp_kses_post( " style='$styles'" ),
				wp_kses_post( $label ),
				wp_kses( $required_label, $allowed_html )
			);
		}

		?>

		<input type="hidden" name="field-<?php echo esc_attr( $label_slug ); ?>[label]" value="<?php echo esc_attr( $label ); ?>">

		<?php

	}

	/**
	 * Process the form submission
	 *
	 * @param  array $atts Block attributes.
	 *
	 * @return bool True when an email is sent, else false.
	 */
	public function process_form_submission( $atts ) {

		$form_submission = filter_input( INPUT_POST, 'action' );

		if ( ! $form_submission ) {

			return;

		}

		if ( 'coblocks-form-submit' !== htmlspecialchars( $form_submission ) ) {

			return;

		}

		$nonce = filter_input( INPUT_POST, 'form-submit' );

		if ( ! $nonce ) {

			return;

		}

		if ( ! wp_verify_nonce( htmlspecialchars( $nonce ), 'coblocks-form-submit' ) ) {

			return;

		}

		/**
		 * Check if the honeypot field was filled out and if so, bail.
		 */
		$honeypot_check = filter_input( INPUT_POST, 'coblocks-verify-email' );

		if ( ! empty( htmlspecialchars( $honeypot_check ) ) ) {

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

		$post_id        = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
		$post_title     = get_bloginfo( 'name' ) . ( ( false === $post_id ) ? '' : sprintf( ' - %s', get_the_title( $post_id ) ) );
		$email_field_id = isset( $_POST['email-field-id'] ) ? sanitize_text_field( $_POST['email-field-id'] ) : 'field-email';
		$name_field_id  = isset( $_POST['name-field-id'] ) ? sanitize_text_field( $_POST['name-field-id'] ) : 'field-name';

		$to = isset( $atts['to'] ) ? sanitize_email( $atts['to'] ) : get_option( 'admin_email' );

		unset( $_POST['form-submit'], $_POST['_wp_http_referer'], $_POST['action'], $_POST['form-hash'], $_POST['coblocks-verify-email'], $_POST['email-field-id'], $_POST['name-field-id'] );

		$recaptcha_site_key   = get_option( 'coblocks_google_recaptcha_site_key' );
		$recaptcha_secret_key = get_option( 'coblocks_google_recaptcha_secret_key' );
		if ( $recaptcha_site_key && $recaptcha_secret_key ) {
			if ( ! isset( $_POST['g-recaptcha-token'] ) || ! $this->verify_recaptcha( sanitize_text_field( $_POST['g-recaptcha-token'] ) ) ) {

				$this->remove_url_form_hash();

				return false;

			}

			unset( $_POST['g-recaptcha-token'] );

		}

		$this->email_content = '<ul>';

		foreach ( $_POST as $key => $data ) {

			if ( is_array( $data['value'] ) ) {

				$data['value'] = implode( ', ', $data['value'] );

			}

			$this->email_content .= '<li>' . wp_kses_post( $data['label'] ) . ': ' . wp_kses_post( $data['value'] ) . '</li>';

		}

		$this->email_content .= '</ul>';

		/**
		 * Filter the email to
		 *
		 * @param string  $to      Email to.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$to = sanitize_email( apply_filters( 'coblocks_form_email_to', $to, $_POST, $post_id ) );

		$name_field_value  = sanitize_text_field( $_POST[ $name_field_id ]['value'] );
		$email_field_value = sanitize_text_field( $_POST[ $email_field_id ]['value'] );
		/**
		 * Filter the email subject
		 *
		 * @param string $subject Email subject.
		 * @param array  $_POST   Submitted form data.
		 */
		$subject = (string) apply_filters(
			'coblocks_form_email_subject',
			$this->setup_email_subject( $atts, $name_field_value, $email_field_value ),
			$_POST
		);

		/**
		 * Filter the form email content.
		 *
		 * @param string  $this->email_content Email content.
		 * @param array   $_POST               Submitted form data.
		 * @param integer $post_id             Current post ID.
		 */
		$email_content = (string) apply_filters( 'coblocks_form_email_content', $this->email_content, $_POST, $post_id );

		$sender_email = isset( $_POST[ $email_field_id ]['value'] ) ? sanitize_text_field( $_POST[ $email_field_id ]['value'] ) : '';
		$sender_name  = isset( $_POST[ $name_field_id ]['value'] ) ? sanitize_text_field( $_POST[ $name_field_id ]['value'] ) : '';

		$headers = array();

		if ( ! empty( $sender_email ) ) {

			$headers[] = empty( $sender_name ) ? "Reply-To: {$sender_email}" : "Reply-To: {$sender_name} <{$sender_email}>";

		}

		/**
		 * Filter the form email headers.
		 *
		 * @param array   []       Email headers.
		 * @param array   $_POST   Submitted form data.
		 * @param integer $post_id Current post ID.
		 */
		$email_headers = (array) apply_filters(
			'coblocks_form_email_headers',
			$headers,
			$_POST,
			$post_id
		);

		add_filter( 'wp_mail_content_type', array( $this, 'enable_html_email' ) );

		$email = wp_mail( $to, $subject, $email_content, $email_headers );

		remove_filter( 'wp_mail_content_type', array( $this, 'enable_html_email' ) );

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
	 * Setup the email subject line, replacing any found shortcodes.
	 * Note: [email] will be replaced with the value of field-email
	 *       [name] will be replaced with the value of field-name etc.
	 *
	 * @param  array  $atts           Block attributes array.
	 * @param  string $name_field_value Name field value.
	 * @param  string $email_field_value Email field value.
	 * @return string Email subject.
	 */
	private function setup_email_subject( $atts, $name_field_value, $email_field_value ) {

		$subject = isset( $atts['subject'] ) ? sanitize_text_field( $atts['subject'] ) : self::default_subject();

		preg_match_all( '/\[(.*?)\]/i', $subject, $matches );

		if ( isset( $matches[1] ) ) {

			array_walk(
				$matches[1],
				function( $match, $key ) use ( $matches, &$subject, &$name_field_value, &$email_field_value ) {
					$slug_match = strtolower( str_replace( ' ', '', $match ) );

					if ( __( 'name', 'coblocks' ) === $slug_match ) {

						if ( isset( $name_field_value ) ) {
							$value = empty( $name_field_value ) ? $matches[0][ $key ] : $name_field_value;
						} else {

							$value = $matches[0][ $key ];

						}
					} elseif ( __( 'email', 'coblocks' ) === $slug_match ) {

						$value = isset( $email_field_value ) ? $email_field_value : $matches[0][ $key ];

					}

					/**
					 * Filter the matched shortcode value.
					 *
					 * @param string  $value      Email content.
					 * @param string  $slug_match Matched string.
					 */
					$replacement = (string) apply_filters( 'coblocks_form_shortcode_match', $value, $slug_match );

					$subject = str_replace( $matches[0][ $key ], $replacement, $subject );
				}
			);

		}

		return $subject;

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
	 * @param  array $atts Block attributes array.
	 * @return mixed Success Text followed by the submitted form data.
	 */
	public function success_message( $atts ) {

		$sent_notice = ( isset( $atts['successText'] ) && ! empty( $atts['successText'] ) ) ? $atts['successText'] : $this->default_success_text();

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
				'<div class="coblocks-form__submitted">%1$s %2$s</div>',
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
	 * @param string $recaptcha_token The recaptcha token submitted with the form.
	 *
	 * @return bool True when token is valid, else false
	 */
	private function verify_recaptcha( $recaptcha_token ) {

		$verify_token_request = wp_remote_post(
			self::GCAPTCHA_VERIFY_URL,
			array(
				'timeout' => 30,
				'body'    => array(
					'secret'   => get_option( 'coblocks_google_recaptcha_secret_key' ),
					'response' => $recaptcha_token,
				),
			)
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
