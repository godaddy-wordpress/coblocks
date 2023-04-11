<?php
/**
 * Test includes/class-coblocks-form.php
 *
 * @package CoBlocks
 */
class CoBlocks_Form_Block_Tests extends WP_UnitTestCase {

	private $coblocks_form;

	public function setUp(): void {

		parent::setUp();

		$this->coblocks_form = new CoBlocks_Form();

		set_current_screen( 'dashboard' );

	}

	public function tearDown(): void {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the form markup is as expected
	 */
	public function test_render_form() {

		update_option( 'coblocks_google_recaptcha_site_key', '123' );
		update_option( 'coblocks_google_recaptcha_secret_key', '123' );

		$this->expectOutputRegex( '/<div class="coblocks-form" id="(.*?)">/' );

		echo coblocks_render_form_block( array(), '<!-- wp:coblocks/form --><!-- wp:coblocks/field-name --><!-- /wp:coblocks/field-name --><!-- wp:coblocks/field-email --><!-- /wp:coblocks/field-email --><!-- wp:coblocks/field-textarea --><!-- /wp:coblocks/field-textarea --><!-- /wp:coblocks/form -->' );

	}

	/**
	 * Test the form submission works as expected
	 */
	public function test_process_form_submission() {

		$this->markTestSkipped( 'Todo: Figure out how to set the global $_POST to simulate a form submission.' );

	}

	/**
	 * Test the html email headers return as expected
	 */
	public function test_enable_html_email() {

		$this->assertEquals( $this->coblocks_form->enable_html_email(), 'text/html' );

	}

	/**
	 * Test the success message markup returns as expected
	 */
	public function test_success_message() {

		$this->expectOutputRegex( '/<div class="coblocks-form__submitted">Your message was sent: <\/div>/' );

		$this->coblocks_form->success_message( array( 'successText' => $this->coblocks_form->default_success_text() ) );

	}

	/**
	 * Test the recaptcha verifies
	 */
	public function test_verify_recaptcha() {

		$this->markTestSkipped( 'Todo: Figure out how to test the recaptcha verification checks.' );

	}

	/**
	 * Test the field label markup is as expected
	 */
	public function test_render_field_label() {

		$this->expectOutputRegex( '/<label class="coblocks-label">Field Label <span class="required">&#042;<\/span><\/label>/' );

		$atts = array(
			'label'    => 'Field Label',
			'required' => true,
		);

		$this->coblocks_form = new CoBlocks_Form();

		echo $this->coblocks_form::render_field_label( $atts, '' );

	}
}
