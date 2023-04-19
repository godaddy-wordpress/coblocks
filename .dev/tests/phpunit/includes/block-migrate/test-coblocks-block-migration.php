<?php
/**
 * Test includes/block-migrate/class-coblocks-block-migration.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Migration_Test extends WP_UnitTestCase {
	private $instance;

	public function set_up(): void {
		$this->instance = new Block_Migration_Mock();
	}

	public function tear_down(): void {
		$this->instance = null;
	}

	public function test_block_name() {
		$block_name = new ReflectionMethod( $this->instance, 'block_name' );
		$block_name->setAccessible( true );

		$this->assertEquals(
			'coblocks/test-block',
			$block_name->invoke( $this->instance )
		);
	}

	public function test_block_wrapper() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element"></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$this->assertInstanceOf(
			DOMNode::class,
			$block_wrapper->invoke( $this->instance )
		);
	}

	public function test_block_wrapper_not_found_returns_empty_array() {
		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block /-->
			BLOCKHTML
		);
		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$this->assertIsArray( $block_wrapper->invoke( $this->instance ) );
		$this->assertEmpty( $block_wrapper->invoke( $this->instance ) );
	}

	public function test_block_wrapper_returns_same_instance() {
		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$initial = $block_wrapper->invoke( $this->instance );
		$this->assertTrue( $initial === $block_wrapper->invoke( $this->instance ) );
	}

	public function test_get_attribute_from_classname_with_value_appended() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_attribute_from_classname = new ReflectionMethod( $this->instance, 'get_attribute_from_classname' );
		$get_attribute_from_classname->setAccessible( true );

		$this->assertEquals(
			'this-value',
			$get_attribute_from_classname->invokeArgs( $this->instance, array( 'this-feature-', $block_wrapper->invoke( $this->instance ) ) )
		);
	}

	public function test_get_attribute_from_classname_with_boolean() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_attribute_from_classname = new ReflectionMethod( $this->instance, 'get_attribute_from_classname' );
		$get_attribute_from_classname->setAccessible( true );

		$this->assertTrue(
			$get_attribute_from_classname->invokeArgs( $this->instance, array( 'has-feature', $block_wrapper->invoke( $this->instance ) ) )
		);
	}

	public function test_get_element_attribute() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block -->
			<div data-data="sample" class="wp-block-coblocks-test-block this-feature-this-value has-feature">
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_element_attribute = new ReflectionMethod( $this->instance, 'get_element_attribute' );
		$get_element_attribute->setAccessible( true );

		$this->assertEquals(
			'wp-block-coblocks-test-block this-feature-this-value has-feature',
			$get_element_attribute->invokeArgs( $this->instance, array( $block_wrapper->invoke( $this->instance ), 'class' ) )
		);

		$this->assertEquals(
			'sample',
			$get_element_attribute->invokeArgs( $this->instance, array( $block_wrapper->invoke( $this->instance ), 'data-data' ) )
		);
	}

	public function test_get_element_attribute_text_content() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element specific-content"><i>Italics</i><b>Bold</b><sup>Superscript</sup><sub>Subscript</sub></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_element_attribute = new ReflectionMethod( $this->instance, 'get_element_attribute' );
		$get_element_attribute->setAccessible( true );

		$this->assertEquals(
			"\n\tItalicsBoldSuperscriptSubscript\n\t\n\tsome text content\n",
			$get_element_attribute->invokeArgs( $this->instance, array( $block_wrapper->invoke( $this->instance ), 'textContent' ) )
		);
	}

	public function test_get_element_attribute_inner_html() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element specific-content"><i>Italics</i><b>Bold</b><sup>Superscript</sup><sub>Subscript</sub></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_element_attribute = new ReflectionMethod( $this->instance, 'get_element_attribute' );
		$get_element_attribute->setAccessible( true );

		$query_selector = new ReflectionMethod( $this->instance, 'query_selector' );
		$query_selector->setAccessible( true );

		$result = $query_selector->invokeArgs( $this->instance, array( '//div[contains(@class,"specific-content")]' ) );

		$this->assertEquals(
			'<i>Italics</i><b>Bold</b><sup>Superscript</sup><sub>Subscript</sub>',
			$get_element_attribute->invokeArgs(
				$this->instance,
				array(
					$result,
					'innerHTML',
				)
			)
		);
	}

	public function test_get_element_attributes_text_content() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element"></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );

		$get_element_attributes = new ReflectionMethod( $this->instance, 'get_element_attributes' );
		$get_element_attributes->setAccessible( true );

		$attribute_mapping = array( 'new_attr_key' => 'class' );

		$mapped_attributes = $get_element_attributes->invokeArgs(
			$this->instance,
			array(
				$block_wrapper->invoke( $this->instance ),
				$attribute_mapping,
			)
		);

		$this->assertIsArray( $mapped_attributes );
		$this->assertEquals( 'wp-block-coblocks-test-block this-feature-this-value has-feature', $mapped_attributes['new_attr_key'] );
	}

	public function test_query_selector_all() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element"></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$query_selector_all = new ReflectionMethod( $this->instance, 'query_selector_all' );
		$query_selector_all->setAccessible( true );

		$result = $query_selector_all->invokeArgs(
			$this->instance,
			array(
				'//div[contains(@class,"child-element")]',
			)
		);

		$this->assertIsIterable( $result );
		$this->assertCount( 2, $result );
	}

	public function test_query_selector() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element"></div>
				<div class="child-element"></div>
				some text content
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);

		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );

		$query_selector = new ReflectionMethod( $this->instance, 'query_selector' );
		$query_selector->setAccessible( true );

		$result = $query_selector->invokeArgs(
			$this->instance,
			array(
				'//div[contains(@class,"child-element")]',
			)
		);

		$this->assertInstanceOf( DOMElement::class, $result );
	}

	public function test_special_characters_preservation() {
		$parsed_block = parse_blocks(
			<<<BLOCKHTML
			<!-- wp:coblocks/test-block {"attribute-one":"value-one","attribute-two":"value-one"} -->
			<div class="wp-block-coblocks-test-block this-feature-this-value has-feature">
				<div class="child-element"></div>
				<div class="child-element"></div>
				Ą Ć Ę Α Β Γ А Б В Ա Բ Գ א ב ג ء أ آ अ आ इ ก ข ฃ 一 二 三
			</div>
			<!-- /wp:coblocks/test-block -->
			BLOCKHTML
		);
	
		$this->instance->migrate( $parsed_block[0]['attrs'], $parsed_block[0]['innerHTML'] );
	
		$block_wrapper = new ReflectionMethod( $this->instance, 'block_wrapper' );
		$block_wrapper->setAccessible( true );
	
		$get_element_attribute = new ReflectionMethod( $this->instance, 'get_element_attribute' );
		$get_element_attribute->setAccessible( true );
	
		$this->assertEquals(
			"\n\t\n\t\n\tĄ Ć Ę Α Β Γ А Б В Ա Բ Գ א ב ג ء أ آ अ आ इ ก ข ฃ 一 二 三\n",
			$get_element_attribute->invokeArgs( $this->instance, array( $block_wrapper->invoke( $this->instance ), 'textContent' ) )
		);
	}
}

class Block_Migration_Mock extends CoBlocks_Block_Migration {

	public static function block_name() {
		return 'coblocks/test-block';
	}

	protected function migrate_attributes() {
		return array();
	}
}
