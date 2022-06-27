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
	public static function block_name() {
			return 'coblocks/features';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
			$features_block = $this->query_selector( '//div[@data-type=""coblocks/features"]' );

			$features_align = $this->get_element_attribute( $features_block, 'data-align' );
			wp_die( $features_align );
			if ( $features_align ) {

				$this->block_attributes['className'] = $features_class;
			}

			return $this->block_attributes;
	}
}
