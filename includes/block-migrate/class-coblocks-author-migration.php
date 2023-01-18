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
		$name_inner_html = '';
		$name_children   = $this->query_selector( '//span[contains(@class,"wp-block-coblocks-author__name")]' )->childNodes;
		foreach ( $name_children as $child ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$name_inner_html .= $child->ownerDocument->saveHTML( $child );
		}

		$bio_inner_html = '';
		$bio_children   = $this->query_selector( '//p[contains(@class,"wp-block-coblocks-author__biography")]' )->childNodes;
		foreach ( $bio_children as $child ) {
			// phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$bio_inner_html .= $child->ownerDocument->saveHTML( $child );
		}

		$result = array(
			'name'      => $name_inner_html,
			'biography' => $bio_inner_html,
		);

		if ( array_key_exists( 'imgId', $this->block_attributes ) ) {
			$image_src = wp_get_attachment_image_src( $this->block_attributes['imgId'] );
			if ( false !== $image_src ) {
				$result = array_merge(
					$result,
					array( 'imgUrl' => $image_src[0] ),
				);
			}
		}

		return array_merge( $this->block_attributes, $result );
	}
}
