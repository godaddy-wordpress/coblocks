<?php
/**
 * Test form child block: Submit Button Block
 *
 * @package CoBlocks
 */

class CoBlocks_Submit_Button_Block_Test extends WP_UnitTestCase {

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

	public function test_submit_button_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/field-submit-button', $registered_blocks );

	}

	public function test_submit_button_block_attributes() {

		$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$submit_button_block = $registered_blocks['coblocks/field-submit-button'];

		$expected_attributes = array(
			'submitButtonText',
			'customBackgroundButtonColor',
			'customTextButtonColor',
		);

		foreach ( $expected_attributes as $attribute ) {

			$this->assertArrayHasKey( $attribute, $submit_button_block->attributes );

		}

	}

	public function test_submit_button_block_render_callback() {

		$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$submit_button_block = $registered_blocks['coblocks/field-submit-button'];

		$this->assertNotNull( $submit_button_block->render_callback );
		$this->assertTrue( function_exists( $submit_button_block->render_callback ) );

	}

	public function test_submit_button_block_rendered_output() {
		$attributes = array(
			'submitButtonText'            => 'Submit Now',
			'customBackgroundButtonColor' => '#123456',
			'customTextButtonColor'       => '#abcdef',
		);

		$rendered_output = coblocks_render_field_submit_button_block( $attributes );

		$this->assertStringContainsString( '<div class="coblocks-form__submit wp-block-button">', $rendered_output );
		$this->assertStringContainsString( '<button type="submit" class="wp-block-button__link"', $rendered_output );
		$this->assertStringContainsString( 'style="background-color: #123456; color: #abcdef;"', $rendered_output );
		$this->assertStringContainsString( '>Submit Now</button>', $rendered_output );
	}

	/**
	 * Test the field label markup is as expected
	 */
	public function test_render_field_submit_button() {

		$atts = array(
			'className'                   => 'custom-button-class',
			'customBackgroundButtonColor' => '#B4D455',
			'customTextButtonColor'       => '#333333',
		);

		$rendered_output = coblocks_render_field_submit_button_block( $atts );

		$this->assertStringContainsString( '<button type="submit" class="wp-block-button__link custom-button-class" style="background-color: #B4D455; color: #333333;">Submit</button>', $rendered_output );

	}

	/**
	 * Test the form renders a submit button if one does not exists within the innerBlocks.
	 */
	public function test_render_submit_button_if_missing_from_form() {
		$form_missing_submit_button = '<!-- wp:coblocks/form -->
			<!-- wp:coblocks/field-name /-->
			<!-- wp:coblocks/field-email /-->
			<!-- wp:coblocks/field-textarea /-->
			<!-- /wp:coblocks/form -->';

		$this->assertStringContainsString(
			'<button type="submit" class="wp-block-button__link" style="">Submit</button>',
			coblocks_render_form_block( array(), $form_missing_submit_button )
		);
	}

	/**
	 * Test the form only renders the submit button included within the innerBlocks.
	 */
	public function test_does_not_insert_submit_button_if_exists_in_form() {
		$form_has_submit_button = '<!-- wp:coblocks/form -->
			<!-- wp:coblocks/field-name /-->
			<!-- wp:coblocks/field-email /-->
			<!-- wp:coblocks/field-textarea /-->
			<!-- wp:coblocks/field-submit-button {"submitButtonText":"Contact Us"} /-->
		<!-- /wp:coblocks/form -->';

		$this->assertStringContainsString(
			'<button type="submit" class="wp-block-button__link" style="">Contact Us</button>',
			coblocks_render_form_block( array(), $form_has_submit_button )
		);
	}

}
