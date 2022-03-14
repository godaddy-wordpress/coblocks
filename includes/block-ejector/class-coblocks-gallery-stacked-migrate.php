<?php

class CoBlocks_Gallery_Stacked_Migrate {
	private $dom;

	private $images = array();

	public function __construct( DOMDocument $dom ) {
		$this->dom = $dom;
	}

	public function attributes() {
		$this->get_figures();
		return array(
			'images' => $this->images,
			'ids' => $this->get_image_ids(),
		);
	}

	private function get_figures() {
		$figures = $this->dom->getElementsByTagName( 'figure' );

		foreach( $figures as $figure ) {
			$image = $this->get_image_data( $figure );
			$figcaption = $this->get_caption_data( $figure );
			array_push(
				$this->images,
				array_merge( $image, $figcaption )
			);
		}
	}

	private function get_image_data( DOMElement $figure ) {
		$img_element = $figure->getElementsByTagName( 'img' );

		if ( ! $img_element->count() ) return array();

		$attribute_map = array(
			'id' => 'data-id',
			'url' => 'src',
			'fullUrl' => 'data-full-url',
			'link' => 'data-link',
			'alt' => 'alt',
		);

		return array_map(
			function( $attr_src ) use ( $img_element ) {
				return $img_element->item( 0 )->attributes->getNamedItem( $attr_src )->nodeValue;
			},
			$attribute_map,
		);
	}

	private function get_image_ids() {
		return array_map(
			function( $image ) {
				return $image['id'];
			},
			$this->images
		);
	}

	private function get_caption_data( DOMElement $figure ) {
		$figcaption_element = $figure->getElementsByTagName( 'figcaption' );

		if ( ! $figcaption_element->count() ) return array();

		return array(
			'caption' => $figcaption_element->item( 0 )->textContent,
		);
	}
}
