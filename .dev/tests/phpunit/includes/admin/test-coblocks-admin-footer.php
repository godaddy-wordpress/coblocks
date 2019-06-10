<?php
/**
 * Test includes/admin/class-coblocks-admin-footer.php
 *
 * @package CoBlocks
 */
class Admin_Footer_Tests extends WP_UnitTestCase {

	private $coblocks_admin_footer;

	public function setUp() {

		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-admin-footer.php';

		$this->coblocks_admin_footer = new CoBlocks_Admin_Footer();

		set_current_screen( 'edit-post' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'admin_footer_text', 'admin_footer_text' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_admin_footer, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test WordPress admin footer text returns default string when not on appropriate page
	 */
	public function test_admin_footer_text_default() {

		$this->assertEquals( 'Default Footer Text', $this->coblocks_admin_footer->admin_footer_text( 'Default Footer Text' ) );

	}

	/**
	 * Test WordPress admin footer text returns correct when on an appropriate page
	 */
	public function test_admin_footer_text() {

		global $pagenow;

		$pagenow = 'edit.php';

		$this->assertEquals( 'Thank you for using <a href="https://coblocks.com/" target="_blank">CoBlocks</a>! Please <a href="https://wordpress.org/support/plugin/coblocks/reviews/?filter=5" target="_blank">rate us on WordPress.org</a>.', $this->coblocks_admin_footer->admin_footer_text( 'Default Footer Text' ) );

	}
}
