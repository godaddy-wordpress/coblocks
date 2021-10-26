<?php
/**
 * Server-side rendering of the `coblocks/social` block.
 *
 * @package CoBlocks
 */

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
			'editor_script' => 'coblocks-editor',
			'editor_style'  => 'coblocks-editor',
			'style'         => 'coblocks-frontend',
			'attributes'    => $metadata['attributes'],
		)
	);
}
add_action( 'init', 'coblocks_register_share_block' );
