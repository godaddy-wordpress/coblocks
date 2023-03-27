<?php
/**
 * Test includes/class-coblocks-body-classes.php
 *
 * @package CoBlocks
 */
class CoBlocks_Body_Classes_Tests extends WP_UnitTestCase {

	private $coblocks_body_classes;

	public function set_up(): void {

		parent::set_up();

		$this->coblocks_body_classes = new CoBlocks_Body_Classes();

		set_current_screen( 'dashboard' );

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

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

	/**
	 * Test the active theme is correct
	 */
	public function test_is_active_theme() {

		$this->assertTrue( $this->coblocks_body_classes->is_active_theme( 'default' ) );

	}

	/**
	 * Test the themes array returns as expected
	 */
	public function test_themes() {

		$expected = [
			'twentytwentyone',
			'twentytwenty',
			'twentynineteen',
			'twentyseventeen',
			'twentysixteen',
			'twentyfifteen',
			'twentyfourteen',
			'twentythirteen',
			'twentyeleven',
			'twentytwelve',
		];

		$this->assertEquals( $expected, $this->coblocks_body_classes->themes() );

	}

	/**
	 * Test the themes array returns as expected
	 */
	public function test_filtered_themes() {

		$expected = [
			'twentytwentyone',
			'twentytwenty',
			'twentynineteen',
			'twentyseventeen',
			'twentysixteen',
			'twentyfifteen',
			'twentyfourteen',
			'twentythirteen',
			'twentyeleven',
			'twentytwelve',
			'test',
		];

		add_filter(
			'coblocks_theme_body_classes',
			function( $themes ) {
				$themes[] = 'test';
				return $themes;
			}
		);

		$this->assertEquals( $expected, $this->coblocks_body_classes->themes() );

	}

	/**
	 * Test the theme slug returns as expected
	 */
	public function test_theme_slug() {

		add_filter(
			'template',
			function( $theme ) {
				return 'twentynineteen';
			}
		);

		$this->assertEquals( 'twentynineteen', $this->coblocks_body_classes->theme_slug() );

	}

	/**
	 * Test the body class matches the theme
	 */
	public function test_body_class() {

		add_filter(
			'template',
			function( $theme ) {
				return 'twentynineteen';
			}
		);

		$this->assertEquals( $this->coblocks_body_classes->body_class( [ 'existing' ] ), [ 'existing', 'is-twentynineteen' ] );

	}

	/**
	 * Test the admin body class returns properly when not in the dashboard
	 */
	public function test_non_admin_body_class() {

		$this->assertEquals( $this->coblocks_body_classes->admin_body_class( [ 'existing' ] ), [ 'existing' ] );

	}

	/**
	 * Test the admin body class returns properly when in the dashboard
	 */
	public function test_admin_body_class() {

		global $pagenow;

		$pagenow = 'post.php';

		add_filter(
			'template',
			function( $theme ) {
				return 'twentynineteen';
			}
		);

		$this->assertEquals( $this->coblocks_body_classes->admin_body_class( 'existing' ), 'existing is-twentynineteen' );

	}
}
