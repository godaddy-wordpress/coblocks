<?php
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-ejector/class-coblocks-gallery-stacked-migrate.php';

if( is_admin() ) :
	add_action( 'the_post', function( &$post ) {
		$parsed_blocks = parse_blocks( $post->post_content );

		$block_targets = array(
			'coblocks/gallery-stacked' => CoBlocks_Gallery_Stacked_Migrate::class,
		);

		$parsed_blocks = array_map(
			function( $parsed_block ) use( $block_targets ) {
				if ( ! in_array( $parsed_block['blockName'], array_keys( $block_targets ) ) ) {
					return $parsed_block;
				}

				$dom_parser = new DOMDocument();
				$dom_parser->loadHTML( $parsed_block['innerHTML'] );

				$block_migration = new $block_targets[ $parsed_block['blockName'] ]( $dom_parser );

				return array_merge(
					$parsed_block,
					array(
						'attrs' => $block_migration->attributes(),
						'innerHTML' => '',
						'innerContent' => '',
						'innerBlocks' => array(),
					)
				);
			},
			$parsed_blocks
		);

		$post->post_content = serialize_blocks( $parsed_blocks );
	} );

	add_action( 'init', function() {
		register_block_type( 'coblocks/gallery-stacked', array(
			'render_callback' => function() {
				return;
			},
		) );
	} );

endif;
