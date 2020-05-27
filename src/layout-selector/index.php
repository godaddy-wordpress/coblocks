<?php
/**
 * Feature: Layout Selector
 *
 * @package CoBlocks
 */

/**
 * Get the categories for the layout selector.
 *
 * @return array
 */
function coblocks_layout_selector_categories() {
	$categories = array(
		array(
			'slug'  => 'about',
			'title' => __( 'About', 'coblocks' ),
		),
		array(
			'slug'  => 'contact',
			'title' => __( 'Contact', 'coblocks' ),
		),
		array(
			'slug'  => 'home',
			'title' => __( 'Home', 'coblocks' ),
		),
		array(
			'slug'  => 'portfolio',
			'title' => __( 'Portfolio', 'coblocks' ),
		),
	);

	/**
	 * Filters the available categories used by the Layout Selector.
	 *
	 * @param array $categories The available categories.
	 */
	return apply_filters( 'coblocks_layout_selector_categories', $categories );
}

/**
 * Get the layouts for the layout selector.
 *
 * @return array
 */
function coblocks_layout_selector_layouts() {
	$layouts = array();

	/**
	 * Filters the available layouts used by the Layout Selector.
	 *
	 * @param array $layouts The available layouts.
	 */
	return apply_filters( 'coblocks_layout_selector_layouts', $layouts );
}

/**
 * Localize layout and category definitions for the Layout Selector component.
 */
function coblocks_localize_layout_selector() {
	wp_localize_script(
		'coblocks-editor',
		'coblocksLayoutSelector',
		array(
			'layouts'    => coblocks_layout_selector_layouts(),
			'categories' => coblocks_layout_selector_categories(),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'coblocks_localize_layout_selector' );

/**
 * Example Layouts.
 * TODO: remove before merging!
 *
 * @param array $layouts The layouts being filtered.
 */
function coblocks_layout_selector_examples( $layouts ) {
	$layouts[] = array(
		'category' => 'about',
		'label'    => __( 'Meet the team', 'go' ),
		'blocks'   => array(
			array(
				'core/media-text',
				array(
					'mediaUrl'  => 'https://img1.wsimg.com/wpnux/v2/starter-content/templates/connies/attachments/home-image-1.jpg',
					'mediaType' => 'image',
				),
				array(
					array(
						'core/heading',
						array(
							'level'   => 1,
							'content' => 'Fresh made, tasty, ice cream.',
						),
					),
					array(
						'core/buttons',
						array(),
						array(
							array(
								'core/button',
								array(
									'text' => 'Grab a scoop',
								),
							),
						),
					),
				),
			),
			array(
				'core/heading',
				array(
					'level'   => 2,
					'content' => 'Indulge in the classics, or try something new – there’s a flavor for everyone.',
					'align'   => 'center',
				),
			),
			array(
				'core/columns',
				array(),
				array(
					array(
						'core/column',
						array(),
						array(
							array(
								'core/heading',
								array(
									'level'   => 4,
									'content' => 'The inside scoop',
									'align'   => 'center',
								),
							),
							array(
								'core/paragraph',
								array(
									'content' => 'We’re a local mom-and-mom shop, run by Connie and Jane. We love big, beautiful, bold and delicious flavors.',
									'align'   => 'center',
								),
							),
						),
					),
					array(
						'core/column',
						array(),
						array(
							array(
								'core/heading',
								array(
									'level'   => 4,
									'content' => 'Grab a scoop, or two',
									'align'   => 'center',
								),
							),
							array(
								'core/paragraph',
								array(
									'content' => 'We’re open Monday through Friday, 11am – 9pm, and Saturdays – 9am-10pm. Come treat yourself!',
									'align'   => 'center',
								),
							),
						),
					),
				),
			),
		),
	);

	return $layouts;
}
add_filter( 'coblocks_layout_selector_layouts', 'coblocks_layout_selector_examples' );
