<?php
/**
 * CoBlocks_Hero_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Hero_Migration
 *
 * Define how a coblocks/gallery-collage block should migrate into a core/gallery block.
 */
class CoBlocks_Hero_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/hero';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return $this->block_attributes;
	}
}
