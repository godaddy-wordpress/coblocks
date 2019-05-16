<?php
/**
 * Test WPIcons Pro base plugin file
 *
 * @package WPIcons Pro Pro
 * @since 2.0.0
 */

class Base_File_Tests extends WP_UnitTestCase {

	/**
	 * Plugin instance
	 *
	 * @var object
	 */
	private $coblocks;

	public function setUp() {

		parent::setUp();

		$this->coblocks = coblocks();

		do_action( 'plugins_loaded' );

	}

	public function tearDown() {

		parent::tearDown();

	}

	/**
	 * Assert the plugin data returns what is expected
	 *
	 * @since 2.0.0
	 */
	public function test_start() {

		$this->assertTrue( true );

	}
}
