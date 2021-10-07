<?php
/**
 * Test includes/class-coblocks-register-blocks.php
 *
 * @package CoBlocks
 */
class CoBlocks_Register_Blocks_Tests extends WP_UnitTestCase {

	private $coblocks_register_blocks;

	public function setUp() {

		parent::setUp();

		set_current_screen( 'dashboard' );

		$this->coblocks_register_blocks = new CoBlocks_Register_Blocks();

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_register_blocks );
		$new_reflection = new CoBlocks_Register_Blocks();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue(), 'CoBlocks_Register_Blocks' ) );

	}

	/**
	 * Test the constructor properties
	 */
	public function test_construct_properties() {

		$reflection     = new ReflectionClass( $this->coblocks_register_blocks );
		$new_reflection = new CoBlocks_Register_Blocks();

		$expected = [
			'slug' => 'coblocks',
		];

		$slug = $reflection->getProperty( 'slug' );

		$slug->setAccessible( true );

		$check = [
			'slug' => $slug->getValue( $new_reflection ),
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'init', 'register_blocks', 99 ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_register_blocks, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test CoBlocks blocks are register correctly
	 *
	 * @expectedIncorrectUsage WP_Block_Type_Registry::register
	 */
	public function test_register_blocks() {

		$this->coblocks_register_blocks->register_blocks();

		$expected_registered_blocks = [
			'coblocks/accordion',
			'coblocks/alert',
			'coblocks/author',
			'coblocks/click-to-tweet',
			'coblocks/dynamic-separator',
			'coblocks/gif',
			'coblocks/highlight',
			'coblocks/gallery-carousel',
			'coblocks/gallery-masonry',
			'coblocks/gallery-stacked',
		];

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $expected_registered_blocks as $coblocks_block ) {

			if ( ! array_key_exists( $coblocks_block, $registered_blocks ) ) {

				$this->fail( "$coblocks_block is not registered." );

			}
		}

		$this->assertTrue( true );

	}
}
