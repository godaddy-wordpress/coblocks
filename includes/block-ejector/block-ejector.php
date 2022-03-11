<?php

if( is_admin() ) :
	add_action( 'the_post', function( &$post ) {
		$parsed_blocks = parse_blocks( $post->post_content );

		$block_targets = array(
			'coblocks/gallery-stacked',
		);

		$parsed_blocks = array_map(
			function( $parsed_block ) use( $block_targets ) {
				if ( ! in_array( $parsed_block['blockName'], $block_targets ) ) {
					return $parsed_block;
				}

				$parsed_block['attrs'] = array(
					'images' => array(),
					'ids' => array(),
					'columns' => 1,
					'linkTo' => '',
					'sizeSlug' => 'large',
				);

				$dom_parser = new DOMDocument();
				$dom_parser->loadHTML( $parsed_block['innerHTML'] );

				$image_elements = $dom_parser->getElementsByTagName( 'img' ); //->item(0)->attributes->getNamedItem( 'data-id' );

				foreach( $image_elements as $image ) {
					$parsed_block['attrs']['ids'][] =  $image->attributes->getNamedItem( 'data-id' )->nodeValue;
					$parsed_block['attrs']['images'][] = array(
						'id' =>  $image->attributes->getNamedItem( 'data-id' )->nodeValue,
						'url' =>  $image->attributes->getNamedItem( 'src' )->nodeValue,
						'fullUrl' => $image->attributes->getNamedItem( 'data-full-url' )->nodeValue,
						'link' =>  $image->attributes->getNamedItem( 'data-link' )->nodeValue,
						'alt' =>  $image->attributes->getNamedItem( 'alt' )->nodeValue,
					);
				}

				return array_merge(
					$parsed_block,
					array(
						'innerHTML' => '',
						'innerContent' => '',
						'innerBlocks' => array(),
					)
				);
			},
			$parsed_blocks
		);

		$post->post_content = serialize_blocks( $parsed_blocks );
	} );

	add_action( 'init', function() {
		register_block_type( 'coblocks/gallery-stacked', array(
			'render_callback' => function() {
				return;
			},
		) );
	} );

endif;
