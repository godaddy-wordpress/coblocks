<?php
/**
 * Server-side filter of click-to-tweet blocks.
 *
 * @package WordPress
 */

/**
 * Handles dynamic page permalink in the click to tweet block.
 *
 * @param string $block_content A single parsed block content.
 *
 * @return array The block content with the right post permalink for the page.
 */
function coblocks_click_to_tweet_post_permalink( $block_content ) {

	return str_replace( '[post_permalink]', rawurlencode( get_permalink() ), $block_content );

}
add_filter( 'render_block_coblocks/click-to-tweet', 'coblocks_click_to_tweet_post_permalink' );
