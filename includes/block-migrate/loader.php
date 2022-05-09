<?php
/**
 * Facilitates force migration of certain blocks into core blocks.
 *
 * @package CoBlocks
 */

/**
 * Require needed classes.
 */
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-block-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-stacked-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-masonry-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-collage-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-alert-migration.php';

/**
 * Hook into the post object before it's returned to the editor.
 *
 * This allows us to "force migrate" our blocks by removing and parsing the
 * previous output for attributes and re-serializing the block to
 * only include its comment delimiters.
 */
add_action(
	'the_post',
	function( WP_Post &$post ) {
		if ( ! is_admin() || ! get_current_screen()->is_block_editor ) {
			return;
		}

		// Parse the blocks so we can search them in a standard way.
		$parsed_blocks = parse_blocks( $post->post_content );

		// Load our available migrations.
		$block_targets = array(
			'coblocks/gallery-stacked' => CoBlocks_Gallery_Stacked_Migration::class,
			'coblocks/gallery-masonry' => CoBlocks_Gallery_Masonry_Migration::class,
			'coblocks/gallery-collage' => CoBlocks_Gallery_Collage_Migration::class,
			'coblocks/alert' => CoBlocks_Alert_Migration::class,
		);

		$parsed_blocks = array_map(
			function( $parsed_block ) use ( $block_targets ) {
				if ( ! in_array( $parsed_block['blockName'], array_keys( $block_targets ), true ) ) {
					return $parsed_block;
				}

				// Perform the migration if we have one.
				$block_migration  = new $block_targets[ $parsed_block['blockName'] ]();
				$block_attributes = $block_migration->migrate( $parsed_block['attrs'], $parsed_block['innerHTML'] );

				// Override certain keys of the originally parsed block.
				return array_merge(
					$parsed_block,
					array(
						'attrs'        => $block_attributes,
						// Since we are forcing this into a "dynamic block" which is only defined with block comment delimiters,
						// we want to make sure an inner content contains only the inner blocks before serialization.
						'innerContent' => $parsed_block['innerBlocks'],
					)
				);
			},
			$parsed_blocks
		);

		// re-serialize the blocks so WordPress can continue processing as usual.
		$post->post_content = serialize_blocks( $parsed_blocks );
	}
);
