<?php
/**
 * CoBlocks_Feature_Migration
 *
 * @package CoBlocks
 */

 /**
  * CoBlocks_Feature_Migration
  *
  * Define how a coblocks/features block should migrate into a pattern using core blocks.
  */
class CoBlocks_Feature_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
			return 'coblocks/feature';
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
