<?php
/**
 * CoBlocks_Features_Migration
 *
 * @package CoBlocks
 */

 /**
  * CoBlocks_Features_Migration
  *
  * Define how a coblocks/features block should migrate into a pattern using core blocks.
  */
class CoBlocks_Features_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
			return 'coblocks/features';
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
