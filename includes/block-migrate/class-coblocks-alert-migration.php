<?php
/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Gallery_Collage_Migration
 *
 * Define how a coblocks/alert block should migrate into a core/paragraph block.
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
	 * @param array $parsed_block_attributes the JSON attributes parsed from the block.
	 * @inheritDoc
	 */
	protected function migrate_attributes( $parsed_block_attributes = array() ) {
		$alert_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-alert")]' );

		$result = array(
			'content' => implode(
				'<br />',
				array_filter(
					array(
						$this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__title")]' )->textContent,
						$this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__text")]' )->textContent,
					)
				)
			),
		);

		if ( ! $this->get_attribute_from_classname( 'is-style-', $alert_wrapper ) ) {
			$result['className'] = 'is-style-info';
		}

		$result = $this->get_alert_colors( $this->block_attributes, $result );

		return array_merge( $this->block_attributes, $result );
	}

	/**
	 * Map the alert block custom colors to new attributes.
	 *
	 * @param  array $attributes Alert block attributes.
	 * @param  array $result     Paragraph block attributes.
	 *
	 * @return array New paragraph block attributes.
	 */
	private function get_alert_colors( $attributes, $result ) {
		if ( array_key_exists( 'customTextColor', $attributes ) ) {
			$result['style']['color']['text'] = $attributes['customTextColor'];
		}

		if ( array_key_exists( 'customBackgroundColor', $attributes ) ) {
			$result['style']['color']['background'] = $attributes['customBackgroundColor'];
		}

		return $result;
	}
}
