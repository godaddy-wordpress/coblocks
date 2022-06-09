<?php
/**
 * CoBlocks_Gallery_Offset_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Offset_Migration
 *
 * Define how a coblocks/gallery-offset block should migrate into a coblocks/gallery-offset block.
 */
class CoBlocks_Gallery_Offset_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/gallery-offset';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$images = $this->query_selector_all( '//*[contains(@class, "wp-block-coblocks-gallery-offset")]//img' );

		$gallery_images = array();

		foreach ( $images as $img ) {
			$image_url = $this->get_element_attribute(
				$img,
				'src'
			);

			array_push(
				$gallery_images,
				array(
					'url' => $image_url,
				)
			);
		}

		$this->block_attributes['images'] = $gallery_images;

		return $this->block_attributes;
	}
}
