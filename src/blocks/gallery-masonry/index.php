<?php
/**
 * Server-side rendering of the `core/image` block.
 *
 * @package WordPress
 */

/**
 * Handles backwards compatibility for Masonry Gallery Blocks,
 * whose images feature a `data-id` attribute.
 *
 * Now that the Masonry Gallery Block contains inner Image Blocks,
 * we add a custom `data-id` attribute before rendering the masonry gallery
 * so that the Image Block can pick it up in its render_callback.
 *
 * @param  array $parsed_block A single parsed block object.
 *
 * @return array               The migrated block object.
 */
function render_block_coblocks_masonry_gallery_data( $parsed_block ) {
	if ( 'coblocks/gallery-masonry' === $parsed_block['blockName'] ) {
		foreach ( $parsed_block['innerBlocks'] as $key => $inner_block ) {
			if ( 'core/image' === $inner_block['blockName'] ) {
				if ( ! isset( $parsed_block['innerBlocks'][ $key ]['attrs']['data-id'] ) && isset( $inner_block['attrs']['id'] ) ) {
					$parsed_block['innerBlocks'][ $key ]['attrs']['data-id'] = esc_attr( $inner_block['attrs']['id'] );
				}
			}
		}
	}

	return $parsed_block;
}

add_filter( 'render_block_data', 'render_block_coblocks_masonry_gallery_data' );

/**
 * Registers the `coblocks/gallery-masonry` block on server.
 * This render callback needs to be here
 * so that the gallery styles are loaded in block-based themes.
 */
function gutenberg_register_block_coblocks_masonry_gallery() {
	register_block_type_from_metadata(
		__DIR__ . '/gallery-masonry',
		array(
			'render_callback' => function ( $attributes, $content ) {
				return $content;
			},
		)
	);
}

add_action( 'init', 'gutenberg_register_block_coblocks_masonry_gallery', 20 );
