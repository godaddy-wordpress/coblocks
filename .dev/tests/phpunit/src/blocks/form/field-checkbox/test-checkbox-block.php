<?php
/**
 * Test form child block: Checkbox Block
 *
 * @package CoBlocks
 */

class CoBlocks_Checkbox_Block_Test extends WP_UnitTestCase {

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

	/**
	 * Test the checkbox block is registered
	 */
	public function test_checkbox_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-checkbox', $registered_blocks );

	}

	/**
	 * Test the checkbox block has the expected attributes
	 */
	public function test_checkbox_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$checkbox_block    = $registered_blocks['coblocks/field-checkbox'];

		$expected_attributes = array(
			'options',
			'isInline',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $checkbox_block->attributes );

		}

	}

	/**
	 * Test the render callback function is defined for the checkbox block
	 */
	public function test_checkbox_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$checkbox_block    = $registered_blocks['coblocks/field-checkbox'];

		$this->assertNotNull( $checkbox_block->render_callback );
		$this->assertTrue( function_exists( $checkbox_block->render_callback ) );

	}

	/**
	 * Test the rendered output of the checkbox block
	 */
	public function test_checkbox_block_rendered_output() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$checkbox_block    = $registered_blocks['coblocks/field-checkbox'];

		// Define the attributes and content for the checkbox block
		$attributes = array(
			'options'  => array(
				'Option 1',
				'Option 2',
				'Option 3',
			),
			'label'    => 'Test Label',
			'isInline' => false,
			'required' => false,
		);

		$rendered_output = coblocks_render_field_checkbox_block( $attributes );

		// Test the label
		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Label', $rendered_output );

		// Test the options
		$this->assertStringContainsString( 'Option 1', $rendered_output );
		$this->assertStringContainsString( 'Option 2', $rendered_output );
		$this->assertStringContainsString( 'Option 3', $rendered_output );

		// Test input fields
		$this->assertStringContainsString( 'type="checkbox"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
		$this->assertStringContainsString( '[value][]"', $rendered_output );

	}

	/**
	 * Test that the required checkbox field script is loaded when checkboxes
	 * are set to required
	 */
	public function test_required_checkbox_script() {

		coblocks_render_field_checkbox_block(
			array(
				'options'  => array(
					'option-1' => 'Option 1',
					'option-2' => 'Option 2',
				),
				'required' => true,
			),
			''
		);

		global $wp_scripts;

		$this->assertArrayHasKey( 'coblocks-checkbox-required', $wp_scripts->registered );

	}

		/**
		 * Test the inline checkbox field markup is as expected
		 */
	public function test_render_field_checkbox_inline() {

		$this->expectOutputRegex( '/<div class="coblocks--inline">/' );

		echo coblocks_render_field_checkbox_block(
			array(
				'options'  => array(
					'option-1' => 'Option 1',
					'option-2' => 'Option 2',
				),
				'isInline' => true,
			),
			''
		);

	}

	/**
	 * Test the checkbox required class is added to the markup as expected
	 */
	public function test_render_field_checkbox_required_class() {

		$this->expectOutputRegex( '/<div class="coblocks-field checkbox required">/' );

		echo coblocks_render_field_checkbox_block(
			array(
				'options'  => array(
					'option-1' => 'Option 1',
					'option-2' => 'Option 2',
				),
				'required' => true,
			),
			''
		);

	}

	/**
	 * Test the checkbox field markup is as expected, when no options are passed in
	 */
	public function test_render_field_checkbox_empty_options() {

		$this->assertEquals(
			coblocks_render_field_checkbox_block(
				array(
					'options' => array(),
				),
				''
			),
			null
		);

	}

}
