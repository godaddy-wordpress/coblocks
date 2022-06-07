<?php
/**
 * Server-side rendering of the `posts` block.
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
function coblocks_render_posts_block( $attributes ) {

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
		$formatted_posts = coblocks_get_rss_post_info( $recent_posts );

	} else {

		$recent_posts    = get_posts( $args );
		$formatted_posts = coblocks_get_post_info( $recent_posts );

	}

	$block_style = null;

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-horizontal' ) !== false ) {

		$block_style = 'horizontal';

	} elseif ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-stacked' ) !== false ) {

		$block_style = 'stacked';

	}

	return coblocks_posts( $formatted_posts, $attributes );
}

/**
 * Renders the list and grid styles.
 *
 * @param array $posts Current posts.
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content for the list and grid styles.
 */
function coblocks_posts( $posts, $attributes ) {
	$class_name  = array();
	$class       = array( 'wp-block-coblocks-posts__inner' );
	$styles      = array();
	$block_style = strpos( $attributes['className'], 'is-style-stacked' ) !== false ? 'stacked' : 'horizontal';

	array_push( $class_name, 'wp-block-coblocks-posts' );

	if ( isset( $attributes['className'] ) ) {
		array_push( $class_name, $attributes['className'] );
	}

	if ( isset( $attributes['align'] ) ) {
		array_push( $class_name, 'align' . $attributes['align'] );
	}

	if ( isset( $attributes['columns'] ) ) {
		array_push( $class, 'has-columns has-' . $attributes['columns'] . '-columns has-responsive-columns' );
	}

	if ( isset( $attributes['listPosition'] ) && 'right' === $attributes['listPosition'] && 'horizontal' === $block_style ) {
		array_push( $class, 'has-image-right' );
	}

	if ( isset( $attributes['imageSize'] ) && 'horizontal' === $block_style ) {
		array_push( $class, 'has-' . $attributes['imageSize'] . '-image' );
	}

	if ( isset( $attributes['imageStyle'] ) ) {
		array_push( $class, 'has-' . $attributes['imageStyle'] . '-image' );
	}

	$block_content = sprintf(
		'<div class="%1$s"><div class="%2$s" style="%3$s">',
		esc_attr( implode( ' ', $class_name ) ),
		esc_attr( implode( ' ', apply_filters( 'coblocks_render_wrapper_class', $class, $attributes ) ) ),
		esc_attr( implode( ' ', apply_filters( 'coblocks_render_wrapper_styles', $styles, $attributes ) ) )
	);

	$list_items_markup = '';

	foreach ( $posts as $post ) {

		$list_class       = '';
		$align_self_class = '';

		$list_items_markup .= '<div class="wp-block-coblocks-posts__item">';

		if ( null !== $post['thumbnailURL'] && $post['thumbnailURL'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-posts__image"><a href="%1$s" class="bg-cover bg-center-center" style="background-image:url(%2$s)"></a></div>',
				esc_url( $post['postLink'] ),
				esc_url( $post['thumbnailURL'] )
			);

			if ( 'horizontal' === $block_style && ( isset( $attributes['displayPostContent'] ) && ! $attributes['displayPostContent'] ) && ( isset( $attributes['columns'] ) && 2 >= $attributes['columns'] ) ) {

				$align_self_class = 'self-center';
			}
		} else {
			$align_self_class = ' flex-start';
		}

		$list_items_markup .= sprintf(
			'<div class="wp-block-coblocks-posts__content%s">',
			esc_attr( $align_self_class )
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] && 'stacked' === $block_style ) {

			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-posts__date">%2$s</time>',
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

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] && 'horizontal' === $block_style ) {

			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-posts__date">%2$s</time>',
				esc_url( $post['date'] ),
				esc_html( $post['dateReadable'] )
			);

		}

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent'] ) {

			$post_excerpt    = $post['postExcerpt'];
			$trimmed_excerpt = esc_html( wp_trim_words( $post_excerpt, $attributes['excerptLength'], ' &hellip; ' ) );

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-posts__excerpt">%1$s</div>',
				esc_html( $trimmed_excerpt )
			);

		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-posts__more-link"><a href="%1$s">%2$s</a></div>',
				esc_url( $post['postLink'] ),
				esc_html( $attributes['postLink'] )
			);

		}

		$list_items_markup .= '</div></div>';

	}

	$block_content .= $list_items_markup;
	$block_content .= '</div>';
	$block_content .= '</div>';

	return $block_content;

}

/**
 * Returns the posts for an internal posts.
 *
 * @param array $posts Current posts.
 *
 * @return array Returns posts.
 */
function coblocks_get_post_info( $posts ) {

	$formatted_posts = array();

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
 * Returns the posts for an external RSS feed.
 *
 * @param array $posts Current posts.
 *
 * @return array Returns posts.
 */
function coblocks_get_rss_post_info( $posts ) {

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
 * Registers the `posts` block on server.
 */
function coblocks_register_posts_block() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Load attributes from block.json.
	ob_start();
	include COBLOCKS_PLUGIN_DIR . 'src/blocks/posts/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'coblocks/posts',
		array(
			'attributes'      => $metadata['attributes'],
			'supports'        => $metadata['supports'],
			'render_callback' => 'coblocks_render_posts_block',
		)
	);
}
add_action( 'init', 'coblocks_register_posts_block' );

/**
 * Handles outdated versions of the `coblocks/posts` block by converting
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
function coblocks_posts_migrate_categories( $block ) {
	if (
		'coblocks/posts' === $block['blockName'] &&
		! empty( $block['attrs']['categories'] ) &&
		is_string( $block['attrs']['categories'] )
	) {
		$block['attrs']['categories'] = array(
			array( 'id' => absint( $block['attrs']['categories'] ) ),
		);
	}
	return $block;
}
add_filter( 'render_block_data', 'coblocks_posts_migrate_categories' );
