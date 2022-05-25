<?php
/**
 * CoBlocks_Gif_Migration
 *
 * @package CoBlocks
 */

 /**
 * CoBlocks_Gif_Migration
 *
 * Define how a coblocks/gif block should migrate into a core/image block.
 */
class CoBlocks_Gif_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/gif';
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
