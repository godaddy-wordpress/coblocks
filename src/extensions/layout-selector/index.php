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
		array(
			'slug' => 'testing',
			'title' => __( 'Testing', 'coblocks' ),
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

	for ( $i=0; $i <= 100; $i++ ) {
		$layouts[] = array(
			'category' => 'testing',
			'label'    => __( 'About', 'go' ),
			'blocks'   => array(
				array(
					'core/heading',
					array(
						'align'   => 'center',
						'content' => __( 'Hi, I’m Everett', 'go' ),
						'level'   => 2,
					),
					array(),
				),
				array(
					'core/paragraph',
					array(
						'align'   => 'center',
						'content' => __( 'A tenacious, loving and energetic photographer who enjoys grabbing her camera and running out to take some photos.', 'go' ),
						'dropCap' => false,
					),
					array(),
				),
				array(
					'core/button',
					array(

						'text'  => __( 'Work With Me', 'go' ),
						'align' => 'center',
					),
					array(),
				),
				array(
					'core/gallery',
					array(
						'images'    => array(
							array(
								'url'     => get_theme_file_uri( '/partials/layouts/images/1x1.jpg' ),
								'alt'     => __( 'Image description', 'go' ),
								'id'      => 'about-image-1',
								'caption' => '',
							),
							array(
								'url'     => get_theme_file_uri( '/partials/layouts/images/1x1.jpg' ),
								'alt'     => __( 'Image description', 'go' ),
								'id'      => 'about-image-1',
								'caption' => '',
							),
							array(
								'url'     => get_theme_file_uri( '/partials/layouts/images/1x1.jpg' ),
								'fullUrl' => get_theme_file_uri( '/partials/layouts/images/1x1.jpg' ),
								'alt'     => __( 'Image description', 'go' ),
								'id'      => 'about-image-1',
								'caption' => '',
							),
						),
						'ids'       => array(),
						'caption'   => '',
						'imageCrop' => true,
						'linkTo'    => 'none',
						'sizeslug'  => 'large',
						'columns'   => 3,
						'align'     => 'wide',
					),
					array(),
				),
				array(
					'core/columns',
					array(
						'align' => 'wide',
					),
					array(
						array(
							'core/column',
							array(),
							array(
								array(
									'core/heading',
									array(
										'content' => __( 'Early on', 'go' ),
										'level'   => 3,
									),
									array(),
								),
								array(
									'core/paragraph',
									array(
										'content' => __( 'I am so fascinated by photography and it’s capability to bring your imagination to amazing places. Early on, I fell in love with the idea of filming my own productions, so I set out to learn everything I could.', 'go' ),
										'dropCap' => false,
									),
									array(),
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
										'content' => __( 'Current', 'go' ),
										'level'   => 3,
									),
									array(),
								),
								array(
									'core/paragraph',
									array(
										'content' => __( 'I have been teaching myself filmmaking for the past four and a half years and I’m still learning every day. I am building my business as a freelance filmmaker, as well as working on my own photo shoots.', 'go' ),
										'dropCap' => false,
									),
									array(),
								),
							),
						),
					),
				),
			),
		);
	}

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
	$current_screen   = get_current_screen();
	$screen_post_type = $current_screen->post_type;

	$allowed_post_types = array(
		'page',
	);

	wp_localize_script(
		'coblocks-editor',
		'coblocksLayoutSelector',
		array(
			'postTypeEnabled' => in_array( $screen_post_type, $allowed_post_types, true ),
			'layouts'         => coblocks_layout_selector_layouts(),
			'categories'      => coblocks_layout_selector_categories(),
		)
	);
}
add_action( 'admin_enqueue_scripts', 'coblocks_localize_layout_selector' );
