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
	 * Extraction of logic to get author block image uri.
	 *
	 * @param string|id $image_id The id of the image in use.
	 */
	public function get_image_src( $image_id ) {
		return wp_get_attachment_image_src( $image_id );
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	public function migrate_attributes() {
		/**
		 * Get the name and bio innerHTML.
		 */
		$name_inner_html = $this->get_element_attribute(
			$this->query_selector( '//span[contains(@class,"wp-block-coblocks-author__name")]' ),
			'innerHTML'
		);
		$bio_inner_html  = $this->get_element_attribute(
			$this->query_selector( '//p[contains(@class,"wp-block-coblocks-author__biography")]' ),
			'innerHTML'
		);

		/**
		 * Apply name and bio to the resulting attributes.
		 */
		$result = array(
			'name'      => $name_inner_html,
			'biography' => $bio_inner_html,
		);

		/**
		 * Check if user has already bolded the block name anywhere.
		 * Apply strong tags to the name for styling consistency if not strong.
		 */
		$name_has_bold = ( strpos( $name_inner_html, '<b>' ) || strpos( $name_inner_html, '<strong>' ) );
		if ( ! $name_has_bold ) {
			$result = array_merge(
				$result,
				array( 'name' => "<strong>{$name_inner_html}</strong>" ),
			);
		}

		/**
		 * User set anchors are defined by top-level id in markup.
		 * Pass into new block with attribute name 'anchor'.
		 */
		$anchor_id = $this->get_element_attribute(
			$this->query_selector( '//div[contains(@class,"wp-block-coblocks-author")]' ),
			'id',
		);
		if ( isset( $anchor_id ) ) {
			$result = array_merge(
				$result,
				array( 'anchor' => $anchor_id ),
			);
		}

		/**
		 * Descend existing className.
		 */
		if ( isset( $this->block_attributes['className'] ) ) {
			$result = array_merge(
				$result,
				array( 'className' => $this->block_attributes['className'] ),
			);
		}

		/**
		 * Get imgUrl which typically exists in post-content.
		 */
		if ( array_key_exists( 'imgId', $this->block_attributes ) ) {
			$image_src = wp_get_attachment_image_src( $this->block_attributes['imgId'] );
			if ( false !== $image_src ) {
				$result = array_merge(
					$result,
					array( 'imgUrl' => $image_src[0] ),
				);
			}
		}

		/**
		 * External URI causes `wp_get_attachment_image_src` to return `false` so we fall back.
		 *
		 * If user modified post-content outside or copy/paste block markup
		 * then its possible for image src to be external. Get the src from markup.
		 */
		if ( ! isset( $result['imgUrl'] ) ) {
			$author_image_uri = $this->get_element_attribute(
				$this->query_selector( '//img[contains(@class,"wp-block-coblocks-author__avatar-img")]' ),
				'src'
			);

			$result = array_merge(
				$result,
				array( 'imgUrl' => $author_image_uri ),
			);
		}

		/**
		 * Add `coblocks-author-columns` class for CoBlocks styles selector.
		 */
		$result['className'] = $this->add_to_class( 'coblocks-author-columns', $result );

		return array_merge( $this->block_attributes, $result );
	}
}
