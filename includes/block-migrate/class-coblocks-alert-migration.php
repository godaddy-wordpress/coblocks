<?php
/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * Define how a coblocks/gallery-collage block should migrate into a core/gallery block.
 */
class CoBlocks_Alert_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/alert';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		return array();
	}

	/**
	 * Calculate attributes applied to the paragraph.
	 *
	 * @return array attributes found and their values.
	 */
	private function paragraph_attributes() {
		return array(
			'style' => array(
				'color' => array(
					'background' => $this->get_alert_background_color_from_classname( $this->block_wrapper() ),
				)
			)
		);
	}

	private function get_alert_background_color_from_classname( DOMElement $element ) {
		return '#d0eac4';
	}
}
