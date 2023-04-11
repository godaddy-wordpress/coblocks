<?php
/**
 * Test form child block: Email Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Email_Field_Block_Test extends WP_UnitTestCase {

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
	 * Test the email field block is registered
	 */
	public function test_email_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-email', $registered_blocks );

	}

	/**
	 * Test the email field block has the expected attributes
	 */
	public function test_email_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$email_field_block = $registered_blocks['coblocks/field-email'];

		$expected_attributes = array(
			'label',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $email_field_block->attributes );

		}

	}

	/**
	 * Test the render callback function is defined for the email field block
	 */
	public function test_email_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$email_field_block = $registered_blocks['coblocks/field-email'];

		$this->assertNotNull( $email_field_block->render_callback );
		$this->assertTrue( function_exists( $email_field_block->render_callback ) );

	}

	/**
	 * Test the rendered output of the email field block
	 */
	public function test_email_field_block_rendered_output() {
		$attributes = array(
			'label'    => 'Test Email Label',
			'required' => false,
		);

		$rendered_output = coblocks_render_field_email_block( $attributes );

		// Test the label
		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Email Label', $rendered_output );

		// Test input field
		$this->assertStringContainsString( 'type="email"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--email"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
