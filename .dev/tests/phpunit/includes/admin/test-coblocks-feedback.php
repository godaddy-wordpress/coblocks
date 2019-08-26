<?php
/**
 * Test includes/admin/coblocks-feedback.php
 *
 * @package CoBlocks
 */
class CoBlocks_Feedback_Tests extends WP_UnitTestCase {

	private $coblocks_feedback;

	public function setUp() {

		parent::setUp();

		include_once COBLOCKS_PLUGIN_DIR . 'includes/admin/class-coblocks-feedback.php';

		$this->coblocks_feedback = new CoBlocks_Feedback(
			[
				'slug'       => 'coblocks_plugin_feedback',
				'name'       => 'CoBlocks',
				'time_limit' => WEEK_IN_SECONDS,
			]
		);

		set_current_screen( 'plugins' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the constructor properties are set properly
	 */
	public function test_construct_properties() {

		$reflection     = new ReflectionClass( $this->coblocks_feedback );
		$new_reflection = new CoBlocks_Feedback(
			[
				'slug'       => 'coblocks_plugin_feedback',
				'name'       => 'CoBlocks',
				'time_limit' => '123',
			]
		);

		$expected = [
			'name'         => 'CoBlocks',
			'slug'         => 'coblocks_plugin_feedback',
			'date_option'  => 'coblocks_plugin_feedback_activation_date',
			'nobug_option' => 'coblocks_plugin_feedback_no_bug',
			'time_limit'   => '123',
		];

		$name         = $reflection->getProperty( 'name' );
		$slug         = $reflection->getProperty( 'slug' );
		$date_option  = $reflection->getProperty( 'date_option' );
		$nobug_option = $reflection->getProperty( 'nobug_option' );
		$time_limit   = $reflection->getProperty( 'time_limit' );

		$name->setAccessible( true );
		$slug->setAccessible( true );
		$date_option->setAccessible( true );
		$nobug_option->setAccessible( true );
		$time_limit->setAccessible( true );

		$check = [
			'name'         => $name->getValue( $new_reflection ),
			'slug'         => $slug->getValue( $new_reflection ),
			'date_option'  => $date_option->getValue( $new_reflection ),
			'nobug_option' => $nobug_option->getValue( $new_reflection ),
			'time_limit'   => $time_limit->getValue( $new_reflection ),
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the constructor properties are set properly
	 */
	public function test_construct_properties_no_timelimit() {

		$reflection     = new ReflectionClass( $this->coblocks_feedback );
		$new_reflection = new CoBlocks_Feedback(
			[
				'slug' => 'coblocks_plugin_feedback',
				'name' => 'CoBlocks',
			]
		);

		$expected = [
			'time_limit' => WEEK_IN_SECONDS,
		];

		$time_limit = $reflection->getProperty( 'time_limit' );

		$time_limit->setAccessible( true );

		$check = [
			'time_limit' => WEEK_IN_SECONDS,
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the constructor actions are hooked properly
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'admin_init', 'check_installation_date' ],
			[ 'admin_init', 'set_no_bug', 5 ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_feedback, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test converting seconds to a human readable time - year
	 */
	public function test_seconds_to_words_year() {

		$this->assertEquals( 'a year', $this->coblocks_feedback->seconds_to_words( YEAR_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - week
	 */
	public function test_seconds_to_words_week() {

		$this->assertEquals( 'a week', $this->coblocks_feedback->seconds_to_words( WEEK_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - day
	 */
	public function test_seconds_to_words_day() {

		$this->assertEquals( 'a day', $this->coblocks_feedback->seconds_to_words( DAY_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - hour
	 */
	public function test_seconds_to_words_hour() {

		$this->assertEquals( 'an hour', $this->coblocks_feedback->seconds_to_words( HOUR_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - minute
	 */
	public function test_seconds_to_words_minute() {

		$this->assertEquals( 'a minute', $this->coblocks_feedback->seconds_to_words( MINUTE_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - second
	 */
	public function test_seconds_to_words_second() {

		$this->assertEquals( 'a second', $this->coblocks_feedback->seconds_to_words( 1 ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 years
	 */
	public function test_seconds_to_words_year_multiple() {

		$this->assertEquals( '2 years', $this->coblocks_feedback->seconds_to_words( 2 * YEAR_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 weeks
	 */
	public function test_seconds_to_words_week_multiple() {

		$this->assertEquals( '2 weeks', $this->coblocks_feedback->seconds_to_words( 2 * WEEK_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 days
	 */
	public function test_seconds_to_words_day_multiple() {

		$this->assertEquals( '2 days', $this->coblocks_feedback->seconds_to_words( 2 * DAY_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 hours
	 */
	public function test_seconds_to_words_hour_multiple() {

		$this->assertEquals( '2 hours', $this->coblocks_feedback->seconds_to_words( 2 * HOUR_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 minutes
	 */
	public function test_seconds_to_words_minute_multiple() {

		$this->assertEquals( '2 minutes', $this->coblocks_feedback->seconds_to_words( 2 * MINUTE_IN_SECONDS ) );

	}

	/**
	 * Test converting seconds to a human readable time - 2 seconds
	 */
	public function test_seconds_to_words_second_multiple() {

		$this->assertEquals( '2 seconds', $this->coblocks_feedback->seconds_to_words( 2 ) );

	}

	/**
	 * Test converting seconds to a human readable time - invalid
	 */
	public function test_seconds_to_words_invalid() {

		$this->assertNull( $this->coblocks_feedback->seconds_to_words( 'abc' ) );

	}

	/**
	 * Test the installation date is set
	 */
	public function test_check_installation_date_set() {

		delete_site_option( 'coblocks_plugin_feedback_no_bug' );
		delete_site_option( 'coblocks_plugin_feedback_activation_date' );

		$this->coblocks_feedback->check_installation_date();

		$this->assertNotFalse( get_site_option( 'coblocks_plugin_feedback_activation_date' ) );

	}

	/**
	 * Test the installation date actions are hooked properly
	 */
	public function test_check_installation_date_actions() {

		$coblocks_feedback = new CoBlocks_Feedback(
			[
				'slug'       => 'coblocks_plugin_feedback',
				'name'       => 'CoBlocks',
				'time_limit' => -1,
			]
		);

		delete_site_option( 'coblocks_plugin_feedback_no_bug' );
		delete_site_option( 'coblocks_plugin_feedback_activation_date' );

		$coblocks_feedback->check_installation_date();

		$actions = [
			[ 'admin_notices', 'display_admin_notice' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $coblocks_feedback, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks_Feedback:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the admin notice markup returns correctly
	 */
	public function test_display_admin_notice() {

		$this->expectOutputRegex( '/<div class="coblocks-notice-content">(\s*)<h3>Are you enjoying CoBlocks\?<\/h3>/', $this->coblocks_feedback->display_admin_notice() );

	}

	/**
	 * Test the admin notice does not display when not on the appropriate page
	 */
	public function test_display_admin_notice_null() {

		unset( $GLOBALS['current_screen'] );

		$this->assertNull( $this->coblocks_feedback->display_admin_notice() );

	}

	/**
	 * Test that coblocks_plugin_feedback_no_bug setting does not get set when conditions are not met
	 */
	public function test_set_no_bug_null() {

		$this->coblocks_feedback->set_no_bug();

		$this->assertFalse( get_site_option( 'coblocks_plugin_feedback_no_bug' ) );

	}

	/**
	 * Test that coblocks_plugin_feedback_no_bug setting gets set when the conditions are met
	 */
	public function test_set_no_bug() {

		wp_set_current_user( 1 );

		$_GET['_wpnonce']                        = wp_create_nonce( 'coblocks-feedback-nounce' );
		$_GET['coblocks_plugin_feedback_no_bug'] = 1;

		$this->coblocks_feedback->set_no_bug();

		$this->assertTrue( get_site_option( 'coblocks_plugin_feedback_no_bug' ) );

	}
}
