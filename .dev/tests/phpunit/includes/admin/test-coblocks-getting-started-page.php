<?php
/**
 * Test includes/admin/coblocks-getting-started-page.php
 *
 * @package CoBlocks
 */
class CoBlocks_Getting_Started_Page_Tests extends WP_UnitTestCase {

	private $coblocks_getting_started_page;

	public function setUp() {

		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-getting-started-page.php';

		$this->coblocks_getting_started_page = new CoBlocks_Getting_Started_Page();

		wp_set_current_user( self::factory()->user->create( array( 'role' => 'administrator' ) ) );
		
		set_current_screen( 'tools_page_coblocks-getting-started' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the constructor actions are hooked properly
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'admin_menu', 'screen_page' ],
			[ 'activated_plugin', 'redirect' ],
			[ 'admin_enqueue_scripts', 'load_style', 100 ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_getting_started_page, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test that the admin page is registered correctly
	 */
	public function test_screen_page() {

		$this->coblocks_getting_started_page->screen_page();

		$this->assertEquals( 'http://example.org/wp-admin/tools.php?page=coblocks-getting-started', menu_page_url( 'coblocks-getting-started', false ) );
	}

	/**
	 * Test that the getting started page styles are enqueued
	 */
	public function test_load_style_styles() {

		$this->coblocks_getting_started_page->load_style();

		do_action( 'wp_enqueue_scripts' );

		global $wp_styles;

		$expected_styles = [
			'coblocks-getting-started',
		];

		foreach ( $expected_styles as $coblocks_style ) {

			if ( ! array_key_exists( $coblocks_style, $wp_styles->registered ) ) {

				$this->fail( "$coblocks_style style is not registered." );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test that the getting started page scripts are enqueued
	 */
	public function test_load_style_scripts() {

		$this->coblocks_getting_started_page->load_style();

		do_action( 'wp_enqueue_scripts' );

		global $wp_scripts;

		$expected_scripts = [
			'coblocks-lity',
		];

		foreach ( $expected_scripts as $coblocks_script ) {

			if ( ! array_key_exists( $coblocks_script, $wp_scripts->registered ) ) {

				$this->fail( "$coblocks_script script is not registered." );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test that the page content is rendered correctly
	 */
	public function test_content() {

		$this->expectOutputRegex(
			'/You&#039;ve just added lots of useful blocks and a new page builder toolkit to the WordPress editor. CoBlocks gives you a game-changing set of features: <strong> tens of blocks<\/strong>, a <strong> page-builder experience <\/strong> and <strong> custom typography controls<\/strong>./',
			$this->coblocks_getting_started_page->content()
		);

	}

	/**
	 * Test the plugin redirects properly
	 */
	public function test_redirect() {

		$this->markTestSkipped( 'Todo: Figure out how to properly test the redirection.' );

	}
}
