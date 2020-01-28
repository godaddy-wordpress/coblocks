Disable sending of email upon Form block submission.
```php
/**
 * Disable form submission emails.
 */
add_filter( 'coblocks_form_disable_emails', '__return_true' );

/**
 * Set a custom success message to mimic a successful form submission
 *
 * @return string Form submission success message
 */
function coblocks_form_sent_message() {

	return __( 'Your message was sent.', 'textdomain' );

}
add_filter( 'coblocks_form_sent_notice', 'coblocks_form_sent_message' );
```