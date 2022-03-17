<?php
/**
 * CoBlocks_Gallery_Masonry_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Masonry_Migration
 *
 * Define how a coblocks/gallery-masonry block should migrate into a core/gallery block.
 */
class CoBlocks_Gallery_Masonry_Migration extends CoBlocks_Block_Migration {
	/**
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/gallery-masonry';
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
		$gallery_items = $this->query_selector_all( '//figure[contains(@class,"wp-block-image")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$img_element = $gallery_item->getElementsByTagName( 'img' )->item( 0 );
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' )->item( 0 );
			$anchor_element = $gallery_item->getElementsByTagName( 'a' )->item( 0 );

			$image_attributes = array(
				'alt' => $this->get_value_from_element_attribute( $img_element, 'alt' ),
				'animation' => $this->get_value_from_element_attribute( $gallery_item, 'data-coblocks-animation' ),
				'caption' => $this->get_value_from_element_attribute( $figcaption_element, 'textContent' ),
				'href' => $this->get_value_from_element_attribute( $anchor_element, 'href' ),
				'imgLink' => $this->get_value_from_element_attribute( $img_element, 'data-imgLink' ),
				'link' => $this->get_value_from_element_attribute( $img_element, 'data-link' ),
				'url' => $this->get_value_from_element_attribute( $img_element, 'src' ),
			);

			$border_radius = $this->get_attribute_from_classname( 'has-border-radius-', $this->gallery_wrapper );
			$border_radius_attr = empty( $border_radius ) ? array() : array(
				'style' => array(
					'border' => array(
						'radius' => $border_radius . 'px',
					),
				),
			);

			array_push(
				$gallery_images,
				array_filter( array_merge(
					$image_attributes,
					$border_radius_attr,
				) )
			);
		}

		return array( 'images' => $gallery_images );
	}
}
