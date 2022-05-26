<?php
/**
 * CoBlocks_Hero_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Hero_Migration
 *
 * Define how a coblocks/gallery-collage block should migrate into a core/gallery block.
 */
class CoBlocks_Hero_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/hero';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @param array $parsed_block_attributes the JSON attributes parsed from the block.
	 * @inheritDoc
	 */
	protected function migrate_attributes( $parsed_block_attributes = array() ) {
		if ( ! array_key_exists( 'backgroundColor', $this->block_attributes ) && ! array_key_exists( 'customBackgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['customOverlayColor'] = '#ffffff';
		}

		$hero_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-hero__inner")]' );
		$padding_size = $this->get_attribute_from_classname( '-padding', $hero_wrapper );

		if ( $padding_size ) {
			$this->block_attributes['className'] = "${padding_size}-padding";
		}

		if ( array_key_exists( 'backgroundImg', $this->block_attributes ) ) {
			$this->block_attributes['url'] = $this->block_attributes['backgroundImg'];
		}

		if ( array_key_exists( 'backgroundRepeat', $this->block_attributes ) ) {
			$this->block_attributes['isRepeated'] = true;
		}

		if ( array_key_exists( 'backgroundOverlay', $this->block_attributes ) ) {
			$this->block_attributes['dimRatio'] = $this->block_attributes['backgroundOverlay'];
		}

		if ( ! array_key_exists( 'backgroundOverlay', $this->block_attributes ) ) {
			$this->block_attributes['dimRatio'] = 1; // Passing a 0 value doesn't work.
			$this->block_attributes['isDark']   = false;
		}

		if ( array_key_exists( 'layout', $this->block_attributes ) ) {
			$this->block_attributes['contentPosition'] = str_replace( '-', ' ', $this->block_attributes['layout'] );
		}

		if ( array_key_exists( 'backgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['overlayColor'] = $this->block_attributes['backgroundColor'];
		}

		if ( array_key_exists( 'customBackgroundColor', $this->block_attributes ) ) {
			$this->block_attributes['customOverlayColor'] = $this->block_attributes['customBackgroundColor'];
		}

		return array_filter( $this->block_attributes );
	}
}
