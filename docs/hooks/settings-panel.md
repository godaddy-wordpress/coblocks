## Customize settings panel title

The following JavaScript filter will customize the text used for the menu item
label and panel title.

```javascript
import { addFilter } from '@wordpress/hooks';

addFilter( 'coblocks-settings-title', 'coblocks-settings-title', updateSettingsTitle );

function updateSettingsTitle() {
	return __( 'Here is a new title!', 'textdomain' );
}
```

## Disable settings panel

The following php filter can be used to prevent the settings panel from
appearing in the editor.

```php
add_filter( 'coblocks_show_settings_panel', '__return_false' );
```
