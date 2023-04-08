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
	public static function block_name() {
		return 'coblocks/alert';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	public function migrate_attributes() {
		/**
		 * Get the title and text innerHTML.
		 */
		$title_inner_html = $this->get_element_attribute(
			$this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__title")]' ),
			'innerHTML'
		);
		$text_inner_html  = $this->get_element_attribute(
			$this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__text")]' ),
			'innerHTML'
		);

		/**
		 * Apply title and text innerHTML to the migrated attributes.
		 */
		$result = array(
			'content' => implode(
				'<br />',
				array_filter(
					array(
						$title_inner_html,
						$text_inner_html,
					)
				)
			),
		);

		/**
		 * Descend existing className attribute from parsed attributes.
		 */
		if ( isset( $this->block_attributes['className'] ) ) {
			$result = array_merge(
				$result,
				array( 'className' => $this->block_attributes['className'] ),
			);
		}

		/**
		 * Apply textAlign attribute.
		 */
		if ( isset( $this->block_attributes['textAlign'] ) ) {
			$result              = array_merge(
				$result,
				array_filter(
					array(
						'align' => $this->block_attributes['textAlign'],
					)
				),
			);
			$result['className'] = $this->add_to_class( 'has-text-align-' . $this->block_attributes['textAlign'], $result );
		}

		/**
		 * Get alert style className and set migrated attributes.
		 */
		$alert_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-alert")]' );
		if ( ! $this->get_attribute_from_classname( 'is-style-', $alert_wrapper ) ) {
			$result['className'] = $this->add_to_class( 'is-style-info', $result );
		}

		/**
		 * Handle setting the migrated attributes custom colors.
		 */
		$result = $this->get_alert_colors( $this->block_attributes, $result );

		/**
		 * Add `coblocks-alert-paragraph` class for CoBlocks styles selector.
		 */
		$result['className'] = $this->add_to_class( 'coblocks-alert-paragraph', $result );

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
