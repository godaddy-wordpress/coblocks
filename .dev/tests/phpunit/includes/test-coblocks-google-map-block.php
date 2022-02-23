<?php
/**
 * Test includes/class-coblocks-google-map-block.php
 *
 * @package CoBlocks
 */
class CoBlocks_Google_Map_Block_Tests extends WP_UnitTestCase {

	private $coblocks_google_map_block;

	public function set_up() {

		parent::set_up();

		set_current_screen( 'dashboard' );

		$this->coblocks_google_map_block = new CoBlocks_Google_Map_Block();

	}

	public function tear_down() {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_google_map_block );
		$new_reflection = new CoBlocks_Google_Map_Block();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue(), 'CoBlocks_Google_Map_Block' ) );

	}

	/**
	 * Test the constructor constants
	 */
	public function test_construct_constants() {

		$reflection     = new ReflectionClass( $this->coblocks_google_map_block );
		$new_reflection = new CoBlocks_Google_Map_Block();

		$expected = [
			'slug'    => 'coblocks',
			'url'     => str_replace( '/.dev/tests/phpunit', '', untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) ) ), // Fix inconsistencies path between plugin and unit tests
		];

		$slug = $reflection->getProperty( 'slug' );
		$url  = $reflection->getProperty( 'url' );

		$slug->setAccessible( true );
		$url->setAccessible( true );

		$check = [
			'slug' => $slug->getValue( $new_reflection ),
			'url'  => $url->getValue( $new_reflection ),
		];

		$this->assertEquals( $expected, $check );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = [
			[ 'wp_enqueue_scripts', 'map_assets' ],
			[ 'the_post', 'map_assets' ],
			[ 'init', 'register_settings' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_google_map_block, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the scripts enqueue correctly
	 */
	public function test_map_assets() {

		unset( $GLOBALS['current_screen'] );
		update_option( 'coblocks_google_maps_api_key', '123' );

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/map --><!-- /wp:coblocks/map -->',
				'post_title'   => 'CoBlocks Map',
				'post_status'  => 'publish',
			]
		);

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_google_map_block->map_assets();

		do_action( 'wp_enqueue_scripts' );

		$wp_scripts = wp_scripts();

		$enqueued = [
			'coblocks-google-maps',
			'coblocks-google-maps-api',
		];

		foreach ( $enqueued as $script ) {

			if ( ! array_key_exists( $script, $wp_scripts->registered ) ) {

				$this->fail( "$script was not enqueued." );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the scripts data is localized correctly
	 */
	public function test_map_assets_localized_Data() {

		update_option( 'coblocks_google_maps_api_key', '123' );

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/map --><!-- /wp:coblocks/map -->',
				'post_title'   => 'CoBlocks Map',
				'post_status'  => 'publish',
			]
		);

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_google_map_block->map_assets();

		do_action( 'wp_enqueue_scripts' );

		$wp_scripts = wp_scripts();
		$site_url = str_replace( '/', '\/', get_site_url() );

		$this->assertMatchesRegularExpression( '/var coblocksGoogleMaps = {"url":"' . $site_url . '\/wp-content\/plugins/', stripslashes_deep( $wp_scripts->registered['coblocks-google-maps']->extra['data'] ) );

	}

	/**
	 * Test the settings are registered correctly
	 */
	public function test_register_settings() {

		$this->coblocks_google_map_block->register_settings();

		$this->assertArrayHasKey( 'coblocks_google_maps_api_key', get_registered_settings() );

	}
}
