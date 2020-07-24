# Editor Settings

## Add Fill to settings panel using SlotFill functionality

The following `JavaScript` filter will allow insertion of react components within the CoBlocks settings modal. To use the filter push React classes or functional components onto the controls array provided by the filter. The filtered components then are able to render within the CoBlocks settings modal. 

*Example usage*
```javascript
import { addFilter } from '@wordpress/hooks';

const buttonControls = (
	<Button>Sample Controls</Button>
);

addFilter( 'coblocks-settings-modal-controls', 'custom-slug', ( controls ) => {
	controls.push( buttonControls );
	return controls;
} );
```

![image](https://user-images.githubusercontent.com/30462574/87710720-f9ca7300-c75a-11ea-97dd-d736d74eaf70.png)

## Customize labels

The following `JavaScript` filter will customize the text used for the menu item
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
