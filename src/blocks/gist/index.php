<?php
/**
 * Server-side rendering of the `coblocks/gist` block.
 *
 * @package CoBlocks
 */

/**
 * Registers the Gist oembed handler.
 */
function coblocks_register_gist_oembed() {
	wp_embed_register_handler( 'gist', '#https?://gist.github.com/.*#i', 'coblocks_block_gist_handler' );
}
add_action( 'init', 'coblocks_register_gist_oembed' );

/**
 * Renders the oembed content.
 *
 * @param array $url_match The URL match from wp_embed_register_handler.
 *
 * @return string The oembed output.
 */
function coblocks_block_gist_handler( $url_match ) {
	$url_parts = wp_parse_url( $url_match[0] );
	$url       = $url_parts['scheme'] . '://' . $url_parts['host'] . $url_parts['path'];

	$script_src   = $url;
	$noscript_src = $url;

	if ( ! preg_match( '/\.js$/', $script_src ) ) {
		$script_src .= '.js';
	}

	if ( ! empty( $url_parts['query'] ) ) {
		$script_src   .= '?' . $url_parts['query'];
		$noscript_src .= '#' . sanitize_title( str_replace( '=', '-', $url_parts['query'] ) );
	}

	return sprintf(
		// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
		'<script src="%1$s"></script><noscript><a href="%2$s">%3$s</a></noscript>',
		esc_url( $script_src ),
		esc_url( $noscript_src ),
		esc_html( __( 'View this gist on GitHub', 'coblocks' ) )
	);
}
