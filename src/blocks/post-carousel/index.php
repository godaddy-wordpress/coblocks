<?php
/**
 * Server-side rendering of the `post-carousel` block.
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
function coblocks_render_post_carousel_block( $attributes ) {

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

		$key = ( isset( $attributes['categoryRelation'] ) && 'and' === $attributes['categoryRelation'] ) ? 'category__and' : 'category__in';

		$args[ $key ] = array_column( $attributes['categories'], 'id' );

	}

	if ( 'external' === $attributes['postFeedType'] && $attributes['externalRssUrl'] ) {

		$recent_posts = fetch_feed( $attributes['externalRssUrl'] );

		if ( is_wp_error( $recent_posts ) ) {

			return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS error:', 'coblocks' ) . '</strong> ' . $recent_posts->get_error_message() . '</div></div>';

		}

		if ( ! $recent_posts->get_item_quantity() ) {

			// PHP 5.2 compatibility. See: http://simplepie.org/wiki/faq/i_m_getting_memory_leaks.
			$recent_posts->__destruct();

			unset( $recent_posts );

			return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.', 'coblocks' ) . '</div></div>';

		}

		$recent_posts    = $recent_posts->get_items( 0, $attributes['postsToShow'] );
		$formatted_posts = coblocks_get_rss_post_carousel_info( $recent_posts );

	} else {

		$recent_posts    = get_posts( $args );
		$formatted_posts = coblocks_get_post_carousel_info( $recent_posts );

	}

	$block_layout = null;

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-horizontal' ) !== false ) {

		$block_layout = 'horizontal';

	} elseif ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-stacked' ) !== false ) {

		$block_layout = 'stacked';

	} else {

		$block_layout = 'carousel';

	}

	return coblocks_post_carousel( $formatted_posts, $attributes );
}

/**
 * Renders the carousel style.
 *
 * @param array $posts Current posts.
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content for the carousel.
 */
function coblocks_post_carousel( $posts, $attributes ) {

	$class = 'wp-block-coblocks-post-carousel external';

	if ( isset( $attributes['className'] ) ) {

		$class .= ' ' . $attributes['className'];

	}

	if ( isset( $attributes['align'] ) ) {

		$class .= ' align' . $attributes['align'];

	}

	$right_to_left = false;

	if ( is_rtl() ) {
		$right_to_left = true;
	}

	$block_content = sprintf(
		'<div class="%1$s"><div class="coblocks-swiper swiper-container pb-8" data-swiper="%2$s">',
		esc_attr( $class ),
		esc_attr(
			wp_json_encode(
				/**
				 * Filter the slick slider carousel settings
				 *
				 * @var array Slick slider settings.
				 */
				(array) apply_filters(
					'coblocks_post_carousel_settings',
					array(
						'slidesToScroll' => 1,
						'arrow'          => true,
						'slidesToShow'   => $attributes['columns'],
						'infinite'       => true,
						'adaptiveHeight' => false,
						'draggable'      => true,
						'rtl'            => $right_to_left,
						'responsive'     => array(
							array(
								'breakpoint' => 1024,
								'settings'   => array(
									'slidesToShow' => 3,
								),
							),
							array(
								'breakpoint' => 600,
								'settings'   => array(
									'slidesToShow' => 2,
								),
							),
							array(
								'breakpoint' => 480,
								'settings'   => array(
									'slidesToShow' => 1,
								),
							),
						),
					)
				)
			)
		)
	);

	$block_content .= '<div class="swiper-wrapper" >';

	$list_items_markup = '';

	foreach ( $posts as $post ) {

		$list_items_markup .= '<div class="wp-block-coblocks-post-carousel__item swiper-slide">';

		if ( null !== $post['thumbnailURL'] && $post['thumbnailURL'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-post-carousel__image"><a href="%1$s" class="bg-cover bg-center-center" style="background-image:url(%2$s)"></a></div>',
				esc_url( $post['postLink'] ),
				esc_url( $post['thumbnailURL'] )
			);
		}

		$list_items_markup .= '<div class="wp-block-coblocks-post-carousel__content">';

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {

			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-post-carousel__date">%2$s</time>',
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
				'<div class="wp-block-coblocks-post-carousel__excerpt">%1$s</div>',
				$trimmed_excerpt
			);

		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {

			$list_items_markup .= sprintf(
				'<a href="%1$s" class="wp-block-coblocks-post-carousel__more-link">%2$s</a>',
				esc_url( $post['postLink'] ),
				esc_html( $attributes['postLink'] )
			);

		}

		$list_items_markup .= '</div></div>';

	}

	$block_content .= $list_items_markup;

	$block_content .= '</div>';
	$block_content .= '</div>';

	$block_content .= '<button class="wp-coblocks-post-carousel-nav-button__prev" id="wp-coblocks-post-carousel-swiper-prev" style="visibility:hidden" />';
	$block_content .= '<button class="wp-coblocks-post-carousel-nav-button__next" id="wp-coblocks-post-carousel-swiper-next" style="visibility:hidden" />';

	$block_content .= '</div>';

	return $block_content;

}

/**
 * Returns the posts for an internal post-carousel.
 *
 * @param array $posts Current posts.
 *
 * @return array Returns posts.
 */
function coblocks_get_post_carousel_info( $posts ) {

	$formatted_posts = array();

	foreach ( $posts as $post ) {

		$formatted_post = null;

		$formatted_post['thumbnailURL'] = get_the_post_thumbnail_url( $post, 'full' );
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
 * Returns the posts for an external rss feed.
 *
 * @param array $posts current posts.
 *
 * @return array returns posts.
 */
function coblocks_get_rss_post_carousel_info( $posts ) {

	$formatted_posts = array();

	foreach ( $posts as $post ) {

		$title = esc_html( trim( wp_strip_all_tags( $post->get_title() ) ) );

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

/**
 * Registers the `post-carousel` block on server.
 */
function coblocks_register_post_carousel_block() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$dir = CoBlocks()->asset_source( 'js' );

	// Load attributes from block.json.
	ob_start();
	include COBLOCKS_PLUGIN_DIR . 'src/blocks/post-carousel/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'coblocks/post-carousel',
		array(
			'attributes'      => $metadata['attributes'],
			'render_callback' => 'coblocks_render_post_carousel_block',
		)
	);
}
add_action( 'init', 'coblocks_register_post_carousel_block' );

/**
 * Handles outdated versions of the `coblocks/post-carousel` block by converting
 * attribute `categories` from a numeric string to an array with key `id`.
 *
 * This is done to accommodate the changes introduced in https://github.com/WordPress/gutenberg/pull/20781 that sought to
 * add support for multiple categories to the block. However, given that this
 * block is dynamic, the usual provisions for block migration are insufficient,
 * as they only act when a block is loaded in the editor.
 *
 * Remove when and if the bottom client-side deprecation for this block is removed.
 *
 * @param array $block A single parsed block object.
 *
 * @return array The migrated block object.
 */
function coblocks_post_carousel_migrate_categories( $block ) {
	if (
		'coblocks/post-carousel' === $block['blockName'] &&
		! empty( $block['attrs']['categories'] ) &&
		is_string( $block['attrs']['categories'] )
	) {
		$block['attrs']['categories'] = array(
			array( 'id' => absint( $block['attrs']['categories'] ) ),
		);
	}
	return $block;
}

add_filter( 'render_block_data', 'coblocks_post_carousel_migrate_categories' );
