<?php
/**
 * Server-side rendering of the `coblocks/gist` block.
 *
 * @package CoBlocks
 */

/**
 * Renders the `coblocks/gist` block on the server.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block default content.
 *
 * @return string Returns the Github Gist embed for the passed URL.
 */
function coblocks_render_block_gist( $attributes, $content ) {
	if ( empty( $attributes['url'] ) ) {
		return;
	}

	$extra_classnames = array(
		empty( $attributes['meta'] ) ? 'no-meta' : '',
	);

	$script_src = sprintf(
		'%1$s.js?file=%2$s',
		$attributes['url'],
		empty( $attributes['file'] ) ? '' : $attributes['file']
	);

	$noscript_src = sprintf(
		'%1$s#file-%2$s',
		$attributes['url'],
		empty( $attributes['file'] ) ? '' : str_replace( '.', '-', $attributes['file'] )
	);

	// Backwards Compatibility: Grab caption from existing HTML content if attribute has not been set.
	if ( empty( $attributes['caption'] ) ) {
		if ( preg_match( '/\<figcaption\>(.*?)\<\/figcaption\>/', $content, $deprecated_caption_match ) ) {
			$attributes['caption'] = $deprecated_caption_match[1];
		}
	}

	$caption = empty( $attributes['caption'] ) ? '' : sprintf(
		'<figcaption>%1$s</figcaption>',
		esc_html( $attributes['caption'] )
	);

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $extra_classnames ) ) );

	return sprintf(
		// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedScript
		'<div %1$s><script src="%2$s"></script><noscript><a href="%3$s">%4$s</a></noscript>%5$s</div>',
		$wrapper_attributes,
		esc_url( $script_src ),
		esc_url( $noscript_src ),
		esc_html( __( 'View this gist on GitHub', 'coblocks' ) ),
		$caption
	);
}

/**
 * Registers the `coblocks/gist` block on the server.
 */
function coblocks_register_block_gist() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Load attributes from block.json.
	ob_start();
	include COBLOCKS_PLUGIN_DIR . 'src/blocks/gist/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'coblocks/gist',
		array(
			'attributes'      => $metadata['attributes'],
			'render_callback' => 'coblocks_render_block_gist',
			'editor_script'   => 'coblocks-editor',
			'editor_style'    => 'coblocks-editor',
			'style'           => 'coblocks-frontend',
		)
	);
}
add_action( 'init', 'coblocks_register_block_gist' );
