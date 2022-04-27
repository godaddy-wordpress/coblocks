<?php
/**
 * CoBlocks_Highlight_Migration
 *
 * @package CoBlocks
 */

/**
 * CoBlocks_Highlight_Migration
 *
 * Define how a coblocks/highlight block should migrate into a core/paragraph block.
 */
class CoBlocks_Highlight_Migration extends CoBlocks_Block_Migration {
	/**
	 * Returns the name of the block.
	 *
	 * @inheritDoc
	 */
	protected function block_name() {
		return 'coblocks/highlight';
	}

	/**
	 * Produce new attributes from the migrated block.
	 *
	 * @inheritDoc
	 */
	protected function migrate_attributes() {
		$style_string = '';
		$defaults = array(
			'background-color' => '#fff8e5',
			'color' => '',
		);

		$highlight_style = $this->document->getElementsByTagName( 'mark' )->item( 1 )->getAttribute( 'style' );

		if ( $highlight_style ) {
			$element_styles = array();
			$style_array = explode( ';', $highlight_style );

			foreach ( $style_array as $style ) {
				$split = explode( ':', $style );
				$element_styles[ $split[0] ] = $split[1];
			}

			// Override defaults with inline styles.
			$defaults = wp_parse_args(
				$element_styles,
				$defaults
			);
		}

		foreach ( array_filter( $defaults ) as $key => $value ) {
			$style_string .= "${key}: $value; ";
		}

		return array(
			'content' => sprintf(
				'<span style="%1$s">%2$s</span>',
				trim( $style_string ),
				$this->query_selector( '//p[contains(@class,"wp-block-coblocks-highlight")]' )->textContent
			),
		);
	}
}
