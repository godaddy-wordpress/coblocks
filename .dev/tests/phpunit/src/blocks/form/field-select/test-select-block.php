<?php
/**
 * Test form child block: Select Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Select_Field_Block_Test extends WP_UnitTestCase {

	private $coblocks;

	public function setUp(): void {

		parent::setUp();

		new CoBlocks_Register_Blocks();

		set_current_screen( 'dashboard' );

	}

	public function tearDown(): void {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	public function test_select_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-select', $registered_blocks );

	}

	public function test_select_field_block_attributes() {

		$registered_blocks  = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$select_field_block = $registered_blocks['coblocks/field-select'];

		$expected_attributes = array(
			'label',
			'required',
			'options',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $select_field_block->attributes );

		}

	}

	public function test_select_field_block_render_callback() {

		$registered_blocks  = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$select_field_block = $registered_blocks['coblocks/field-select'];

		$this->assertNotNull( $select_field_block->render_callback );
		$this->assertTrue( function_exists( $select_field_block->render_callback ) );

	}

	public function test_select_field_block_rendered_output() {
		$attributes = array(
			'label'   => 'Test Select Label',
			'options' => array( 'Option 1', 'Option 2' ),
		);

		$rendered_output = coblocks_render_field_select_block( $attributes );

		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Select Label', $rendered_output );

		$this->assertStringContainsString( '<select class="select coblocks-field" name="field-', $rendered_output );
		$this->assertStringContainsString( '<option value="Option 1">Option 1</option>', $rendered_output );
		$this->assertStringContainsString( '<option value="Option 2">Option 2</option>', $rendered_output );
	}

	/**
	 * Test the select field markup is as expected, when no options are passed in
	 */
	public function test_render_field_select_empty_options() {

		$this->assertEquals(
			coblocks_render_field_select_block(
				array(
					'options' => array(),
				),
				''
			),
			null
		);

	}

}
