<?php
/**
 * Server-side rendering of the `coblocks/social` block.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

/**
 * Renders the block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_social_block( $attributes ) {

	// Get the featured image.
	if ( has_post_thumbnail() ) {
		$thumbnail_id = get_post_thumbnail_id( $post->ID );
		$thumbnail    = $thumbnail_id ? current( wp_get_attachment_image_src( $thumbnail_id, 'large', true ) ) : '';
	} else {
		$thumbnail = null;
	}

	// Generate the Twitter URL.
	$twitter_url = '
		http://twitter.com/share?
		text=' . get_the_title() . '
		&url=' . get_the_permalink() . '
	';

	// Generate the Facebook URL.
	$facebook_url = '
		https://www.facebook.com/sharer/sharer.php?
		u=' . get_the_permalink() . '
		&title=' . get_the_title() . '
	';

	// Generate the LinkedIn URL.
	$linkedin_url = '
		https://www.linkedin.com/shareArticle?mini=true
		&url=' . get_the_permalink() . '
		&title=' . get_the_title() . '
	';

	// Generate the Pinterest URL.
	$pinterest_url = '
		https://pinterest.com/pin/create/button/?
		&url=' . get_the_permalink() . '
		&description=' . get_the_title() . '
		&media=' . esc_url( $thumbnail ) . '
	';

	// Generate the Tumblr URL.
	$tumblr_url = '
		https://tumblr.com/share/link?
		url=' . get_the_permalink() . '
		&name=' . get_the_title() . '
	';

	// Apply filters, so that they may be easily modified.
	$twitter_url   = apply_filters( 'coblocks_twitter_share_url', $twitter_url );
	$facebook_url  = apply_filters( 'coblocks_facebook_share_url', $facebook_url );
	$pinterest_url = apply_filters( 'coblocks_pinterest_share_url', $pinterest_url );
	$linkedin_url  = apply_filters( 'coblocks_linkedin_share_url', $linkedin_url );
	$tumblr_url    = apply_filters( 'coblocks_tumblr_share_url', $tumblr_url );

	// Start the markup output.
	$markup    = '';
	$class     = 'wp-block-coblocks-social';
	$alignment = is_array( $attributes ) && isset( $attributes['align'] ) ? "style=text-align:{$attributes['align']}" : false;

	// Style options.
	$color = is_array( $attributes ) && isset( $attributes['backgroundColor'] ) ? "background-color:{$attributes['backgroundColor']};" : false;
	$size  = is_array( $attributes ) && isset( $attributes['size'] ) ? "height:{$attributes['size']}px;width:{$attributes['size']}px;" : false;
	$space = is_array( $attributes ) && isset( $attributes['space'] ) ? "margin: 0 {$attributes['space']}px;" : false;

	if ( isset( $attributes['twitter'] ) && $attributes['twitter'] ) {
		$markup .= sprintf(
			'<a href="%1$s" class="wp-block-coblocks-social__button button--twitter icon--coblocks" title="%2$s" style="%3$s%4$s%5$s"><span class="screen-reader-text">%2$s</span></a>',
			esc_url( $twitter_url ),
			esc_html__( 'Share on Twitter', '@@textdomain' ),
			esc_attr( $color ),
			esc_attr( $size ),
			esc_attr( $space )
		);
	}

	if ( isset( $attributes['facebook'] ) && $attributes['facebook'] ) {
		$markup .= sprintf(
			'<a href="%1$s" class="wp-block-coblocks-social__button button--facebook icon--coblocks" title="%2$s" style="%3$s%4$s%5$s"><span class="screen-reader-text">%2$s</span></a>',
			esc_url( $facebook_url ),
			esc_html__( 'Share on Facebook', '@@textdomain' ),
			esc_attr( $color ),
			esc_attr( $size ),
			esc_attr( $space )
		);
	}

	if ( isset( $attributes['pinterest'] ) && $attributes['pinterest'] ) {
		$markup .= sprintf(
			'<a href="%1$s" class="wp-block-coblocks-social__button button--pinterest icon--coblocks" title="%2$s" style="%3$s%4$s%5$s"><span class="screen-reader-text">%2$s</span></a>',
			esc_url( $pinterest_url ),
			esc_html__( 'Share on Pinterest', '@@textdomain' ),
			esc_attr( $color ),
			esc_attr( $size ),
			esc_attr( $space )
		);
	}

	if ( isset( $attributes['linkedin'] ) && $attributes['linkedin'] ) {
		$markup .= sprintf(
			'<a href="%1$s" class="wp-block-coblocks-social__button button--linkedin icon--coblocks" title="%2$s" style="%3$s%4$s%5$s"><span class="screen-reader-text">%2$s</span></a>',
			esc_url( $linkedin_url ),
			esc_html__( 'Share on LinkedIn', '@@textdomain' ),
			esc_attr( $color ),
			esc_attr( $size ),
			esc_attr( $space )
		);
	}

	if ( isset( $attributes['tumblr'] ) && $attributes['tumblr'] ) {
		$markup .= sprintf(
			'<a href="%1$s" class="wp-block-coblocks-social__button button--tumblr icon--coblocks" title="%2$s" style="%3$s%4$s%5$s"><span class="screen-reader-text">%2$s</span></a>',
			esc_url( $tumblr_url ),
			esc_html__( 'Share on Tumblr', '@@textdomain' ),
			esc_attr( $color ),
			esc_attr( $size ),
			esc_attr( $space )
		);
	}

	// Render block content.
	$block_content = sprintf(
		'<div class="%1$s" %2$s><p>%3$s</p></div>',
		esc_attr( $class ),
		esc_attr( $alignment ),
		$markup
	);

	return $block_content;
}

/**
 * Registers the block on server.
 */
function coblocks_register_social_block() {

	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'coblocks/social', array(
			'editor_script'   => 'coblocks-editor',
			'editor_style'    => 'coblocks-editor',
			'style'           => 'coblocks-frontend',
			'attributes'      => array(
				'twitter'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'facebook'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'pinterest'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'linkedin'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'tumblr'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'size'            => array(
					'type'    => 'number',
					'default' => 28,
				),
				'space'           => array(
					'type'    => 'number',
					'default' => 3,
				),
				'backgroundColor' => array(
					'type' => 'string',
				),
				'align'           => array(
					'type'    => 'string',
					'default' => 'left',
				),

			),
			'render_callback' => 'coblocks_render_social_block',
		)
	);
}
add_action( 'init', 'coblocks_register_social_block' );

