<?php
/**
 * Test includes/class-coblocks-post-meta.php
 *
 * @package CoBlocks
 */
class CoBlocks_Post_Meta_Tests extends WP_Test_REST_TestCase {

	private $coblocks_post_meta;

	protected static $post_id;

	private $server;

	public static function wpSetUpBeforeClass( $factory ) {

		self::$post_id = $factory->post->create( array( 'post_type' => 'post' ) );

	}

	public static function wpTearDownAfterClass() {

		wp_delete_post( self::$post_id, true );

	}

	public function set_up() {

		parent::set_up();

		set_current_screen( 'dashboard' );

		$this->coblocks_post_meta = new CoBlocks_Post_Meta();

		$this->coblocks_post_meta->register_meta();

		/** @var WP_REST_Server $wp_rest_server */
		global $wp_rest_server;

		$this->server   = new Spy_REST_Server();
		$wp_rest_server = $this->server;

		do_action( 'rest_api_init' );

	}

	public function tear_down() {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'init', 'register_meta' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_post_meta, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the post meta is registered correctly
	 */
	public function test_register_meta() {

		$atts = [
			'_coblocks_attr'                 => 'testvalue',
			'_coblocks_dimensions'           => 'testvalue',
			'_coblocks_dimensions'           => 'testvalue',
			'_coblocks_accordion_ie_support' => 'testvalue',
		];

		foreach ( $atts as $attribute => $value ) {

			add_post_meta( self::$post_id, $attribute, $value );

		}

		$request  = new WP_REST_Request( 'GET', sprintf( '/wp/v2/posts/%d', self::$post_id ) );
		$response = $this->server->dispatch( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'meta', $data );

		$meta = (array) $data['meta'];

		foreach ( $atts as $attribute => $value ) {

			if ( ! array_key_exists( $attribute, $meta ) ) {

				$this->fail( "$attribute was not registered correctly." );

			}

			if ( $value !== $meta[ $attribute ] ) {

				$this->fail( "$attribute value was not set correctly." );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the authentication callback returns true for appropriate users
	 */
	public function test_auth_callback_true() {

		wp_set_current_user( 1 );

		$reflection_method = new ReflectionMethod( 'CoBlocks_Post_Meta', 'auth_callback' );

		$reflection_method->setAccessible( true );

		$this->assertTrue( $reflection_method->invoke( new CoBlocks_Post_Meta() ) );

	}

	/**
	 * Test the authentication callback returns false
	 */
	public function test_auth_callback_false() {

		$reflection_method = new ReflectionMethod( 'CoBlocks_Post_Meta', 'auth_callback' );

		$reflection_method->setAccessible( true );

		$this->assertFalse( $reflection_method->invoke( new CoBlocks_Post_Meta() ) );

	}
}
