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
	protected function migrate_attributes() {
		var_dump($this->block_attributes['textAlign']);

		$alert_wrapper = $this->query_selector( '//div[contains(@class,"wp-block-coblocks-alert")]' );

		$title_inner_html = '';
		$title_children   = $this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__title")]' )->childNodes;
		foreach ( $title_children as $child ) {
			$title_inner_html .= $child->ownerDocument->saveHTML( $child );
		}

		$title_inner_html = '';
		$text_children    = $this->query_selector( '//p[contains(@class,"wp-block-coblocks-alert__text")]' )->childNodes;
		foreach ( $text_children as $child ) {
			$title_inner_html .= $child->ownerDocument->saveHTML( $child );
		}

		$result = array(
			'content' => implode(
				'<br />',
				array_filter(
					array(
						$title_inner_html,
						$title_inner_html,
					)
				)
			),
		);
		var_dump($this->block_attributes['textAlign']);
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

		if ( ! $this->get_attribute_from_classname( 'is-style-', $alert_wrapper ) ) {
			$result['className'] = $this->add_to_class( 'is-style-info', $result );
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

	/**
	 * Add className onto alert block. This will append onto the existing className if defined.
	 *
	 * @param  string $class_to_add Class to add.
	 * @param  array  $result       Paragraph block attributes.
	 *
	 * @return array New combined classes.
	 */
	private function add_to_class( $class_to_add, $result ) {
		$new_class = isset( $result['className'] ) ? "{$result['className']} {$class_to_add}" : $class_to_add;
		return $new_class;
	}
}
