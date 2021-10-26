<?php
/**
 * Test includes/admin/class-coblocks-url-generator.php
 *
 * @package CoBlocks
 */
class CoBlocks_Social_Index_Tests extends WP_UnitTestCase {

	private $thumbnail_id;

	public function setUp() {
		parent::setUp();
		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/share/index.php';
		set_current_screen( 'edit-post' );
	}

	public function tearDown() {
		parent::tearDown();
		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test the file actions are hooked properly
	 */
	public function test_file_actions() {
		$actions = [
			[ 'init', 'coblocks_register_share_block' ],
		];

		foreach ( $actions as $action_data ) {
			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], $action_data[1] ) ) {
				$this->fail( "$action_data[0] is not attached to $action_data[1]." );
			}
		}

		$this->assertTrue( true );
	}
}
