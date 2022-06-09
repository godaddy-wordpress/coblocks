<?php
/**
 * CoBlocks_Pricing_Table_Item_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Pricing_Table_Item_Migration
 *
 * Define how a coblocks/pricing-table-item block should migrate into a core blocks.
 */
class CoBlocks_Pricing_Table_Item_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/pricing-table-item';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$this->block_attributes['title']    = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__title")]' )->textContent;
		$this->block_attributes['currency'] = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__currency")]' )->textContent;
		$this->block_attributes['amount']   = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__amount")]' )->textContent;
		$this->block_attributes['features'] = array();

		$features = $this->query_selector_all( '//ul[contains(@class,"wp-block-coblocks-pricing-table-item__features")]/li' );

		if ( $features->length > 0) {

			foreach ( $features as $feature ) {

				$this->block_attributes['features'][] = $feature->textContent;

			}
		}

		return array_filter( $this->block_attributes );
	}
}
