<?php

class CoBlocks_Gallery_Stacked_Migrate extends CoBlocks_Block_Migration {
	private $has_border_radius = false;

	/**
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array_merge(
			$this->calculate_group_attributes(),
			$this->calculate_image_attributes(),
		);
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_group_attributes() {
		$block_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-gallery-stacked")]' );
		if ( ! $block_wrapper ) return array();

		$gallery_wrapper = $this->query_selector( '//ul[contains(@class,"coblocks-gallery")]' );
		if ( ! $gallery_wrapper ) return array();

		$this->has_border_radius = $this->get_attribute_from_classname( 'has-border-radius-', $block_wrapper );

		return array(
			'className' => $this->has_border_radius ? 'is-style-default' : 'is-style-compact',
			'filter' => $this->get_attribute_from_classname( 'has-filter-', $gallery_wrapper ),
			'align' => $this->get_attribute_from_classname( 'align', $block_wrapper ),
			'lightbox' => $this->get_attribute_from_classname( 'has-lightbox', $block_wrapper ),
		);
	}

	/**
	 * Calculate attributes applied to the gallery items.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_image_attributes() {
		$gallery_images = array();
		$gallery_items = $this->query_selector_all( '//li[contains(@class,"coblocks-gallery--item")]' );

		foreach ( $gallery_items as $gallery_item ) {
			$wrapper_attrs = $this->get_data_from_attrs(
				$gallery_item,
				array(
					'animation' => 'data-coblocks-animation',
				)
			);

			$img_attrs = $this->get_data_from_attrs(
				$gallery_item->getElementsByTagName( 'img' )->item( 0 ),
				array(
					'alt' => 'alt',
					'imgLink' => 'data-imglink',
					'link' => 'data-link',
					'url' => 'src',
				)
			);

			$img_caption = array();
			$figcaption_element = $gallery_item->getElementsByTagName( 'figcaption' );
			if ( $figcaption_element->count() ) {
				$img_caption = array(
					'caption' => $figcaption_element->item(0)->textContent,
				);
			}

			$anchor_attrs = array();
			$anchor_element = $gallery_item->getElementsByTagName( 'a' );
			if ( $anchor_element->count() ) {
				$anchor_attrs = $this->get_data_from_attrs(
					$anchor_element->item( 0 ),
					array(
						'href' => 'href',
					)
				);
			}

			$border_radius_attr = array();
			if ( $this->has_border_radius ) {
				$border_radius_attr = array(
					'style' => array(
						'border' => array(
							'radius' => $this->has_border_radius . 'px',
						),
					),
				);
			}

			array_push(
				$gallery_images,
				array_filter( array_merge(
					$wrapper_attrs,
					$img_attrs,
					$img_caption,
					$anchor_attrs,
					$border_radius_attr,
				) )
			);
		}

		return array( 'images' => $gallery_images );
	}
}
