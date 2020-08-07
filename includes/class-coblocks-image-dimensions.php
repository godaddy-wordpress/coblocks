<?php
/**
 * Add dimensions to post images so as to enable lazy loading.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Replace post content where appropriate.
 *
 * @since 2.2.0
 */
class CoBlocks_Image_Dimensions {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_filter( 
			'the_content', 
			function( $content ) {
				if ( false === strpos( $content, '<img' ) ) {
					return $content;
				}
		
				if ( ! preg_match_all( '/<img\s[^>]+>/', $content, $matches ) ) {
					return $content;
				}
		
				foreach ( $matches[0] as $image ) {
					if ( false === strpos( $image, 'width=' ) && preg_match( '/wp-image-([0-9]+)/i', $image, $image_class_id ) ) {
						$attachment_id = absint( $image_class_id[1] );
						$src = wp_get_attachment_image_src( $attachment_id, 'full' );
		
						if ( ! empty( $src[1] ) && ! empty( $src[2] ) ) {
							$image_with_width_height = str_replace(
								'src=',
								sprintf( 'width="%d" height="%d" loading="lazy" src=', $src[1], $src[2] ),
								$image
							);
		
							$content = str_replace( $image, $image_with_width_height, $content );
						}
					}
				}
		
				return $content;
			} 
		);
	}
}

new CoBlocks_Image_Dimensions();
