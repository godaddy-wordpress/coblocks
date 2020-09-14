# Form Block Settings

## Prevent Email Fire

The following `PHP` filter can be used to prevent the Form block from sending email upon form submission.


```php
/**
 * Disable form submission emails.
 */
add_filter( 'coblocks_form_disable_emails', '__return_true' );

```

## Customize Success Message

The following `PHP` filter can be used to set a custom form email fire success message to display on the front end.

```php
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

## Customize the Checkbox Required Text

The following `PHP` filter can be used to set a custom response when a required checkbox group has no options set before submitting the form.

```php
/**
 * Set a custom error message to display when a required checkbox 
 * group has no options set before submitting the form.
 *
 * @return string Form submission success message
 */
function coblocks_checkbox_required_text() {

	return __( 'Please check at least one checkbox.', 'textdomain' );

}
add_filter( 'coblocks_form_checkbox_required_text', 'coblocks_checkbox_required_text' );
```
