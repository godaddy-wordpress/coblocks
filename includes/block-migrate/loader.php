<?php
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-stacked-migrate.php';

add_action( 'the_post', function( &$post ) {
	if ( ! is_admin() || ! get_current_screen()->is_block_editor ) return;

	$parsed_blocks = parse_blocks( $post->post_content );

	$block_targets = array(
		'coblocks/gallery-stacked' => CoBlocks_Gallery_Stacked_Migrate::class,
	);

	$parsed_blocks = array_map(
		function( $parsed_block ) use( $block_targets ) {
			if ( ! in_array( $parsed_block['blockName'], array_keys( $block_targets ) ) ) {
				return $parsed_block;
			}

			// libxml can't parse HTML5 elements still so disable warnings for it.
			libxml_use_internal_errors( true );

			$dom_parser = new DOMDocument();
			$dom_parser->loadHTML( $parsed_block['innerHTML'] );

			libxml_clear_errors();

			$block_migration = new $block_targets[ $parsed_block['blockName'] ]( $dom_parser );

			return array_merge(
				$parsed_block,
				array(
					'attrs' => $block_migration->attributes(),
					'innerHTML' => '',
					'innerContent' => array(),
					'innerBlocks' => array(),
				)
			);
		},
		$parsed_blocks
	);

	$post->post_content = serialize_blocks( $parsed_blocks );
} );

add_action( 'init', function() {
	if ( ! is_admin() ) return;

	register_block_type( 'coblocks/gallery-stacked', array(
		'render_callback' => function() {
			return;
		},
	) );
} );
