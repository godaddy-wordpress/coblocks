<?php

class CoBlocks_Gallery_Stacked_Migrate {
	private $dom;
	private $xpath;

	private $has_border_radius = false;

	public function __construct( DOMDocument $dom ) {
		$this->dom = $dom;
		$this->xpath = new DOMXPath( $this->dom );
	}

	/**
	 * Produce new attributes from the parsed HTML.
	 *
	 * @return array the new block attributes.
	 */
	public function attributes() {
		$output = array_filter( array_merge(
			$this->calculate_group_attributes(),
			$this->calculate_image_attributes(),
		) );

		return $output;
	}

	/**
	 * Calculate attributes applied to the gallery.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_group_attributes() {
		$block_wrapper_query = $this->xpath->query( '//div[contains(@class,"wp-block-coblocks-gallery-stacked")]' );
		if ( ! $block_wrapper_query->count() ) return array();

		$gallery_wrapper_query = $this->xpath->query( '//ul[contains(@class,"coblocks-gallery")]' );
		if ( ! $gallery_wrapper_query->count() ) return array();

		$block_wrapper = $block_wrapper_query->item( 0 );
		$block_wrapper_classes = explode( ' ', $block_wrapper->attributes->getNamedItem( 'class' )->value );

		$gallery_wrapper = $gallery_wrapper_query->item( 0 );
		$gallery_wrapper_classes = explode( ' ', $gallery_wrapper->attributes->getNamedItem( 'class' )->value );

		$this->has_border_radius = $this->get_attribute_from_classname( 'has-border-radius-', $gallery_wrapper_classes );

		return array(
			'className' => $this->has_border_radius ? 'is-style-default' : 'is-style-compact',
			'filter' => $this->get_attribute_from_classname( 'has-filter-', $gallery_wrapper_classes ),
			'align' => $this->get_attribute_from_classname( 'align', $block_wrapper_classes ),
			'lightbox' => in_array( 'has-lightbox', $block_wrapper_classes ),
		);
	}

	/**
	 * Find the attribute value from the prefixed classname.
	 *
	 * @param string $classname_prefix prefix to search for value.
	 * @param array $classnames classnames to search.
	 *
	 * @return string attribute value.
	 */
	private function get_attribute_from_classname( string $classname_prefix, array $classnames ) {
		$filter_classname = array_filter(
			$classnames,
			function( $class ) use( $classname_prefix ) {
				return false !== strpos( $class, $classname_prefix );
			}
		);

		return empty( $filter_classname ) ? '' : str_replace( $classname_prefix, '', array_pop( $filter_classname ) );
	}

	/**
	 * Calculate attributes applied to the gallery items.
	 *
	 * @return array attributes found and their values.
	 */
	private function calculate_image_attributes() {
		$gallery_items = array();
		$gallery_item_query = $this->xpath->query( '//li[contains(@class,"coblocks-gallery--item")]' );

		foreach ( $gallery_item_query as $gallery_item ) {
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
				$gallery_items,
				array_filter( array_merge(
					$wrapper_attrs,
					$img_attrs,
					$img_caption,
					$anchor_attrs,
					$border_radius_attr,
				) )
			);
		}

		return array( 'images' => $gallery_items );
	}

	/**
	 * Get values from attributes of an element.
	 *
	 * @param DOMElement $element element to pull attribute values from.
	 * @param array $attribute_map mapping of new attributes and what element attribute to pull the value from.
	 *
	 * @return array new attributes and their values.
	 */
	private function get_data_from_attrs( DOMElement $element, array $attribute_map ) {
		return array_map(
			function( $attr_src ) use ( $element ) {
				$attr = $element->attributes->getNamedItem( $attr_src );
				return empty( $attr ) ? '' : $attr->nodeValue;
			},
			$attribute_map,
		);
	}
}
