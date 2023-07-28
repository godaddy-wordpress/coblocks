<?php
/**
 * Test form child block: Date Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Date_Field_Block_Test extends WP_UnitTestCase {

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
	 * Test the date field block is registered
	 */
	public function test_date_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-date', $registered_blocks );

	}

	/**
	 * Test the date field block has the expected attributes
	 */
	public function test_date_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$date_field_block  = $registered_blocks['coblocks/field-date'];

		$expected_attributes = array(
			'label',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $date_field_block->attributes );

		}

	}

	/**
	 * Test the render callback function is defined for the date field block
	 */
	public function test_date_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$date_field_block  = $registered_blocks['coblocks/field-date'];

		$this->assertNotNull( $date_field_block->render_callback );
		$this->assertTrue( is_callable( $date_field_block->render_callback ) );

	}

	/**
	 * Test the rendered output of the date field block
	 */
	public function test_date_field_block_rendered_output() {
		$attributes = array(
			'label'    => 'Test Date Label',
			'required' => false,
		);

		$rendered_output = $this->formClass->coblocks_render_coblocks_field_date_block( $attributes );

		// Test the label
		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Date Label', $rendered_output );

		// Test input field
		$this->assertStringContainsString( 'type="date"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--date"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
