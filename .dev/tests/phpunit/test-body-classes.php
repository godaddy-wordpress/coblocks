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

		$this->markTestSkipped( 'Todo: Write tests theme slug.' );

	}

	/**
	 * Test the body class matches the theme
	 */
	public function test_body_class() {

		$this->markTestSkipped( 'Todo: Write tests for theme slug body class.' );

	}

	/**
	 * Test the admin body class is set properly
	 */
	public function test_admin_body_class() {

		$this->markTestSkipped( 'Todo: Write tests for the admin body class.' );

	}
}
