<?php
/**
 * Test includes/admin/class-coblocks-action-links.php
 *
 * @package CoBlocks
 */
class CoBlocks_Action_Links_Tests extends WP_UnitTestCase {

	private $coblocks_action_links;

	public function set_up(): void {

		parent::set_up();

		set_current_screen( 'dashboard' );

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-action-links.php';

		$this->coblocks_action_links = new CoBlocks_Action_Links();

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'plugin_row_meta', 'plugin_row_meta', 10 ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_action_links, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test plugin row meta is not appended to non CoBlocks plugins
	 */
	public function test_plugin_row_meta_non_coblocks() {

		$this->assertFalse( array_key_exists( 'review', $this->coblocks_action_links->plugin_row_meta( [], 'some-plugin' ) ) );

	}

	/**
	 * Test CoBlocks plugin row meta
	 */
	public function test_plugin_row_meta() {

		$this->assertTrue( array_key_exists( 'review', $this->coblocks_action_links->plugin_row_meta( [], COBLOCKS_PLUGIN_BASE ) ) );

	}
}
