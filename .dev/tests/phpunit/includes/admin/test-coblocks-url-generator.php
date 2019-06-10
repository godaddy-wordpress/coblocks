<?php
/**
 * Test includes/admin/class-coblocks-url-generator.php
 *
 * @package CoBlocks
 */
class CoBlocks_URL_Generator_Tests extends WP_UnitTestCase {

	private $coblocks_install;

	public function setUp() {

		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-url-generator.php';

		$this->coblocks_url_generator = new CoBlocks_URL_Generator();

		set_current_screen( 'edit-post' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the affiliate ID returns correctly
	 */
	public function test_get_affiliate_id() {

		$this->assertEquals( [ 'ref' => null ], $this->coblocks_url_generator->get_affiliate_id() );

	}

	/**
	 * Test the affiliate ID returns correctly when filtered
	 */
	public function test_get_affiliate_id_filtered() {

		add_filter(
			'coblocks_affiliate_id',
			function( $affiliate_id ) {
				return 1;
			}
		);

		$this->assertEquals( [ 'ref' => 1 ], $this->coblocks_url_generator->get_affiliate_id() );

	}

	/**
	 * Test the store URL returns as expected
	 */
	public function test_get_store_url() {

		$this->assertEquals( 'https://coblocks.com/?', $this->coblocks_url_generator->get_store_url() );

	}

	/**
	 * Test the store URL returns as expected when a custom path is specified
	 */
	public function test_get_store_url_with_path() {

		$this->assertEquals( 'https://coblocks.com/pricing/?', $this->coblocks_url_generator->get_store_url( 'pricing' ) );

	}

	/**
	 * Test the store URL returns as expected when custom params are specified
	 */
	public function test_get_store_url_with_params() {

		$this->assertEquals( 'https://coblocks.com/?custom=param', $this->coblocks_url_generator->get_store_url( '', [ 'custom' => 'param' ] ) );

	}

	/**
	 * Test the store URL returns as expected when a custom path and custom params are specified
	 */
	public function test_get_store_url_with_path_and_params() {

		$this->assertEquals( 'https://coblocks.com/pricing/?custom=param', $this->coblocks_url_generator->get_store_url( 'pricing', [ 'custom' => 'param' ] ) );

	}
}
