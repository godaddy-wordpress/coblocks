<?php
/**
 * CoBlocks_Media_Card_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Media_Card_Migration
 *
 * Define how a coblocks/media-card block should migrate into a core/media-text block.
 */
class CoBlocks_Media_Card_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	public function block_name() {
		return 'coblocks/media-card';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$this->block_attributes['className'] = 'is-style-card';

		if ( array_key_exists( 'mediaPosition', $this->block_attributes ) && 'right' === $this->block_attributes['mediaPosition'] ) {
			$this->block_attributes['mediaPosition'] = 'right';
		}

		if ( array_key_exists( 'mediaId', $this->block_attributes ) ) {
			$image_src = wp_get_attachment_image_src( $this->block_attributes['mediaId'] );
			if ( false !== $image_src ) {
				$this->block_attributes['mediaUrl'] = $image_src[0];
			}
		}

		return array_filter( $this->block_attributes );
	}
}
