# CoBlocks Theme Layout Selector

## Extending available layouts in the layout selector

The following `PHP` filter can be used to add layouts or block templates for use with the CoBlocks layout selector.


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
		'category' => 'home',                     // Category in which layout appears.
		'label'    => __( 'Welcome Home!', 'textdomain' ), // Serves as text for page title.
		'blocks'   => array(                       // Array of blocks or layout.
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
					'className' => 'alignwide columns-2',
				),
				array(),
			),
        ),
    );

    return $layouts;
}
```
