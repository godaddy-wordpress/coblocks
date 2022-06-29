<?php
/**
 * CoBlocks_Column_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Column_Migration
 *
 * Define how a coblocks/column block should migrate into a core/column block.
 */
class CoBlocks_Column_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/column';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array_filter( $this->block_attributes );
	}
}
