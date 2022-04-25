<?php
/**
 * CoBlocks_Highlight_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Highlight_Migration
 *
 * Define how a coblocks/highlight block should migrate into a core/paragraph block.
 */
class CoBlocks_Highlight_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/highlight';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return $this->block_attributes();
	}
}
