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

	global $post;

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

	// Generate the Reddit URL.
	$reddit_url = 'https://www.reddit.com/submit?
		url=' . get_the_permalink() . '
	';

	// Generate the Email URL.
	$email_url = 'mailto:?subject=
		' . get_the_title() . '
		&body=' . get_the_title() . '
		&mdash;' . get_the_permalink() . '
	';

	// Apply filters, so that they may be easily modified.
	$twitter_url   = apply_filters( 'coblocks_twitter_share_url', $twitter_url );
	$facebook_url  = apply_filters( 'coblocks_facebook_share_url', $facebook_url );
	$pinterest_url = apply_filters( 'coblocks_pinterest_share_url', $pinterest_url );
	$linkedin_url  = apply_filters( 'coblocks_linkedin_share_url', $linkedin_url );
	$tumblr_url    = apply_filters( 'coblocks_tumblr_share_url', $tumblr_url );
	$reddit_url    = apply_filters( 'coblocks_reddit_share_url', $reddit_url );
	$email_url     = apply_filters( 'coblocks_email_share_url', $email_url );

	// Style attributes.
	$text_align              = is_array( $attributes ) && isset( $attributes['textAlign'] ) ? "style=text-align:{$attributes['textAlign']}" : false;
	$has_backround           = is_array( $attributes ) && isset( $attributes['hasColors'] ) && ( isset( $attributes['backgroundColor'] ) || isset( $attributes['customBackgroundColor'] ) ) && ( $attributes['hasColors'] || ( $attributes['backgroundColor'] || $attributes['customBackgroundColor'] ) ) ? 'has-background' : false;
	$border_radius           = is_array( $attributes ) && isset( $attributes['borderRadius'] ) ? "border-radius: {$attributes['borderRadius']}px;" : false;
	$custom_background_color = is_array( $attributes ) && isset( $attributes['customBackgroundColor'] ) ? "background-color: {$attributes['customBackgroundColor']};" : false;

	$icon_size = '';
	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-mask' ) !== false ) {
		$icon_size = is_array( $attributes ) && isset( $attributes['iconSize'] ) ? "height:{$attributes['iconSize']}px;width: {$attributes['iconSize']}px;" : false;
	}

	$background_color_class = is_array( $attributes ) && isset( $attributes['backgroundColor'] ) ? "has-{$attributes['backgroundColor']}-background-color" : false;

	// Start the markup output.
	$markup = '';

	if ( isset( $attributes['twitter'] ) && $attributes['twitter'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--twitter %3$s %7$s" title="%2$s" style="%4$s%6$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $twitter_url ),
			esc_html__( 'Share on Twitter', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color ),
			esc_attr( $background_color_class )
		);
	}

	if ( isset( $attributes['facebook'] ) && $attributes['facebook'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--facebook %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $facebook_url ),
			esc_html__( 'Share on Facebook', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	if ( isset( $attributes['pinterest'] ) && $attributes['pinterest'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--pinterest %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $pinterest_url ),
			esc_html__( 'Share on Pinterest', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	if ( isset( $attributes['linkedin'] ) && $attributes['linkedin'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--linkedin %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $linkedin_url ),
			esc_html__( 'Share on LinkedIn', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	if ( isset( $attributes['email'] ) && $attributes['email'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" target="_blank" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--email %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $reddit_url ),
			esc_html__( 'Share via Email', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	if ( isset( $attributes['tumblr'] ) && $attributes['tumblr'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--tumblr %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $tumblr_url ),
			esc_html__( 'Share on Tumblr', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	if ( isset( $attributes['reddit'] ) && $attributes['reddit'] ) {
		$markup .= sprintf(
			'<li><a href="%1$s" target="_blank" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--reddit %3$s" title="%2$s" style="%4$s">
				<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
				<span class="wp-block-coblocks-social__text">%2$s</span>
			</a></li>',
			esc_url( $reddit_url ),
			esc_html__( 'Share on Reddit', '@@textdomain' ),
			esc_attr( $has_backround ),
			esc_attr( $border_radius ),
			esc_attr( $icon_size ),
			esc_attr( $custom_background_color )
		);
	}

	$class = 'wp-block-coblocks-social';

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	if ( isset( $attributes['hasColors'] ) && $attributes['hasColors'] ) {
		$class .= ' has-colors';
	}

	if ( isset( $attributes['size'] ) && 'med' !== $attributes['size'] && ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-mask' ) === false ) ) {
		$class .= ' has-button-size-' . $attributes['size'];
	}

	// Render block content.
	$block_content = sprintf(
		'<div class="%1$s" %2$s><ul>%3$s</ul></div>',
		esc_attr( $class ),
		esc_attr( $text_align ),
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
				'className'             => array(
					'type' => 'string',
				),
				'hasColors'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'borderRadius'          => array(
					'type'    => 'number',
					'default' => 40,
				),
				'size'                  => array(
					'type'    => 'string',
					'default' => 'med',
				),
				'iconSize'              => array(
					'type'    => 'number',
					'default' => 30,
				),
				'textAlign'             => array(
					'type' => 'string',
				),
				'backgroundColor'       => array(
					'type' => 'string',
				),
				'customBackgroundColor' => array(
					'type' => 'string',
				),
				'twitter'               => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'facebook'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'pinterest'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'linkedin'              => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'tumblr'                => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'reddit'                => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'email'                 => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'coblocks_render_social_block',
		)
	);
}
add_action( 'init', 'coblocks_register_social_block' );

