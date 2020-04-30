<?php
/**
 * Test includes/class-coblocks-block-assets.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Assets_Tests extends WP_UnitTestCase {

	private $coblocks_block_assets;

	public function setUp() {

		parent::setUp();

		$this->coblocks_block_assets = new CoBlocks_Block_Assets();

		set_current_screen( 'dashboard' );

	}

	public function tearDown() {

		parent::tearDown();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_block_assets );
		$new_reflection = new CoBlocks_Block_Assets();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$object = $new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue( 'instance' ), 'CoBlocks_Block_Assets' ) );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$reflection     = new ReflectionClass( $this->coblocks_block_assets );
		$new_reflection = new CoBlocks_Block_Assets();

		$actions = [
			[ 'enqueue_block_assets', 'block_assets' ],
			[ 'init', 'editor_assets' ],
			[ 'wp_enqueue_scripts', 'frontend_scripts' ],
			[ 'the_post', 'frontend_scripts' ],
		];

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], [ $this->coblocks_block_assets, $action_data[1] ] ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the block assets enqueue correctly
	 */
	public function test_block_assets() {

		$this->coblocks_block_assets->block_assets();

		global $wp_styles;

		$this->assertTrue( array_key_exists( 'coblocks-editor', $wp_styles->registered ) );

	}

	/**
	 * Test the editor asset styles enqueue correctly
	 */
	public function test_editor_assets_styles() {

		$this->coblocks_block_assets->editor_assets();

		global $wp_styles;

		$this->assertTrue( array_key_exists( 'coblocks-editor', $wp_styles->registered ) );

	}

	/**
	 * Test the editor asset scripts enqueue correctly
	 */
	public function test_editor_assets_scripts() {

		$this->coblocks_block_assets->editor_assets();

		global $wp_scripts;

		$this->assertTrue( array_key_exists( 'coblocks-editor', $wp_scripts->registered ) );

	}

	/**
	 * Test the editor asset scripts localized data
	 */
	public function test_editor_assets_localized_data() {

		$this->coblocks_block_assets->editor_assets();

		global $wp_scripts;

		$this->assertRegExp( '/admin@example.org/', $wp_scripts->registered['coblocks-editor']->extra['data'] );

	}

	public function test_block_assets_not_loaded_when_no_coblocks_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post( [
			'post_author'  => 1,
			'post_content' => 'NoBlocks',
			'post_title'   => 'NoBlocks',
			'post_status'  => 'publish',
		] );

		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertNotContains( 'coblocks-frontend', $wp_styles->queue );
	}

	public function test_block_assets_loaded_with_coblocks_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post( [
			'post_author'  => 1,
			'post_content' => '<!-- wp:coblocks/hasblocks --><!-- /wp:coblocks/hasblocks -->',
			'post_title'   => 'CoBlocks',
			'post_status'  => 'publish',
		] );

		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
	}

	/**
	 * Test the frontend scripts masonry are enqueued correctly
	 */
	public function test_frontend_scripts_masonry() {

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/gallery-masonry --><!-- /wp:coblocks/gallery-masonry -->',
				'post_title'   => 'CoBlocks Masonry',
				'post_status'  => 'publish',
			]
		);

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_block_assets->frontend_scripts();

		do_action( 'wp_enqueue_scripts' );

		$wp_scripts = wp_scripts();

		$this->assertContains( 'coblocks-masonry', $wp_scripts->queue );

	}

	/**
	 * Test the frontend scripts carousel are enqueued correctly
	 */
	public function test_frontend_scripts_carousel() {

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/gallery-carousel --><!-- /wp:coblocks/gallery-carousel -->',
				'post_title'   => 'CoBlocks Carousel',
				'post_status'  => 'publish',
			]
		);

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_block_assets->frontend_scripts();

		do_action( 'wp_enqueue_scripts' );

		$wp_scripts = wp_scripts();

		$this->assertContains( 'coblocks-flickity', $wp_scripts->queue );

	}
}
