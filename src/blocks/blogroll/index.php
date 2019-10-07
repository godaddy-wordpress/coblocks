<?php
/**
 * Server-side rendering of the `blogroll` block.
 *
 * @package WordPress
 */

/**
 * Renders the block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_blogroll_block( $attributes ) {

	global $post;

	$args = array(
		'posts_per_page'   => $attributes['postsToShow'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
		'post__not_in'     => array( $post->ID ),
	);

	if ( isset( $attributes['categories'] ) ) {

		$args['category'] = $attributes['categories'];

	}

	if ( 'external' === $attributes['postFeedType'] && $attributes['externalRssUrl'] ) {

		$recent_posts = fetch_feed( $attributes['externalRssUrl'] );

		if ( is_wp_error( $recent_posts ) ) {

			return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS Error:' ) . '</strong> ' . $recent_posts->get_error_message() . '</div></div>';

		}

		if ( ! $recent_posts->get_item_quantity() ) {

			// PHP 5.2 compatibility. See: http://simplepie.org/wiki/faq/i_m_getting_memory_leaks.
			$recent_posts->__destruct();

			unset( $recent_posts );

			return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';

		}

		$recent_posts    = $recent_posts->get_items( 0, $attributes['postsToShow'] );
		$formatted_posts = coblocks_extract_external_info( $recent_posts );

	} else {

		$recent_posts    = get_posts( $args );
		$formatted_posts = coblocks_extract_internal_info( $recent_posts );

	}

	$block_layout = null;

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-list' ) !== false ) {

		$block_layout = 'list';

	} elseif ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-grid' ) !== false ) {

		$block_layout = 'grid';

	} else {

		$block_layout = 'carousel';

	}

	if ( 'carousel' === $block_layout ) {

		return coblocks_blogroll_carousel_style( $formatted_posts, $attributes );

	} else {

		return coblocks_blogroll_list_grid_style( $formatted_posts, $attributes );

	}
}

function coblocks_blogroll_list_grid_style( $posts, $attributes ) {

	$class        = 'wp-block-coblocks-blogroll';
	$block_layout = strpos( $attributes['className'], 'is-style-grid' ) !== false ? 'grid' : 'list';

	if ( isset( $attributes['className'] ) ) {

		$class .= ' ' . $attributes['className'];

	}

	if ( isset( $attributes['align'] ) ) {

		$class .= ' align' . $attributes['align'];

	}

	if ( isset( $attributes['columns'] ) ) {

		$class .= ' columns columns-' . $attributes['columns'];

	}

	$block_content = sprintf(
		'<ul class="%s list-none ml-0 pl-0">',
		esc_attr( $class )
	);

	$list_items_markup = '';
	$list_items_class  = '';

	foreach ( $posts as $post ) {

		$list_class       = '';
		$image_class      = '';
		$align_self_class = '';

		if ( isset( $attributes['listPosition'] ) && 'list' === $block_layout ) {

			if ( 'left' === $attributes['listPosition'] ) {
				$image_class .= ' mr-6';
			} else {
				$image_class     .= ' ml-6';
				$list_items_class = 'flex-row-reverse';
			}
		}

		if ( isset( $attributes['imageSize'] ) && 'list' === $block_layout ) {

			$image_class .= ' ' . $attributes['imageSize'];
		}

		$list_items_markup .= sprintf(
			'<li class="flex flex-auto items-stretch w-full mb-7 %1$s">',
			$list_items_class
		);

		if ( null !== $post['thumbnailURL'] && $post['thumbnailURL'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blogroll__image flex-0 %1$s"><a href="%2$s" class="block w-full h-full bg-cover bg-center-center pt-full" style="background-image:url(%3$s)"></a></div>',
				esc_attr( $image_class ),
				esc_url( $post['postLink'] ),
				esc_url( $post['thumbnailURL'] )
			);

			$align_self_class = 'self-center';

		} else {
			$align_self_class = 'flex-start';
		}

		$list_items_markup .= sprintf(
			'<div class="wp-block-coblocks-blogroll__content flex flex-col %s w-full">',
			esc_attr( $align_self_class )
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {

			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-blogroll__date">%2$s</time>',
				esc_url( $post['date'] ),
				esc_html( $post['dateReadable'] )
			);

		}

		$title = $post['title'];

		if ( ! $title ) {

			$title = _x( '(no title)', 'placeholder when a post has no title', 'coblocks' );

		}

		$list_items_markup .= sprintf(
			'<a href="%1$s" alt="%2$s">%2$s</a>',
			$post['postLink'],
			$title
		);

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent'] ) {

			$post_excerpt    = $post['postExcerpt'];
			$trimmed_excerpt = esc_html( wp_trim_words( $post_excerpt, $attributes['excerptLength'], ' &hellip; ' ) );

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blogroll__post-excerpt">%1$s</div>',
				esc_html( $trimmed_excerpt )
			);

		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blogroll__more-link"><a href="%1$s">%2$s</a></div>',
				esc_url( $post['postLink'] ),
				esc_html( $attributes['postLink'] )
			);

		}

		$list_items_markup .= '</li>';

	}

	$block_content .= $list_items_markup;
	$block_content .= '</ul>';

	return $block_content;

}

function coblocks_blogroll_carousel_style( $posts, $attributes ) {

	$arrows         = $attributes['prevNextButtons'] ? 'true' : 'false';
	$auto_play      = $attributes['autoPlay'] ? 'true' : 'false';
	$draggable      = (string) $attributes['draggable'] ? 'true' : 'false';
	$infinite_slide = $attributes['infiniteSlide'] ? 'true' : 'false';

	$class = 'wp-block-coblocks-blogroll';

	if ( isset( $attributes['className'] ) ) {

		$class .= ' ' . $attributes['className'];

	}

	if ( isset( $attributes['align'] ) ) {

		$class .= ' align' . $attributes['align'];

	}

	$block_content = sprintf(
		'<div class="carousel-container %1$s" data-slick="%2$s">',
		esc_attr( $class ),
		esc_attr(
			json_encode(
				/**
				 * Filter the slick slider carousel settings
				 *
				 * @var array Slick slider settings.
				 */
				(array) apply_filters(
					'coblocks_blogroll_carousel_style_settings',
					[
						'slidesToScroll' => 1,
						'arrow'          => $arrows,
						'autoPlay'       => $auto_play,
						'autoPlaySpeed'  => $attributes['autoPlaySpeed'],
						'slidesToShow'   => $attributes['visibleItems'],
						'infinite'       => $infinite_slide,
						'adaptiveHeight' => false,
						'draggable'      => $draggable,
					]
				),
				true
			)
		)
	);

	$list_items_markup = '';

	foreach ( $posts as $post ) {

		$list_items_markup .= '<div class="coblocks-blog-post--item">';
		$list_items_markup .= '<div class="coblocks-blog-post--item-inner">';

		if ( null !== $post['thumbnailURL'] && $post['thumbnailURL'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blogroll__image" style="background-image:url(%2$s)"><a href="%1$s"></a></div>',
				esc_url( $post['postLink'] ),
				esc_url( $post['thumbnailURL'] )
			);

		}

		$item_info_class = 'wp-block-coblocks-blogroll__content ';

		if ( null === $post['thumbnailURL'] || ! $post['thumbnailURL'] ) {

			$item_info_class .= 'full-height ';

		}

		$list_items_markup .= sprintf(
			'<div class="%1$s"</div>',
			$item_info_class
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {

			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-blogroll__date">%2$s</time>',
				$post['date'],
				$post['dateReadable']
			);

		}

		$title = $post['title'];

		if ( ! $title ) {

			$title = _x( '(no title)', 'placeholder when a post has no title', 'coblocks' );

		}

		$list_items_markup .= sprintf(
			'<a href="%1$s" alt="%2$s">%2$s</a>',
			esc_url( $post['postLink'] ),
			esc_html( $title )
		);

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent'] ) {

			$post_excerpt    = $post['postExcerpt'];
			$trimmed_excerpt = esc_html( wp_trim_words( $post_excerpt, $attributes['excerptLength'], ' &hellip; ' ) );

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blogroll__post-excerpt"><p>%1$s</p></div>',
				$trimmed_excerpt
			);

		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {

			$list_items_markup .= sprintf(
				'<a href="%1$s" class="wp-block-coblocks-blogroll__more-link self-start mt-2">%2$s</a>',
				esc_url( $post['postLink'] ),
				esc_html( $attributes['postLink'] )
			);

		}

		$list_items_markup .= '</div></div></div>';

	}

	$block_content .= $list_items_markup;
	$block_content .= '</div>';

	return $block_content;

}

function coblocks_extract_external_info( $posts ) {

	$formatted_posts = [];

	foreach ( $posts as $post ) {

		$title = esc_html( trim( strip_tags( $post->get_title() ) ) );

		$formatted_post = null;

		$formatted_post['date']         = date_i18n( get_option( 'c' ), $post->get_date( 'U' ) );
		$formatted_post['dateReadable'] = date_i18n( get_option( 'date_format' ), $post->get_date( 'U' ) );
		$formatted_post['title']        = $title;
		$formatted_post['postLink']     = esc_url( $post->get_link() );
		$formatted_post['postExcerpt']  = html_entity_decode( $post->get_description(), ENT_QUOTES, get_option( 'blog_charset' ) );

		$output = preg_match_all( '/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->get_content(), $matches );

		$first_img = false;

		if ( $matches && ! empty( $matches[1] ) ) {

			$first_img = $matches[1][0];

		}

		$formatted_post['thumbnailURL'] = $first_img;

		$formatted_posts[] = $formatted_post;

	}

	return $formatted_posts;

}

function coblocks_extract_internal_info( $posts ) {

	$formatted_posts = [];

	foreach ( $posts as $post ) {

		$formatted_post = null;

		$formatted_post['thumbnailURL'] = get_the_post_thumbnail_url( $post );
		$formatted_post['date']         = esc_attr( get_the_date( 'c', $post ) );
		$formatted_post['dateReadable'] = esc_html( get_the_date( '', $post ) );
		$formatted_post['title']        = get_the_title( $post );
		$formatted_post['postLink']     = esc_url( get_permalink( $post ) );

		$post_excerpt = $post->post_excerpt;

		if ( ! ( $post_excerpt ) ) {

			$post_excerpt = $post->post_content;

		}

		$formatted_post['postExcerpt'] = $post_excerpt;

		$formatted_posts[] = $formatted_post;

	}

	return $formatted_posts;

}

/**
 * Registers the `blogroll` block on server.
 */
function coblocks_register_blogroll_block() {

	if ( ! function_exists( 'register_block_type' ) ) {

		return;

	}

	$dir = CoBlocks()->asset_source( 'js' );

	wp_register_script(
		'coblocks-slick-initializer',
		$dir . 'coblocks-slick-initializer' . COBLOCKS_ASSET_SUFFIX . '.js',
		array( 'jquery' )
	);

	register_block_type(
		'coblocks/blogroll',
		array(
			'attributes'      => array(
				'className'          => array(
					'type' => 'string',
				),
				'align'              => array(
					'type' => 'string',
				),
				'categories'         => array(
					'type' => 'string',
				),
				'postsToShow'        => array(
					'type'    => 'number',
					'default' => 2,
				),
				'displayPostContent' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostLink'    => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postLink'           => array(
					'type'    => 'string',
					'default' => __( 'Read more', 'coblocks' ),
				),
				'postFeedType'       => array(
					'type'    => 'string',
					'default' => 'internal',
				),
				'externalRssUrl'     => array(
					'type'    => 'string',
					'default' => '',
				),
				'excerptLength'      => array(
					'type'    => 'number',
					'default' => 12,
				),
				'imageSize'          => array(
					'type'    => 'string',
					'default' => 'w-1/5 h-1/5',
				),
				'displayPostDate'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'listPosition'       => array(
					'type'    => 'string',
					'default' => 'right',
				),
				'columns'            => array(
					'type'    => 'number',
					'default' => 1,
				),
				'order'              => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'            => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'prevNextButtons'    => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'draggable'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'autoPlay'           => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'autoPlaySpeed'      => array(
					'type'    => 'string',
					'default' => 3000,
				),
				'visibleItems'       => array(
					'type'    => 'number',
					'default' => 2,
				),
				'infiniteSlide'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'coblocks_render_blogroll_block',
			'editor_script'   => 'coblocks-slick-initializer',
		)
	);
}
add_action( 'init', 'coblocks_register_blogroll_block' );
