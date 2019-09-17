<?php
/**
 * Test includes/class-coblocks-block-settings.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Settings_Tests extends WP_UnitTestCase {

	private $coblocks_block_settings;

	public function setUp() {

		parent::setUp();

		$this->coblocks_block_settings = new CoBlocks_Block_Settings();

		set_current_screen( 'dashboard' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_block_settings );
		$new_reflection = new CoBlocks_Block_Settings();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$object = $new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue( 'instance' ), 'CoBlocks_Block_Settings' ) );

	}

	/**
	 * Test the constructor constants
	 */
	public function test_construct_constants() {

		$reflection     = new ReflectionClass( $this->coblocks_block_settings );
		$new_reflection = new CoBlocks_Block_Settings();

		$expected = [
			'version' => '1.13.0',
			'slug'    => 'coblocks',
			'url'     => str_replace( '/.dev/tests/phpunit', '', untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) ), // Fix inconsistencies path between plugin and unit tests
		];

		$version = $reflection->getProperty( '_version' );
		$slug    = $reflection->getProperty( '_slug' );
		$url     = $reflection->getProperty( '_url' );

		$version->setAccessible( true );
		$slug->setAccessible( true );
		$url->setAccessible( true );

		$check = [
			'version' => $version->getValue( $new_reflection ),
			'slug'    => $slug->getValue( $new_reflection ),
			'url'     => $url->getValue( $new_reflection ),
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$reflection     = new ReflectionClass( $this->coblocks_block_settings );
		$new_reflection = new CoBlocks_Block_Settings();

		$actions = [
			[ 'init', 'register_settings' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_block_settings, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the settings are registered correctly
	 */
	public function test_register_settings() {

		$this->coblocks_block_settings->register_settings();

		$this->assertArrayHasKey( 'coblocks_settings_api', get_registered_settings() );

	}
}
