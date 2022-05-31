<?php
/**
 * CoBlocks_Dynamic_Separator_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Dynamic_Separator_Migration
 *
 * Define how a coblocks/shape-divider block should migrate into a core/divider block.
 */
class CoBlocks_Dynamic_Separator_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/dynamic-separator';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		if ( ! array_key_exists( 'className', $this->block_attributes ) ) {
			$this->block_attributes['className'] = 'is-style-dots';
		}

		if ( array_key_exists( 'className', $this->block_attributes ) && 'is-style-fullwidth' === $this->block_attributes['className'] ) {
			$this->block_attributes['className'] = 'is-style-wide';
		}

		return $this->block_attributes;
	}
}
