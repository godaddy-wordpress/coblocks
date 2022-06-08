<?php
/**
 * Facilitates force migration of certain blocks into core blocks.
 *
 * @package CoBlocks
 */

/**
 * Require needed classes.
 */
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-block-migration-runner.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-block-migration.php';

/**
 * Require migration classes.
 */
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-alert-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-author-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-dynamic-separator-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-collage-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-masonry-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-offset-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gallery-stacked-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-gif-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-hero-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-highlight-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-media-card-migration.php';
require_once COBLOCKS_PLUGIN_DIR . 'includes/block-migrate/class-coblocks-posts-migration.php';

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
		$migration_runner = new CoBlocks_Block_Migration_Runner();

		array_map( array( $migration_runner, 'register' ), array(
			CoBlocks_Alert_Migration::class,
			CoBlocks_Author_Migration::class,
			CoBlocks_Dynamic_Separator_Migration::class,
			CoBlocks_Gallery_Collage_Migration::class,
			CoBlocks_Gallery_Masonry_Migration::class,
			CoBlocks_Gallery_Offset_Migration::class,
			CoBlocks_Gallery_Stacked_Migration::class,
			CoBlocks_Gif_Migration::class,
			CoBlocks_Hero_Migration::class,
			CoBlocks_Highlight_Migration::class,
			CoBlocks_Media_Card_Migration::class,
			CoBlocks_Posts_Migration::class,
		) );

		$parsed_blocks = array_map( array( $migration_runner, 'migrate_block' ), $parsed_blocks );

		// re-serialize the blocks so WordPress can continue processing as usual.
		$post->post_content = serialize_blocks( $parsed_blocks );
	}
);
