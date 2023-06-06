<?php
/**
 * Test form child block: Hidden Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Hidden_Field_Block_Test extends WP_UnitTestCase {

	private $coblocks;
	private $formClass;

	public function setUp(): void {

		parent::setUp();

		new CoBlocks_Register_Blocks();
		$this->formClass = new CoBlocks_Form();

		set_current_screen( 'dashboard' );

	}

	public function tearDown(): void {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the hidden field block is registered
	 */
	public function test_hidden_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-hidden', $registered_blocks );

	}

	/**
	 * Test the hidden field block has the expected attributes
	 */
	public function test_hidden_field_block_attributes() {

		$registered_blocks  = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$hidden_field_block = $registered_blocks['coblocks/field-hidden'];

		$expected_attributes = array(
			'label',
			'value',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $hidden_field_block->attributes );

		}

	}

	/**
	 * Test the render callback function is defined for the hidden field block
	 */
	public function test_hidden_field_block_render_callback() {

		$registered_blocks  = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$hidden_field_block = $registered_blocks['coblocks/field-hidden'];

		$this->assertNotNull( $hidden_field_block->render_callback );
		$this->assertTrue( is_callable( $hidden_field_block->render_callback ) );

	}

	/**
	 * Test the rendered output of the hidden field block
	 */
	public function test_hidden_field_block_rendered_output() {
		$attributes = array(
			'label' => 'Test Hidden Label',
			'value' => 'Test Hidden Value',
		);

		$rendered_output = $this->formClass->coblocks_render_coblocks_field_hidden_block( $attributes );

		// Test input field
		$this->assertStringContainsString( 'type="hidden"', $rendered_output );
		$this->assertStringContainsString( 'value="Test Hidden Value"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--hidden"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
