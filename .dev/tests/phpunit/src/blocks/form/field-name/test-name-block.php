<?php
/**
 * Test form child block: Name Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Name_Field_Block_Test extends WP_UnitTestCase {

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

	public function test_name_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-name', $registered_blocks );

	}

	public function test_name_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$name_field_block  = $registered_blocks['coblocks/field-name'];

		$expected_attributes = array(
			'label',
			'required',
			'hasLastName',
			'labelFirstName',
			'labelLastName',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $name_field_block->attributes );

		}

	}

	public function test_name_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$name_field_block  = $registered_blocks['coblocks/field-name'];

		$this->assertNotNull( $name_field_block->render_callback );
		$this->assertTrue( is_callable( $name_field_block->render_callback ) );

	}

	public function test_name_field_block_rendered_output() {
		$attributes = array(
			'label'          => 'Test Name Label',
			'hasLastName'    => true,
			'labelFirstName' => 'First',
			'labelLastName'  => 'Last',
		);

		$rendered_output = $this->formClass->coblocks_render_coblocks_field_name_block( $attributes );

		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Name Label', $rendered_output );

		$this->assertStringContainsString( 'type="text"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--name first"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--name last"', $rendered_output );
		$this->assertStringContainsString( 'aria-label="', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
