<?php
/**
 * Test form child block: Phone Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Phone_Field_Block_Test extends WP_UnitTestCase {

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

	public function test_phone_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-phone', $registered_blocks );

	}

	public function test_phone_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$phone_field_block = $registered_blocks['coblocks/field-phone'];

		$expected_attributes = array(
			'label',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $phone_field_block->attributes );

		}

	}

	public function test_phone_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$phone_field_block = $registered_blocks['coblocks/field-phone'];

		$this->assertNotNull( $phone_field_block->render_callback );
		$this->assertTrue( is_callable( $phone_field_block->render_callback ) );

	}

	public function test_phone_field_block_rendered_output() {
		$attributes = array(
			'label' => 'Test Phone Label',
		);

		$rendered_output = $this->formClass->coblocks_render_coblocks_field_phone_block( $attributes );

		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Phone Label', $rendered_output );

		$this->assertStringContainsString( 'type="tel"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--telephone"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
