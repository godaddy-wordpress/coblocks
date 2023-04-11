<?php
/**
 * Test includes/class-coblocks-font-loader.php
 *
 * @package CoBlocks
 */
class CoBlocks_Font_Loader_Tests extends WP_UnitTestCase {

	private $coblocks_font_loader;

	public function set_up(): void {

		parent::set_up();

		$this->coblocks_font_loader = new CoBlocks_Font_Loader();

		set_current_screen( 'dashboard' );

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_font_loader );
		$new_reflection = new CoBlocks_Font_Loader();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue(), 'CoBlocks_Font_Loader' ) );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = array(
			array( 'wp_enqueue_scripts', 'fonts_loader' ),
			array( 'admin_enqueue_scripts', 'fonts_loader' ),
		);

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], array( $this->coblocks_font_loader, $action_data[1] ) ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the font loader
	 */
	public function test_font_loader() {

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => 'Font Loader Test',
				'post_title'   => 'Font Loader Test',
				'post_status'  => 'publish',
			)
		);

		update_post_meta( $post_id, '_coblocks_attr', 'Roboto,Lato' );

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_font_loader->fonts_loader();

		global $wp_styles;

		$this->assertTrue( array_key_exists( 'coblocks-block-fonts', $wp_styles->registered ) );

	}
}
