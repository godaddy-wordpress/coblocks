<?php
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-block-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-stacked-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-masonry-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-collage-migration.php';

add_action( 'the_post', function( WP_Post &$post ) {
	if ( ! is_admin() || ! get_current_screen()->is_block_editor ) return;

	$parsed_blocks = parse_blocks( $post->post_content );

	$block_targets = array(
		'coblocks/gallery-stacked' => CoBlocks_Gallery_Stacked_Migration::class,
		'coblocks/gallery-masonry' => CoBlocks_Gallery_Masonry_Migration::class,
		'coblocks/gallery-collage' => CoBlocks_Gallery_Collage_Migration::class,
	);

	$parsed_blocks = array_map(
		function( $parsed_block ) use( $block_targets ) {
			if ( ! in_array( $parsed_block['blockName'], array_keys( $block_targets ) ) ) {
				return $parsed_block;
			}

			$block_migration = new $block_targets[ $parsed_block['blockName'] ];
			$block_attributes = $block_migration->migrate( $parsed_block['innerHTML'] );

			return array_merge(
				$parsed_block,
				array(
					'attrs' => $block_attributes,
					// Since we are forcing this into a "dynamic block" which is only defined with block comment delimiters,
					// we want to make sure an inner content contains only the inner blocks before serialization.
					'innerContent' => $parsed_block['innerBlocks'],
				)
			);
		},
		$parsed_blocks
	);

	$post->post_content = serialize_blocks( $parsed_blocks );
} );
