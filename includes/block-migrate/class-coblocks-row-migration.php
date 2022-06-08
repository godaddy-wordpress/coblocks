<?php
/**
 * CoBlocks_Row_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Row_Migration
 *
 * Define how a coblocks/row block should migrate into a core/columns block.
 */
class CoBlocks_Row_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/row';
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
