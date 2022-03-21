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
		return array_filter( array_merge(
			$this->gallery_attributes(),
			array( 'images' => $this->images() ),
		) );
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function gallery_attributes() {
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
	private function images() {
		$gallery_images = array();
		$gallery_items = $this->query_selector_all( '//li[contains(@class,"wp-block-coblocks-gallery-collage__item")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$img_element = $gallery_item->getElementsByTagName( 'img' )->item( 0 );
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' )->item( 0 );
			$anchor_element = $gallery_item->getElementsByTagName( 'a' )->item( 0 );

			array_push(
				$gallery_images,
				array_filter( array_merge(
					$this->get_element_attributes( $img_element, array(
						'alt' => 'alt',
						'imgLink' => 'data-imgLink',
						'link' => 'data-link',
						'url' => 'src',
					) ),
					array(
						'animation' => $this->get_element_attribute( $gallery_item, 'data-coblocks-animation' ),
						'caption' => $this->get_element_attribute( $figcaption_element, 'textContent' ),
						'href' => $this->get_element_attribute( $anchor_element, 'href' ),
					),
				) )
			);
		}

		return $gallery_images;
	}
}
