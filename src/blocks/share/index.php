<?php
/**
 * Server-side rendering of the `coblocks/social` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_share_block( $attributes ) {

	global $post;

	// Get the featured image.
	if ( has_post_thumbnail() ) {
		$thumbnail_id = get_post_thumbnail_id( $post->ID );
		$thumbnail    = $thumbnail_id ? current( wp_get_attachment_image_src( $thumbnail_id, 'large', true ) ) : '';
	} else {
		$thumbnail = null;
	}

	// Generate the Facebook URL.
	$facebook_url = '
		https://www.facebook.com/sharer/sharer.php?
		u=' . get_the_permalink() . '
		&title=' . get_the_title() . '
	';

	// Generate the Twitter URL.
	$twitter_url = '
		http://twitter.com/share?
		text=' . get_the_title() . '
		&url=' . get_the_permalink() . '
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
	$reddit_url = '
		https://www.reddit.com/submit?
		url=' . get_the_permalink() . '
	';

	// Generate the Email URL.
	$email_url = '
		mailto:
		?subject=' . get_the_title() . '
		&body=' . get_the_title() . '
		&mdash;' . get_the_permalink() . '
	';

	// Generate the Google URL.
	$google_url = '
		https://plus.google.com/share
		?url=' . get_the_permalink() . '
	';

	// Apply filters, so that the social URLs can be modified.
	$facebook_url  = apply_filters( 'coblocks_facebook_share_url', $facebook_url );
	$twitter_url   = apply_filters( 'coblocks_twitter_share_url', $twitter_url );
	$pinterest_url = apply_filters( 'coblocks_pinterest_share_url', $pinterest_url );
	$linkedin_url  = apply_filters( 'coblocks_linkedin_share_url', $linkedin_url );
	$email_url     = apply_filters( 'coblocks_email_share_url', $email_url );
	$tumblr_url    = apply_filters( 'coblocks_tumblr_share_url', $tumblr_url );
	$reddit_url    = apply_filters( 'coblocks_reddit_share_url', $reddit_url );
	$google_url    = apply_filters( 'coblocks_google_share_url', $google_url );

	// Attributes.
	$background_color = is_array( $attributes ) && isset( $attributes['customBlockBackgroundColor'] ) ? "background-color:{$attributes['customBlockBackgroundColor']};" : '';
	$border_radius    = is_array( $attributes ) && isset( $attributes['borderRadius'] ) ? "border-radius: {$attributes['borderRadius']}px;" : '';
	$has_padding      = is_array( $attributes ) && isset( $attributes['padding'] ) ? 'has-padding' : '';

	$has_background          = '';
	$background_color_class  = '';
	$custom_background_color = '';
	$has_color               = '';
	$text_color_class        = '';
	$custom_text_color       = '';
	$icon_size               = '';
	$padding                 = '';

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-mask' ) !== false ) {
		$has_background          = is_array( $attributes ) && isset( $attributes['hasColors'] ) && ( isset( $attributes['backgroundColor'] ) || isset( $attributes['customBackgroundColor'] ) ) && ( $attributes['hasColors'] || ( $attributes['backgroundColor'] || $attributes['customBackgroundColor'] ) ) ? 'has-text-color' : '';
		$background_color_class  = is_array( $attributes ) && isset( $attributes['backgroundColor'] ) ? "has-{$attributes['backgroundColor']}-color" : false;
		$custom_background_color = is_array( $attributes ) && isset( $attributes['customBackgroundColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['backgroundColor'] ) ) ? "color: {$attributes['customBackgroundColor']};" : '';
	} else {
		$has_background          = is_array( $attributes ) && isset( $attributes['hasColors'] ) && ( isset( $attributes['backgroundColor'] ) || isset( $attributes['customBackgroundColor'] ) ) && ( $attributes['hasColors'] || ( isset( $attributes['backgroundColor'] ) || $attributes['customBackgroundColor'] ) ) ? 'has-background' : '';
		$background_color_class  = is_array( $attributes ) && isset( $attributes['backgroundColor'] ) ? "has-{$attributes['backgroundColor']}-background-color" : false;
		$custom_background_color = is_array( $attributes ) && isset( $attributes['customBackgroundColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['backgroundColor'] ) ) ? "background-color: {$attributes['customBackgroundColor']};" : '';

		$has_color         = is_array( $attributes ) && isset( $attributes['hasColors'] ) && ( isset( $attributes['textColor'] ) || isset( $attributes['customTextColor'] ) ) && ( $attributes['hasColors'] || ( isset( $attributes['textColor'] ) || $attributes['customTextColor'] ) ) ? 'has-text-color' : '';
		$text_color_class  = is_array( $attributes ) && isset( $attributes['textColor'] ) ? "has-{$attributes['textColor']}-color" : false;
		$custom_text_color = is_array( $attributes ) && isset( $attributes['customTextColor'] ) && isset( $attributes['hasColors'] ) && ( ! $attributes['hasColors'] && ! isset( $attributes['textColor'] ) ) ? "color: {$attributes['customTextColor']};" : '';
	}

	if ( isset( $attributes['className'] ) && ( strpos( $attributes['className'], 'is-style-mask' ) !== false || strpos( $attributes['className'], 'is-style-circular' ) !== false ) ) {
		$icon_size = is_array( $attributes ) && isset( $attributes['iconSize'] ) ? "height:{$attributes['iconSize']}px;width: {$attributes['iconSize']}px;" : '';
	}

	if ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-circular' ) !== false ) {
		$padding = is_array( $attributes ) && isset( $attributes['padding'] ) ? "padding:{$attributes['padding']}px;" : '';
	}

	// Supported social media platforms.
	$platforms = array(
		'facebook'  => array(
			'text' => esc_html__( 'Share on Facebook', 'coblocks' ),
			'url'  => $facebook_url,
		),
		'twitter'   => array(
			'text' => esc_html__( 'Share on Twitter', 'coblocks' ),
			'url'  => $twitter_url,
		),
		'pinterest' => array(
			'text' => esc_html__( 'Share on Pinterest', 'coblocks' ),
			'url'  => $pinterest_url,
		),
		'linkedin'  => array(
			'text' => esc_html__( 'Share on Linkedin', 'coblocks' ),
			'url'  => $linkedin_url,
		),
		'email'     => array(
			'text' => esc_html__( 'Share via Email', 'coblocks' ),
			'url'  => $email_url,
		),
		'tumblr'    => array(
			'text' => esc_html__( 'Share on Tumblr', 'coblocks' ),
			'url'  => $tumblr_url,
		),
		'google'    => array(
			'text' => esc_html__( 'Share on Google', 'coblocks' ),
			'url'  => $google_url,
		),
		'reddit'    => array(
			'text' => esc_html__( 'Share on Reddit', 'coblocks' ),
			'url'  => $reddit_url,
		),
	);

	// Start markup.
	$markup = '';

	foreach ( $platforms as $id => $platform ) {

		if ( isset( $attributes[ $id ] ) && $attributes[ $id ] ) {
			$markup .= sprintf(
				'<li>
					<a href="%1$s" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--%8$s %3$s %7$s %9$s %10$s %13$s" title="%2$s" style="%4$s%6$s%11$s%12$s">
						<span class="wp-block-coblocks-social__icon" style="%5$s"></span>
						<span class="wp-block-coblocks-social__text">%2$s</span>
					</a>
				</li>',
				esc_url( $platform['url'] ),
				esc_html( $platform['text'] ),
				esc_attr( $has_background ),
				esc_attr( $border_radius ),
				esc_attr( $icon_size ),
				esc_attr( $custom_background_color ),
				esc_attr( $background_color_class ),
				esc_attr( $id ),
				esc_attr( $has_color ),
				esc_attr( $text_color_class ),
				esc_attr( $custom_text_color ),
				esc_attr( $padding ),
				esc_attr( $has_padding )
			);
		}
	}

	// Build classes.
	$class = 'wp-block-coblocks-social';

	if ( isset( $attributes['textAlign'] ) ) {
		$class .= " has-text-align-{$attributes['textAlign']}";
	}

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	if ( isset( $attributes['align'] ) ) {
		$class .= ' align' . $attributes['align'];
	}

	if ( isset( $attributes['blockBackgroundColor'] ) || isset( $attributes['customBlockBackgroundColor'] ) ) {
		$class .= ' has-background';
	}

	if ( isset( $attributes['blockBackgroundColor'] ) ) {
		$class .= " has-{$attributes['blockBackgroundColor']}-background-color";
	}

	if ( isset( $attributes['hasColors'] ) && $attributes['hasColors'] ) {
		$class .= ' has-colors';
	}

	if ( isset( $attributes['size'] ) && ( isset( $attributes['className'] ) && strpos( $attributes['className'], 'is-style-mask' ) === false ) ) {
		$class .= ' has-button-size-' . $attributes['size'];
	}

	// Render block content.
	$block_content = sprintf(
		'<div class="%1$s" style="%2$s "><ul>%3$s</ul></div>',
		esc_attr( $class ),
		esc_attr( $background_color ),
		$markup
	);

	return $block_content;
}

/**
 * Registers the block on server.
 */
function coblocks_register_share_block() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Load attributes from block.json.
	ob_start();
	include COBLOCKS_PLUGIN_DIR . 'src/blocks/share/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'coblocks/social',
		array(
			'editor_script'   => 'coblocks-editor',
			'editor_style'    => 'coblocks-editor',
			'style'           => 'coblocks-frontend',
			'attributes'      => $metadata['attributes'],
			'render_callback' => 'coblocks_render_share_block',
		)
	);
}
add_action( 'init', 'coblocks_register_share_block' );
