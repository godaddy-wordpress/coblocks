<?php
/**
 * Test form child block: Radio Field Block
 *
 * @package CoBlocks
 */

class CoBlocks_Radio_Field_Block_Test extends WP_UnitTestCase {

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

	public function test_radio_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-radio', $registered_blocks );

	}

	public function test_radio_field_block_attributes() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$radio_field_block = $registered_blocks['coblocks/field-radio'];

		$expected_attributes = array(
			'label',
			'required',
			'options',
			'isInline',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $radio_field_block->attributes );

		}

	}

	public function test_radio_field_block_render_callback() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$radio_field_block = $registered_blocks['coblocks/field-radio'];

		$this->assertNotNull( $radio_field_block->render_callback );
		$this->assertTrue( function_exists( $radio_field_block->render_callback ) );

	}

	public function test_radio_field_block_rendered_output() {
		$attributes = array(
			'label'   => 'Test Radio Label',
			'options' => array( 'Option 1', 'Option 2' ),
		);

		$rendered_output = coblocks_render_field_radio_block( $attributes );

		$this->assertStringContainsString( '<legend class="coblocks-label">', $rendered_output );
		$this->assertStringContainsString( 'Test Radio Label', $rendered_output );

		$this->assertStringContainsString( '<input id="', $rendered_output );
		$this->assertStringContainsString( 'type="radio"', $rendered_output );
		$this->assertStringContainsString( 'name="field-', $rendered_output );
		$this->assertStringContainsString( 'class="radio"', $rendered_output );

		$this->assertStringContainsString( '<label class="coblocks-radio-label" for="', $rendered_output );
		$this->assertStringContainsString( '>Option 1</label>', $rendered_output );
		$this->assertStringContainsString( '>Option 2</label>', $rendered_output );
	}

	/**
	 * Test the inline radio field markup is as expected
	 */
	public function test_render_field_radio_inline() {

		$rendered_output = coblocks_render_field_radio_block(
			array(
				'options'  => array(
					'option-1' => 'Option 1',
					'option-2' => 'Option 2',
				),
				'isInline' => true,
			),
			''
		);

		$this->assertStringContainsString( '<div class="coblocks--inline">', $rendered_output );

	}

	/**
	 * Test the radio field markup is as expected, when no options are passed in
	 */
	public function test_render_field_radio_empty_options() {

		$this->assertEquals(
			coblocks_render_field_radio_block(
				array(
					'options' => array(),
				),
				''
			),
			null
		);

	}

}
