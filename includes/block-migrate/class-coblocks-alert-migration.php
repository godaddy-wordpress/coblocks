<?php
/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * Define how a coblocks/alert block should migrate into a core/paragraph block.
 */
class CoBlocks_Alert_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/alert';
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