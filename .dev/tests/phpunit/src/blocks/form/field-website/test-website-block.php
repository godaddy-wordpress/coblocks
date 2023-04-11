<?php
/**
 * Test form child block: Website Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Website_Field_Block_Test extends WP_UnitTestCase {

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

	public function test_website_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-website', $registered_blocks );

	}

	public function test_website_field_block_attributes() {

		$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$website_field_block = $registered_blocks['coblocks/field-website'];

		$expected_attributes = array(
			'label',
			'required',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $website_field_block->attributes );

		}

	}

	public function test_website_field_block_render_callback() {

		$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$website_field_block = $registered_blocks['coblocks/field-website'];

		$this->assertNotNull( $website_field_block->render_callback );
		$this->assertTrue( function_exists( $website_field_block->render_callback ) );

	}

	public function test_website_field_block_rendered_output() {
		$attributes = array(
			'label' => 'Test Website Label',
		);

		$rendered_output = coblocks_render_field_website_block( $attributes );

		$this->assertStringContainsString( '<label class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Website Label', $rendered_output );

		$this->assertStringContainsString( 'type="url"', $rendered_output );
		$this->assertStringContainsString( 'class="coblocks-field coblocks-field--website"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
	}

}
