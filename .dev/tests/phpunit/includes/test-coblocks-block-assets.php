<?php
/**
 * Test includes/class-coblocks-block-assets.php
 *
 * @package CoBlocks
 */
class CoBlocks_Block_Assets_Tests extends WP_UnitTestCase {

	private $coblocks_block_assets;

	public function set_up(): void {

		parent::set_up();

		$this->coblocks_block_assets = new CoBlocks_Block_Assets();

		set_current_screen( 'dashboard' );

		// Reset queued scripts and styles.
		global $wp_scripts, $wp_styles;
		$wp_scripts = new WP_Scripts();
		$wp_styles  = new WP_Styles();
	}

	public function tear_down(): void {

		parent::tear_down();

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

		$this->assertTrue( is_a( $instance->getValue(), 'CoBlocks_Block_Assets' ) );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$reflection     = new ReflectionClass( $this->coblocks_block_assets );
		$new_reflection = new CoBlocks_Block_Assets();

		$actions = array(
			array( 'enqueue_block_assets', 'block_assets' ),
			array( 'enqueue_block_editor_assets', 'editor_assets' ),
			array( 'wp_enqueue_scripts', 'frontend_scripts' ),
		);

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], array( $this->coblocks_block_assets, $action_data[1] ) ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the editor asset styles enqueue correctly
	 */
	public function test_editor_assets_styles() {
		global $wp_styles;

		$this->go_to( '/wp-admin/post-new.php' );
		$this->coblocks_block_assets->editor_assets();

		$this->assertTrue( array_key_exists( 'coblocks-editor', $wp_styles->registered ) );
	}

	/**
	 * Test the editor asset scripts enqueue correctly
	 */
	public function test_editor_assets_scripts() {
		global $wp_scripts;

		$this->go_to( '/wp-admin/post-new.php' );
		$this->coblocks_block_assets->editor_assets();

		$this->assertTrue( array_key_exists( 'coblocks-editor', $wp_scripts->registered ) );

		$path  = dirname( __FILE__ ) . '/../../../../dist/coblocks-*.js';
		$files = glob( $path );

		foreach($files as $file) {
			$dist_script = end(
				explode('/',
					explode('.',
						$file
					)[0]
				)
			);

			if ( $dist_script == 'coblocks-plugin-deactivation' ) {
				$this->assertFalse( array_key_exists( $dist_script, $wp_scripts->registered  ) );
				continue;
			}

			if ( $dist_script === 'coblocks-extensions' ) {
				$dist_script = 'coblocks-editor';
			}

			$this->assertTrue( array_key_exists( $dist_script, $wp_scripts->registered  ) );
		}
	}

	/**
	 * Test the editor asset scripts localized data
	 */
	public function test_editor_assets_localized_data() {
		global $wp_scripts;

		$this->coblocks_block_assets->editor_assets();

		$this->assertMatchesRegularExpression( '/admin@example.org/', $wp_scripts->registered['coblocks-editor']->extra['data'] );
	}

	public function test_block_assets_not_loaded_when_no_coblocks_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => 'NoBlocks',
				'post_title'   => 'NoBlocks',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertNotContains( 'coblocks-frontend', $wp_styles->queue );
	}

	public function test_block_assets_loaded_with_coblocks_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/hasblocks /-->',
				'post_title'   => 'CoBlocks',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue ); // Should have animation
	}

	public function test_block_assets_loaded_with_any_reusable_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:block /-->',
				'post_title'   => 'CoBlocks',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
	}

	public function test_block_assets_loaded_on_archive_pages() {
		global $wp_styles;
		unset( $GLOBALS['current_screen'] );

		$this->go_to( '/?cat=1' );

		$this->assertTrue( is_archive() );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
	}

	public function test_block_assets_loaded_with_core_image_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/image
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/image /-->',
				'post_title'   => 'Core Image Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );

	}

	public function test_typography_styles_loaded_with_core_button_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/button
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/button /-->',
				'post_title'   => 'Core Button Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_cover_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/cover
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/cover /-->',
				'post_title'   => 'Core Cover Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_heading_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/heading
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/heading /-->',
				'post_title'   => 'Core Heading Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_list_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/list
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/list /-->',
				'post_title'   => 'Core List Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_paragraph_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/paragraph
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/paragraph /-->',
				'post_title'   => 'Core Paragraph Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_pullquote_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/pullquote
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/pullquote /-->',
				'post_title'   => 'Core Pullquote Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}

	public function test_typography_styles_loaded_with_core_quote_block() {
		global $post, $wp_styles;
		unset( $GLOBALS['current_screen'] );

		// core/quote
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:core/quote /-->',
				'post_title'   => 'Core Quote Block',
				'post_status'  => 'publish',
			)
		);

		$this->go_to( "/?p={$post_id}" );
		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		do_action( 'enqueue_block_assets' );

		// Core blocks should also have coblocks-animation.
		$this->assertContains( 'coblocks-frontend', $wp_styles->queue );
		$this->assertContains( 'coblocks-animation', $wp_styles->queue );
		$this->assertContains( 'coblocks-extensions', $wp_styles->queue );
	}
}
