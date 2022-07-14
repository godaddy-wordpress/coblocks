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
		$title_obj = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__title")]' );
		if ( null !== $title_obj && property_exists( $title_obj, 'textContent' ) ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$this->block_attributes['title'] = $title_obj->textContent;
		}

		$currency_obj = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__currency")]' );
		if ( null !== $currency_obj && property_exists( $currency_obj, 'textContent' ) ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$this->block_attributes['currency'] = $currency_obj->textContent;
		}

		$amount_obj = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-pricing-table-item__amount")]' );
		if ( null !== $amount_obj && property_exists( $amount_obj, 'textContent' ) ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$this->block_attributes['amount'] = $amount_obj->textContent;
		}

		$this->block_attributes['features'] = array();

		$features = $this->query_selector_all( '//ul[contains(@class,"wp-block-coblocks-pricing-table-item__features")]/li' );

		if ( $features->length > 0 ) {

			foreach ( $features as $feature ) {
				// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				$this->block_attributes['features'][] = $feature->textContent;

			}
		}

		return array_filter( $this->block_attributes );
	}
}
