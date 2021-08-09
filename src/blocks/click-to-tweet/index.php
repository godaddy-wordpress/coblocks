<?php
/**
 * Server-side rendering of the `click to tweet` block.
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
function coblocks_render_click_to_tweet_block( $attributes ) {

	ob_start();

	$metadata       = coblocks_get_click_to_tweet_block_metadata();
	$custom_class   = isset( $attributes['className'] ) ? sprintf( ' %s', $attributes['className'] ) : '';
	$content        = $attributes['content'];
	$button_text    = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : $metadata['attributes']['buttonText']['default'];
	$url            = sprintf( 'http://twitter.com/share?&text=%1$s&url=%2$s', $content, get_permalink( get_the_id() ) );
	$content_styles = '';
	$button_color   = isset( $attributes['customButtonColor'] ) ? sprintf( ' style=background:%s;', $attributes['customButtonColor'] ) : '';

	if ( isset( $attributes['via'] ) ) {
		$url .= sprintf( '&via=%s', $attributes['via'] );
	}

	if ( isset( $attributes['customFontSize'] ) ) {
		$content_styles .= sprintf( 'font-size:%spx;', $attributes['customFontSize'] );
	}

	if ( isset( $attributes['customTextColor'] ) ) {
		$content_styles .= sprintf( 'color:%s;', $attributes['customTextColor'] );
	}

	if ( ! empty( $content_styles ) ) {
		$content_styles = " style={$content_styles}";
	}

	?>

	<blockquote class="wp-block-coblocks-click-to-tweet<?php echo esc_attr( $custom_class ); ?>">
		<p class="wp-block-coblocks-click-to-tweet__text"<?php echo esc_attr( $content_styles ); ?>><?php echo esc_html( $content ); ?></p>
		<a class="wp-block-coblocks-click-to-tweet__twitter-btn" href="<?php echo esc_attr( esc_url( $url ) ); ?>" target="_blank" rel="noopener noreferrer"<?php echo esc_attr( $button_color ); ?>><?php echo esc_html( $button_text ); ?></a>
	</blockquote>

	<?php

	return ob_get_clean();

}

/**
 * Retreive the `click-to-tweet` block metadata
 *
 * @return array Block metadata.
 */
function coblocks_get_click_to_tweet_block_metadata() {

	ob_start();

	include COBLOCKS_PLUGIN_DIR . 'src/blocks/click-to-tweet/block.json';

	return json_decode( ob_get_clean(), true );

}

/**
 * Registers the `click-to-tweet` block on server.
 */
function coblocks_register_click_to_tweet_block() {

	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {

		return;

	}

	// Load attributes from block.json.
	$metadata = coblocks_get_click_to_tweet_block_metadata();
	$slug     = 'coblocks';

	register_block_type(
		$slug . '/click-to-tweet',
		array(
			'editor_script'   => $slug . '-editor',
			'editor_style'    => $slug . '-editor',
			'style'           => $slug . '-frontend',
			'attributes'      => $metadata['attributes'],
			'render_callback' => function( $attributes ) {
				return coblocks_render_click_to_tweet_block( $attributes );
			},
		)
	);

}
add_action( 'init', 'coblocks_register_click_to_tweet_block' );
