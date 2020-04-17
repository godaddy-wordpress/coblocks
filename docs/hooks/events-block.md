# Events Block Settings

## Use custom error message when zero event items are found

The following `PHP` filter can be used to customize a specific Events block error message.


```php
/**
 * Customize Events block error message.
 */
add_filter( 'coblocks_events_error_message', 'updateEventsError' );

function updateEventsError() {
	return __( 'Here is a custom error message!', 'textdomain' );
}
```

## Screenshots
![custom-events-error](https://user-images.githubusercontent.com/30462574/79581234-fef62400-807e-11ea-973d-669871e1a797.png)
