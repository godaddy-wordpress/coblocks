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
			$features_block = $this->query_selector( '//div[".wp-block-coblocks-features"]' );
			$features_class = $this->get_element_attribute( $features_block, 'class' );

			$features_inner_element = $this->query_selector( '//div[".wp-block-coblocks-features"]//div[".wp-block-coblocks-features__inner"]' );
			$features_inner_class = $this->get_element_attribute( $features_inner_element, 'class' );

			if ( str_contains( $features_class, 'align') ) {
				$alignemnt = explode( ' ', explode( 'align', $features_class )[1] )[0];

				$this->block_attributes['align'] = $alignemnt;
			}

			$this->block_attributes['className'] = $features_class;
			$this->block_attributes['className'] .= ' ';
			$this->block_attributes['className'] .= $features_inner_class;

			return $this->block_attributes;
	}
}
