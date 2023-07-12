<?php
/**
 * Test form child block: Text Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Text_Field_Block_Test extends WP_UnitTestCase {

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

	public function test_text_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-text', $registered_blocks );

	}

	public function test_text_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$text_field_block  = $registered_blocks['coblocks/field-text'];

		$expected_attributes = array(
			'label',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $text_field_block->attributes );

		}

	}

	public function test_text_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$text_field_block  = $registered_blocks['coblocks/field-text'];

		$this->assertNotNull( $text_field_block->render_callback );
		$this->assertTrue( is_callable( $text_field_block->render_callback ) );

	}

	public function test_text_field_block_rendered_output() {
		$attributes = array(
			'label' => 'Test Text Label',
		);

		$rendered_output = $this->formClass->coblocks_render_coblocks_field_text_block( $attributes );

		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Text Label', $rendered_output );

		$this->assertStringContainsString( 'type="text"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-text"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
