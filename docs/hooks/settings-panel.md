# Editor Settings

## Customize labels

The following JavaScript filter will customize the text used for the menu item
label and panel titles: 

```javascript
import { addFilter } from '@wordpress/hooks';

function updateSettingsTitle() {
	return __( 'Here is a new title!', 'textdomain' );
}

addFilter(
	'coblocks-settings-title',
	'coblocks-settings-title',
	updateSettingsTitle,
);
```

## Disable the modal entirely

The following `PHP` filter can be used to prevent the editor settings panel from appearing within the editor.

```php
add_filter( 'coblocks_show_settings_panel', '__return_false' );
```

## Screenshots
![editor-settings](https://user-images.githubusercontent.com/1813435/74862708-9c043d00-531a-11ea-9410-61968ad0e86d.jpg)
![editor-settings-open](https://user-images.githubusercontent.com/1813435/74862836-cfdf6280-531a-11ea-987c-2f795557b2d3.jpg)
