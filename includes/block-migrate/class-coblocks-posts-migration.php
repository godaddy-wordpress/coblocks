<?php
/**
 * CoBlocks_Posts_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Posts_Migration
 *
 * Define how a coblocks/gallery-masonry block should migrate into a core/gallery block.
 */
class CoBlocks_Posts_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/posts';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array_filter(
			array_merge(
				$this->block_attributes
			)
		);
	}
}
