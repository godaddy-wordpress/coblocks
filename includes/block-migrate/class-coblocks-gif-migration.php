<?php
/**
 * CoBlocks_Gif_Migration
 *
 * @package CoBlocks
 */

 /**
  * CoBlocks_Gif_Migration
  *
  * Define how a coblocks/gif block should migrate into a core/image block.
  */
class CoBlocks_Gif_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/gif';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$gif_image = $this->query_selector( '//*[contains(@class, "wp-block-coblocks-gif")]//img' );

		$gif_image_url = $this->get_element_attribute(
			$gif_image,
			'src'
		);

		if ( ! empty( $gif_image_url ) ) {
			$this->block_attributes['url'] = $gif_image_url;
		}

		return $this->block_attributes;
	}
}
