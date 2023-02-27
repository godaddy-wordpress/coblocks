<?php

require_once dirname( dirname( dirname( dirname( __FILE__ ) ) ) ) . '/compare-block-attributes.php';

/**
 * Test includes/block-migrate/class-coblocks-block-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Alert_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up() {
		$this->instance = new CoBlocks_Alert_Migration();
	}

	public function tear_down() {
		$this->instance = null;
	}

	public function test_alert_block_migration_attributes() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/alert {"textAlign":"center","className":"is-style-warning extra-text-class","animation":"slideInLeft","customFontSize":28,"fontFamily":"Barlow Condensed","lineHeight":1,"letterSpacing":1.5,"fontWeight":"300"} --><div class="wp-block-coblocks-alert has-text-align-center is-style-warning extra-text-class coblocks-animate has-custom-font has-custom-weight has-custom-lineheight has-custom-letterspacing" style="font-family:Barlow Condensed;line-height:1;letter-spacing:1.5px;font-weight:300;font-size:28px" aria-label="Alert section of type warning" data-coblocks-animation="slideInLeft"><p class="wp-block-coblocks-alert__title">Here is an alert title.</p><p class="wp-block-coblocks-alert__text"><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.</p></div><!-- /wp:coblocks/alert -->
			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(
			'textAlign'      => 'center',
			'className'      => 'is-style-warning extra-text-class has-text-align-center coblocks-alert-paragraph',
			'animation'      => 'slideInLeft',
			'customFontSize' => 28,
			'fontFamily'     => 'Barlow Condensed',
			'lineHeight'     => 1,
			'letterSpacing'  => 1.5,
			'fontWeight'     => '300',
			'content'        => 'Here is an alert title.<br /><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.',
			'align'          => 'center',
		);

		// We expect compare_block_attributes to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( compare_block_attributes( $expected_attributes, $migrated_block_attributes ) ) );
	}

	public function test_alert_block_migration_attributes_custom_colors() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/alert {"customBackgroundColor":"#f60000","customTextColor":"#0010ff","textAlign":"center","className":"is-style-warning extra-text-class","customFontSize":28,"fontFamily":"Barlow Condensed","lineHeight":1,"letterSpacing":1.5,"fontWeight":"300"} --><div class="wp-block-coblocks-alert has-text-color has-text-align-center has-background is-style-warning extra-text-class has-custom-font has-custom-weight has-custom-lineheight has-custom-letterspacing" style="background-color:#f60000;color:#0010ff;font-family:Barlow Condensed;line-height:1;letter-spacing:1.5px;font-weight:300;font-size:28px" aria-label="Alert section of type warning"><p class="wp-block-coblocks-alert__title">Here is an alert title.</p><p class="wp-block-coblocks-alert__text"><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.</p></div><!-- /wp:coblocks/alert -->
			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(
			'textAlign'             => 'center',
			'customBackgroundColor' => '#f60000',
			'customTextColor'       => '#0010ff',
			'style'                 => array(
				'color' => array(
					'text'       => '#0010ff',
					'background' => '#f60000',
				),
			),
			'className'             => 'is-style-warning extra-text-class has-text-align-center coblocks-alert-paragraph',
			'customFontSize'        => 28,
			'fontFamily'            => 'Barlow Condensed',
			'lineHeight'            => 1,
			'letterSpacing'         => 1.5,
			'fontWeight'            => '300',
			'content'               => 'Here is an alert title.<br /><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.',
			'align'                 => 'center',
		);

		// We expect compare_block_attributes to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( compare_block_attributes( $expected_attributes, $migrated_block_attributes ) ) );
	}

	public function test_alert_block_migration_attributes_theme_colors() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/alert {"backgroundColor":"secondary","textColor":"tertiary","textAlign":"center","className":"extra-text-class is-style-warning","customFontSize":28,"fontFamily":"Barlow Condensed","lineHeight":1,"letterSpacing":1.5,"fontWeight":"300"} --><div class="wp-block-coblocks-alert has-text-color has-tertiary-color has-text-align-center has-background has-secondary-background-color extra-text-class is-style-warning has-custom-font has-custom-weight has-custom-lineheight has-custom-letterspacing" style="font-family:Barlow Condensed;line-height:1;letter-spacing:1.5px;font-weight:300;font-size:28px" aria-label="Alert section of type warning"><p class="wp-block-coblocks-alert__title">Here is an alert title.</p><p class="wp-block-coblocks-alert__text"><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.</p></div><!-- /wp:coblocks/alert -->
			BLOCKHTML
		);

		$migrated_block_attributes = $this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$expected_attributes = array(
			'textAlign'       => 'center',
			'textColor'       => 'tertiary',
			'backgroundColor' => 'secondary',
			'className'       => 'extra-text-class is-style-warning has-text-align-center coblocks-alert-paragraph',
			'customFontSize'  => 28,
			'fontFamily'      => 'Barlow Condensed',
			'lineHeight'      => 1,
			'letterSpacing'   => 1.5,
			'fontWeight'      => '300',
			'content'         => 'Here is an alert title.<br /><strong>Here</strong> <em>i</em><a href="https://example.com">s</a> <mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-primary-color">a</mark><code>n</code> <img class="wp-image-54" style="width: 150px;" src="http://localhost:8888/wp-content/uploads/2023/01/vneck-tee-2.jpg" alt=""><kbd>a</kbd><s>l</s><sub>e</sub><sup>r</sup><span class="uppercase">t</span> text content.',
			'align'           => 'center',
		);

		// We expect compare_block_attributes to return empty array if expected attributes match migrated attributes.
		$this->assertTrue( empty( compare_block_attributes( $expected_attributes, $migrated_block_attributes ) ) );
	}
}
