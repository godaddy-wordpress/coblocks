# CoBlocks Layout Selector

The layout selector allows site creators to chose from curated sets of starter blocks. The Layout Selector is only available to those who have the plugin [CoBlocks](https://wordpress.org/plugins/coblocks/) (2.0.0+) activated and [the Gutenberg plugin](https://wordpress.org/plugins/gutenberg/) activated running (8.0.0+). At time of release the Layout Selector includes a number of hand made layouts when you have the [Go](https://wordpress.org/themes/go/) theme active.

To access the Layout Selector a user must match all preceding conditions and create a new page on a WordPress site. At this point is when a user has the Layout Selector available for use.

## Screenshot
![image](https://user-images.githubusercontent.com/30462574/83181890-5e157280-a0da-11ea-8239-ccbe8e26d179.png)


## Extending available layouts in the layout selector

The following `PHP` filter can be used to add layouts for use with the CoBlocks layout selector.


```php
/**
 * Filter to extend available layouts within the layout selector.
 */
add_filter( 'coblocks_layout_selector_layouts', 'mycustom_layouts' );

/**
 * Set up layouts for 'home' category.
 *
 * @param array $layouts Array of block templates.
 */
function mycustom_layouts( $layouts ) {
    $layouts[] = array(
		'category' => 'home', // Category in which layout appears.
		'label'    => __( 'Welcome Home!', 'textdomain' ), // Serves as text for page title.
		'blocks'   => array( // Array of blocks.
			array(
				'core/heading',
				array(
					'align'   => 'center',
					'content' => __( 'Example heading text!', 'textdomain' ),
					'level'   => 2,
				),
				array(),
			),
			array(
				'core/paragraph',
				array(
					'align'   => 'center',
					'content' => __( 'Example paragraph text!', 'textdomain' ),
					'dropCap' => false,
				),
				array(),
            ),
            array(
				'core/gallery',
				array(
					'images'    => array(
						array(
							'url'     => 'coolexample.tld',
							'alt'     => __( 'Image description', 'textdomain' ),
							'id'      => 'about-image-1',
						),
						array(
							'url'     => 'coolexample.tld',
							'alt'     => __( 'Image description', 'textdomain' ),
							'id'      => 'about-image-2',
						),
						array(
							'url'     => 'coolexample.tld',
							'alt'     => __( 'Image description', 'textdomain' ),
							'id'      => 'about-image-3',
						),
					),
					'ids'       => array(),
					'caption'   => '',
					'imageCrop' => true,
					'linkTo'    => 'none',
					'sizeslug'  => 'large',
					'align'		=> 'wide',
					'className' => 'columns-2',
				),
				array(),
			),
        ),
    );

    return $layouts;
}
```

## Hide layout selector and related controls

The following `JavaScript` filter will globally disable the CoBlocks layout selector
and will prevent the controls from showing within the editor settings panel if the display conditions are met. 

```javascript
import { addFilter } from '@wordpress/hooks';

addFilter(
	'coblocks-show-layout-selector',
	'coblocks-show-layout-selector',
	function() {
		return false;
	},
);
```
