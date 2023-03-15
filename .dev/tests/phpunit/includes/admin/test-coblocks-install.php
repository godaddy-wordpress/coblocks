<?php
/**
 * Test includes/admin/class-coblocks-install.php
 *
 * @package CoBlocks
 */
class CoBlocks_Install_Tests extends WP_UnitTestCase {

	private $coblocks_install;

	public function set_up(): void {

		parent::set_up();

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-install.php';

		$this->coblocks_install = new CoBlocks_Install();

		set_current_screen( 'edit-post' );

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test that the default options are registered when the plugin is activated
	 */
	public function test_register_defaults() {

		delete_option( 'coblocks_date_installed' );

		$this->coblocks_install->register_defaults();

		$this->assertTrue( ! empty( get_option( 'coblocks_date_installed' ) ) );

	}
}
