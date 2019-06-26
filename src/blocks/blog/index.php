<?php
/**
 * Server-side rendering of the `blog` block.
 *
 * @package WordPress
 */

/**
 * Renders the `blog` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_blog( $attributes ) {
	$args = array(
		'posts_per_page'   => $attributes['postsToShow'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
	);

	if ( isset( $attributes['categories'] ) ) {
		$args['category'] = $attributes['categories'];
	}

	if ($attributes['postFeedType'] === 'external' && $attributes['externalRssUrl']) {

		$recent_posts = fetch_feed($attributes['externalRssUrl']);

		if ( is_wp_error( $recent_posts ) ) {
			return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS Error:' ) . '</strong> ' . $recent_posts->get_error_message() . '</div></div>';
		}

		if ( ! $recent_posts->get_item_quantity() ) {
			// PHP 5.2 compatibility. See: http://simplepie.org/wiki/faq/i_m_getting_memory_leaks.
			$recent_posts->__destruct();
			unset( $recent_posts );
			return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';
		}

		$recent_posts  = $recent_posts->get_items( 0, $attributes['postsToShow'] );
		$formattedPosts = extract_external_info($recent_posts);
	} else {
		$recent_posts = get_posts( $args );
		$formattedPosts = extract_internal_info($recent_posts);
	}

	$blogLayout = null;

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-list' ) !== false ) {
		$blogLayout = 'list';
	} elseif (isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-grid' ) !== false) {
		$blogLayout = 'grid';
	} else {
		$blogLayout = 'carousel';
	}

	if ($blogLayout === 'carousel') {
		return build_carousel_block_content($formattedPosts, $attributes);
	} else {
		return build_non_carousel_block_content($formattedPosts, $attributes);
	}
}

function build_carousel_block_content($posts, $attributes) {

	$arrows = $attributes['prevNextButtons'] ? 'true' : 'false';
	$auto_play = $attributes['autoPlay'] ? 'true' : 'false';
	$draggable = (string) $attributes['draggable'] ? 'true' : 'false';

	$class = 'wp-block-coblocks-blog';

	if ($attributes['align'] !== '') {
		$class .= ' align'.$attributes['align'];
	}

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = <<<EOL
<div class="carousel-container $class" 
data-slick='{"slidesToShow": {$attributes['visibleItems']},
"slidesToScroll": 1,
"arrows": $arrows,
"autoPlay": $auto_play,
"autoPlaySpeed": {$attributes['autoPlaySpeed']},
"infinite": true,
"adaptiveHeight": false,
"draggable": $draggable
}'>
EOL;

	$list_items_markup = '';

	foreach ($posts as $post) {
		$list_items_markup .= '<div class="coblocks-blog-post--item">';
		$list_items_markup .= '<div class="coblocks-blog-post--item-inner">';

		if ( $post['thumbnailURL'] !== null && $post['thumbnailURL']) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-image-wrapper" style="background-image:url(%2$s)"><a href="%1$s"></a></div>',
				$post['postLink'],
				$post['thumbnailURL']
			);
		}

		$item_info_class = 'wp-block-coblocks-blog__post-info ';
		if ($post['thumbnailURL'] === null || !$post['thumbnailURL']) {
			$item_info_class .= 'full-height ';
		}
		$list_items_markup .= sprintf(
			'<div class="%1$s"</div>',
			$item_info_class
		);

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-blog__post-date">%2$s</time>',
				$post['date'],
				$post['dateReadable']
			);
		}

		$title = $post['title'];
		if ( ! $title ) {
			$title = __( '(Untitled)' );
		}
		$list_items_markup .= sprintf(
			'<h5 href="%1$s">%2$s</h5>',
			$post['postLink'],
			$title
		);

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']) {
			$postExcerpt = $post['postExcerpt'];
			$trimmed_excerpt = esc_html( wp_trim_words( $postExcerpt, $attributes['excerptLength'], ' &hellip; ' ) );

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-excerpt"><p>%1$s</p></div>',
				$trimmed_excerpt
			);
		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink']) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-read-more"><a href="%2$s">%1$s</a></div>',
				$attributes['postLink'],
				$post['postLink']
			);
		}

		$list_items_markup .= '</div></div></div>';
	}

	$block_content .= $list_items_markup;
	$block_content .= '</div>';

	return $block_content;
}

function build_non_carousel_block_content($posts, $attributes) {
	$class = 'wp-block-coblocks-blog wp-block-coblocks-blog__list';

	$blogLayout = strpos($attributes['className'], 'is-style-grid') !== false ? 'grid' : 'list';

	if ( isset( $attributes['listPosition'] ) && $blogLayout === 'list' ) {
		$class .= ' image-to-' . $attributes['listPosition'];
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $blogLayout ) {
		$class .= ' columns-' . $attributes['columns'];
	}

	if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
		$class .= ' has-dates';
	}

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = <<<EOL
<ul class="$class">
EOL;

	$list_items_markup = '';

	foreach ( $posts as $post ) {

		$list_items_markup .= '<li>';

		if ( $post['thumbnailURL'] !== null &&  $post['thumbnailURL']) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-image-wrapper" style="background-image:url(%2$s)"><a href="%1$s"></a></div>',
				$post['postLink'],
				$post['thumbnailURL']
			);
		}

		$list_items_markup .= '<div class="wp-block-coblocks-blog__post-info">';

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-coblocks-blog__post-date">%2$s</time>',
				$post['date'],
				$post['dateReadable']
			);
		}

		$title = $post['title'];
		if ( ! $title ) {
			$title = __( '(Untitled)' );
		}
		$list_items_markup .= sprintf(
			'<h5><a href="%1$s">%2$s</a></h5>',
			$post['postLink'],
			$title
		);

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']) {
			$postExcerpt = $post['postExcerpt'];
			$trimmed_excerpt = esc_html( wp_trim_words( $postExcerpt, $attributes['excerptLength'], ' &hellip; ' ) );

			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-excerpt"><p>%1$s</p></div>',
				$trimmed_excerpt
			);
		}

		if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink']) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-coblocks-blog__post-read-more"><a href="%2$s">%1$s</a></div>',
				$attributes['postLink'],
				$post['postLink']
			);
		}


		$list_items_markup .= "</li>";
	}

	$block_content .= $list_items_markup;
	$block_content .= '</ul>';


	return $block_content;
}

function extract_external_info($posts) {
	$formatted_posts = [];

	foreach ($posts as $post) {
		$formatted_post = null;

		$formatted_post['date'] = date_i18n( get_option('c'), $post->get_date( 'U' ) );
		$formatted_post['dateReadable'] = date_i18n( get_option('date_format'), $post->get_date( 'U' ) );
		$formatted_post['title'] = $title = esc_html( trim( strip_tags( $post->get_title() ) ) );
		$formatted_post['postLink'] = esc_url( $post->get_link() );
		$formatted_post['postExcerpt'] = html_entity_decode( $post->get_description(), ENT_QUOTES, get_option( 'blog_charset' ) );

		$output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->get_content(), $matches);

		$first_img = false;
		if ($matches && !empty($matches[1])) {
			$first_img = $matches[1][0];
		}

		$formatted_post['thumbnailURL'] = $first_img;

		$formatted_posts[] = $formatted_post;
	}

	return $formatted_posts;
}

function extract_internal_info($posts) {
	$formatted_posts = [];

	foreach ($posts as $post) {
		$formatted_post = null;

		$formatted_post['thumbnailURL'] = get_the_post_thumbnail_url($post);;
		$formatted_post['date'] = esc_attr( get_the_date( 'c', $post ) );
		$formatted_post['dateReadable'] = esc_html( get_the_date( '', $post ) );
		$formatted_post['title'] = get_the_title( $post );
		$formatted_post['postLink'] = esc_url( get_permalink( $post ) );

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
 * Registers the `blog` block on server.
 */
function register_block_blog() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$dir = CoBlocks()->asset_source( 'js' );

	wp_register_script(
		'coblocks-slick-initializer',
		$dir . 'coblocks-slick-initializer' . COBLOCKS_ASSET_SUFFIX . '.js',
		array( 'jquery')
	);

	register_block_type(
		'coblocks/blog',
		array(
			'attributes'      => array(
				'listPosition'			  => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'align'                   => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'className'               => array(
					'type' => 'string',
				),
				'categories'              => array(
					'type' => 'string',
				),
				'postsToShow'             => array(
					'type'    => 'number',
					'default' => 5,
				),
				'displayPostContent'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostLink'		  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayCategories'		  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postLink'		  		  => array(
					'type'    => 'string',
					'default' => 'Continue Reading',
				),
				'postFeedType'			  => array(
					'type'	  => 'string',
					'default' => 'internal',
				),
				'externalRssUrl'		  => array(
					'type'	  => 'string',
					'default' => ''
				),
				'excerptLength'           => array(
					'type'    => 'number',
					'default' => 55,
				),
				'displayPostDate'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'columns'                 => array(
					'type'    => 'number',
					'default' => 2,
				),
				'order'                   => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                 => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'prevNextButtons'		  => array(
					'type'	  => 'boolean',
					'default' => true
				),
				'draggable'		  => array(
					'type'	  => 'boolean',
					'default' => true
				),
				'autoPlay'		  => array(
					'type'	  => 'boolean',
					'default' => false
				),
				'autoPlaySpeed'	  => array(
					'type'	  => 'string',
					'default' => 3000
				),
				'visibleItems'	  => array(
					'type'	  => 'number',
					'default' => 2
				)
			),
			'render_callback' => 'render_block_blog',
			'editor_script'   => 'coblocks-slick-initializer',
		)
	);
}
add_action( 'init', 'register_block_blog' );
