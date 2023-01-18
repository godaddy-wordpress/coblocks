<?php
/**
 * CoBlocks_Author_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Author_Migration
 *
 * Define how a coblocks/author block should migrate into a pattern.
 */
class CoBlocks_Author_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public static function block_name() {
		return 'coblocks/author';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		if ( array_key_exists( 'imgId', $this->block_attributes ) ) {
			$image_src = wp_get_attachment_image_src( $this->block_attributes['imgId'] );
			if ( false !== $image_src ) {
				$this->block_attributes['imgUrl'] = $image_src[0];
			}
		}

		$name_inner_html = '';
		$name_children   = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-author__name")]' )->childNodes;
		foreach ( $name_children as $child ) {
			$name_inner_html .= $child->ownerDocument->saveXML( $child );
		}

		$bio_inner_html = '';
		$bio_children   = $this->query_selector( '//p[contains(@class,"wp-block-coblocks-author__biography")]' )->childNodes;
		foreach ( $bio_children as $child ) {
			$bio_inner_html .= $child->ownerDocument->saveXML( $child );
		}

		$this->block_attributes['name']      = $name_inner_html;
		$this->block_attributes['biography'] = $bio_inner_html;

		// var_dump( $this->block_attributes['className'] );

		return array_filter( $this->block_attributes );
	}
}
