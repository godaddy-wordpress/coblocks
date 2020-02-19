## Editor Settings modal

## Customize settings labels

The following JavaScript filter will customize the text used for the menu item
label and panel title.

```javascript
import { addFilter } from '@wordpress/hooks';

addFilter( 'coblocks-settings-title', 'coblocks-settings-title', updateSettingsTitle );

function updateSettingsTitle() {
	return __( 'Here is a new title!', 'textdomain' );
}
```

## Disable the modal entirely

The following `PHP` filter can be used to prevent the editor settings panel from appearing within the editor.

```php
add_filter( 'coblocks_show_settings_panel', '__return_false' );
```
