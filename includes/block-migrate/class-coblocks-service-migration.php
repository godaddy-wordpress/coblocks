<?php
/**
 * CoBlocks_Service_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Service_Migration
 *
 * Define how a coblocks/service block should migrate into a a pattern.
 */
class CoBlocks_Service_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/service';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		// $service_block = $this->query_selector( '//figure[contains(@class,"wp-block-coblocks-service")]/img' );

		// $service_image_src = $this->get_element_attribute( $service_block, 'src' );

		// if ( $service_image_src ) {
		// 	$his->block_attributes['imageSrc'] = $service_image_src;
		// }

		return $this->block_attributes;
	}
}
