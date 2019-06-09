<?php
/**
 * Test includes/class-coblocks-body-classes.php
 *
 * @package CoBlocks
 */
class Body_Classes_Tests extends WP_UnitTestCase {

	private $coblocks_body_classes;

	public function setUp() {

		parent::setUp();

		$this->coblocks_body_classes = new CoBlocks_Body_Classes();

		set_current_screen( 'dashboard' );

	}

	public function tearDown() {

		parent::tearDown();

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct() {

		$actions = [
			[ 'body_class', 'body_class' ],
			[ 'admin_body_class', 'admin_body_class' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_body_classes, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}
}
