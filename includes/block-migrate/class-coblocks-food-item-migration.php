<?php
/**
 * CoBlocks_Food_And_Drink_Item_Migration
 *
 * @package CoBlocks
 */

 /**
 * CoBlocks_Food_And_Drink_Item_Migration
 *
 * Define how a coblocks/food-item block should migrate into a block pattern.
 */
class CoBlocks_Food_Item_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/food-item';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$food_item_content_container = $this->query_selector( '//div[contains(@class, "wp-block-coblocks-food-item__content")]' );
		$food_item_header = $this->query_selector( '//div[contains(@class, "wp-block-coblocks-food-item__content")]//div[contains(@class, "wp-block-coblocks-food-item__heading")]//h4' );

		if ( $food_item_header ) {
			$this->block_attributes["title"] = $food_item_header->textContent;
		}

		$food_item_price = $this->query_selector('//p[contains(@class, "wp-block-coblocks-food-item__price")]');

		if ( $food_item_price ) {
			$this->block_attributes["price"] = $food_item_price->textContent;
		}

		$food_item_description = $this->query_selector('//p[contains(@class, "wp-block-coblocks-food-item__description")]');

		if ( $food_item_description ) {
			$this->block_attributes["description"] = $food_item_description->textContent;
		}

		return $this->block_attributes;
	}

}
