<?php
/**
 * CoBlocks_Services_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Services_Migration
 *
 * Define how a coblocks/services block should migrate into a a pattern.
 */
class CoBlocks_Services_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/services';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$services_block = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-services")]' );

		$services_class = $this->get_element_attribute( $services_block, 'class' );

		if ( $services_class ) {
			$this->block_attributes['className'] = $services_class;

			if ( str_contains( $services_class, 'align' ) ) {
				$alignemnt = explode( ' ', explode( 'align', $services_class )[1] )[0];

				$this->block_attributes['align'] = $alignemnt;
			}
		}

		return $this->block_attributes;
	}
}
