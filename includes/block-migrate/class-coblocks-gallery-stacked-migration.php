<?php
/**
 * CoBlocks_Gallery_Stacked_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Stacked_Migration
 *
 * Define how a coblocks/gallery-stacked block should migrate into a core/gallery block.
 */
class CoBlocks_Gallery_Stacked_Migration extends CoBlocks_Block_Migration {
	/**
	 * The DOMNode for the gallery wrapper element
	 *
	 * @var DOMNode
	 */
	private $gallery_wrapper;

	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/gallery-stacked';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$this->gallery_wrapper = $this->query_selector( '//ul[contains(@class,"coblocks-gallery")]' );
		if ( ! $this->gallery_wrapper ) {
			return array();
		}

		return array_filter(
			array_merge(
				$this->gallery_attributes(),
				array( 'images' => $this->images() )
			)
		);
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function gallery_attributes() {
		return array(
			'className' => $this->get_attribute_from_classname( 'has-border-radius-', $this->gallery_wrapper )
				? 'is-style-default'
				: 'is-style-compact',
			'filter'    => $this->get_attribute_from_classname( 'has-filter-', $this->gallery_wrapper ),
			'align'     => $this->get_attribute_from_classname( 'align', $this->block_wrapper() ),
			'lightbox'  => $this->get_attribute_from_classname( 'has-lightbox', $this->block_wrapper() ),
		);
	}

	/**
	 * Calculate attributes applied to the gallery items.
	 *
	 * @return array attributes found and their values.
	 */
	private function images() {
		$gallery_images = array();
		$gallery_items  = $this->query_selector_all( '//li[contains(@class,"coblocks-gallery--item")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$img_element        = $gallery_item->getElementsByTagName( 'img' )->item( 0 );
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' )->item( 0 );
			$anchor_element     = $gallery_item->getElementsByTagName( 'a' )->item( 0 );

			$border_radius      = $this->get_attribute_from_classname( 'has-border-radius-', $this->gallery_wrapper );
			$border_radius_attr = empty( $border_radius ) ? array() : array(
				'style' => array(
					'border' => array(
						'radius' => $border_radius . 'px',
					),
				),
			);

			array_push(
				$gallery_images,
				array_filter(
					array_merge(
						$this->get_element_attributes(
							$img_element,
							array(
								'alt'     => 'alt',
								'imgLink' => 'data-imgLink',
								'link'    => 'data-link',
								'url'     => 'src',
							)
						),
						array(
							'animation' => $this->get_element_attribute( $gallery_item, 'data-coblocks-animation' ),
							'caption'   => $this->get_element_attribute( $figcaption_element, 'textContent' ),
							'href'      => $this->get_element_attribute( $anchor_element, 'href' ),
						),
						$border_radius_attr
					)
				)
			);
		}

		return $gallery_images;
	}
}
