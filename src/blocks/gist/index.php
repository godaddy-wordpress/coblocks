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
	$gist_id   = empty( $gist_path ) ? '' : explode( '/', $gist_path )[1];

	if (
		empty( $gist_url ) ||
		empty( $gist_path ) ||
		! preg_match( '/https?:\/\/gist\.github\.com/', $gist_url )
	) {
		return '';
	}

	// Fetch from GitHub API list of all files.
	// in cases where only uppercase files are present this allows us to embed the proper file.
	$api_resp = wp_remote_get(
		'https://api.github.com/gists/' . $gist_id,
		array(
			'headers' => array(
				'Accept' => 'application/json',
			),
		)
	);

	// JSON decode the response body.
	// Then grab files from JSON object.
	$body  = json_decode( $api_resp['body'], true );
	$files = empty( $body['files'] ) ? array() : $body['files'];

	// Map files object into filenames array.
	$file_list = array_map(
		function( $file ) {
			return $file['filename'];
		},
		$files
	);

	$script_src = untrailingslashit( $gist_path );
	// .js suffix is needed after gist path for proper embed.
	$script_src .= '.js';

	if ( ! empty( $gist_file ) ) {
		// We replace the dash to obtain true filename.
		$dash_position = strrpos( $gist_file, '-' );
		if ( false !== $dash_position ) {
			$gist_file = substr_replace( $gist_file, '.', $dash_position, 1 );
		}

		// Return the first matching filename regardless of case to mimic GitHub behavior.
		$matched_file = array_search( $gist_file, array_map( 'strtolower', $file_list ), true );
		$script_src  .= '?file=' . $matched_file;

	}

	return sprintf(
		'%1$s<noscript><a href="%2$s">%3$s</a></noscript>',
		wp_get_inline_script_tag( null, array( 'src' => esc_url( 'https://gist.github.com/' . $script_src ) ) ),
		esc_url( $gist_url ),
		esc_html( __( 'View this gist on GitHub', 'coblocks' ) )
	);
}
