<?php
/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * Define how a coblocks/gallery-collage block should migrate into a core/gallery block.
 */
class CoBlocks_Gallery_Collage_Migration extends CoBlocks_Block_Migration {
	/**
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/gallery-collage';
	}

	/**
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$output = array_merge(
			$this->calculate_group_attributes(),
			$this->calculate_image_attributes(),
		);

		return $output;
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_group_attributes() {
		return array(
			'className' => 'is-style-collage',
			'filter' => $this->get_attribute_from_classname( 'has-filter-', $this->block_wrapper() ),
			'align' => $this->get_attribute_from_classname( 'align', $this->block_wrapper() ),
			'lightbox' => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
		);
	}

	/**
	 * Calculate attributes applied to the gallery items.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_image_attributes() {
		$gallery_images = array();
		$gallery_items = $this->query_selector_all( '//li[contains(@class,"wp-block-coblocks-gallery-collage__item")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$img_element = $gallery_item->getElementsByTagName( 'img' )->item( 0 );
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' )->item( 0 );
			$anchor_element = $gallery_item->getElementsByTagName( 'a' )->item( 0 );

			$image_attributes = array(
				'alt' => $this->get_element_attribute( $img_element, 'alt' ),
				'animation' => $this->get_element_attribute( $gallery_item, 'data-coblocks-animation' ),
				'caption' => $this->get_element_attribute( $figcaption_element, 'textContent' ),
				'href' => $this->get_element_attribute( $anchor_element, 'href' ),
				'imgLink' => $this->get_element_attribute( $img_element, 'data-imgLink' ),
				'link' => $this->get_element_attribute( $img_element, 'data-link' ),
				'url' => $this->get_element_attribute( $img_element, 'src' ),
			);

			array_push(
				$gallery_images,
				array_filter( array_merge(
					$image_attributes,
				) )
			);
		}

		return array( 'images' => $gallery_images );
	}
}
