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
	wp_embed_register_handler( 'gist', '/https?:\/\/gist\.github\.com\/([a-zA-Z0-9\/]+)(?:\#file\-([a-zA-Z0-9\_\-]+))?/', 'coblocks_block_gist_handler' );
}
add_action( 'init', 'coblocks_register_gist_oembed' );

/**
 * Renders the oembed content.
 *
 * @param array $matches The matches from wp_embed_register_handler.
 *
 * @return string The oembed output.
 */
function coblocks_block_gist_handler( $matches ) {
	$gist_url  = empty( $matches[0] ) ? '' : $matches[0];
	$gist_path = empty( $matches[1] ) ? '' : $matches[1];
	$gist_file = empty( $matches[2] ) ? '' : $matches[2];

	if (
		empty( $gist_url ) ||
		empty( $gist_path ) ||
		! preg_match( '/https?:\/\/gist\.github\.com/', $gist_url )
	) {
		return '';
	}

	$script_src = untrailingslashit( $gist_path );

	if ( ! preg_match( '/\.js$/', $script_src ) ) {
		$script_src .= '.js';
	}

	if ( ! empty( $gist_file ) ) {
		$dash_position = strrpos( $gist_file, '-' );
		if ( false !== $dash_position ) {
			$gist_file = substr_replace( $gist_file, '.', $dash_position, 1 );
		}

		$script_src .= '?file=' . $gist_file;
	}

	return sprintf(
		// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
		'<script src="https://gist.github.com/%1$s"></script><noscript><a href="%2$s">%3$s</a></noscript>',
		esc_attr( $script_src ),
		esc_url( $gist_url ),
		esc_html( __( 'View this gist on GitHub', 'coblocks' ) )
	);
}
