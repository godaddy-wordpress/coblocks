<?php
/**
 * Test WPIcons Pro base plugin file
 *
 * @package WPIcons Pro Pro
 * @since 2.0.0
 */

class Block_Settings_Tests extends WP_UnitTestCase {

	private $coblocks_block_settings;

	public function setUp() {

		parent::setUp();

		$this->coblocks_block_settings = new CoBlocks_Block_Settings();

		set_current_screen( 'dashboard' );

	}

	public function tearDown() {

		parent::tearDown();

	}

	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_block_settings );
		$new_reflection = new CoBlocks_Block_Settings();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$object = $new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue( 'instance' ), 'CoBlocks_Block_Settings' ) );

	}
}
