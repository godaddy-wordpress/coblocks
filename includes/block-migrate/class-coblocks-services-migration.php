<?php
/**
 * CoBlocks_Services_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Services_Migration
 *
 * Define how a coblocks/services block should migrate into a a pattern.
 */
class CoBlocks_Services_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/services';
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
