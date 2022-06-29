<?php
/**
 * CoBlocks_Food_And_Drink_Migration
 *
 * @package CoBlocks
 */

 /**
 * CoBlocks_Food_And_Drink_Migration
 *
 * Define how a coblocks/food-and-drinks block should migrate into a block pattern.
 */
class CoBlocks_Food_And_Drink_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/food-and-drinks';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$food_and_drink_block = $this->query_selector( '//div[contains(@class, "wp-block-coblocks-food-and-drinks")]' );
		$food_and_drink_class = $this->get_element_attribute( $food_and_drink_block, 'class' );

		$food_and_drink_cols = $this->get_element_attribute( $food_and_drink_block, 'data-columns' );

		if ( $food_and_drink_cols ) {

			$this->block_attributes['columns'] = $food_and_drink_cols;
		}

		return $this->block_attributes;
	}
}
