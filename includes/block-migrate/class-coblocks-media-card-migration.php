<?php
/**
 * CoBlocks_Media_Card_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Media_Card_Migration
 *
 * Define how a coblocks/gallery-collage block should migrate into a core/gallery block.
 */
class CoBlocks_Media_Card_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/media-card';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		if ( ! array_key_exists( 'backgroundColor', $this->block_attributes ) && ! array_key_exists( 'customBackgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['customOverlayColor'] = '#ffffff';
		}

		if ( array_key_exists( 'backgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['overlayColor'] = $this->block_attributes['backgroundColor'];
		}

		if ( array_key_exists( 'customBackgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['customOverlayColor'] = $this->block_attributes['customBackgroundColor'];
		}

		return $this->block_attributes;
	}
}
