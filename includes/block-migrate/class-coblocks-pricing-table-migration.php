<?php
/**
 * CoBlocks_Pricing_Table_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Pricing_Table_Migration
 *
 * Define how a coblocks/pricing-table block should migrate into a core blocks.
 */
class CoBlocks_Pricing_Table_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/pricing-table';
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
