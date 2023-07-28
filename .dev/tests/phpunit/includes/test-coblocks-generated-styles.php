<?php
/**
 * Test includes/class-coblocks-generated-styles.php
 *
 * @package CoBlocks
 */
class CoBlocks_Generated_Styles_Tests extends WP_UnitTestCase {

	private $coblocks_generated_styles;
	private $coblocks_block_assets;

	private $dimensions;

	private $responsive_height;

	public function set_up(): void {

		parent::set_up();

		set_current_screen( 'dashboard' );

		$this->dimensions = array(
			'element' => array(
				array(
					'height' => '300px',
					'Mobile' => 'height: 200px; color: red;',
					'Tablet' => 'height: 300px; color: green;',
				),
			),
		);

		$this->responsive_height = array(
			'divider_key' => array(
				'height'           => array(
					'heightTablet' => '200',
					'heightMobile' => '300',
				),
				'shapeHeight'      => array(
					'heightTablet' => '300',
					'heightMobile' => '400',
				),
				'backgroundHeight' => array(
					'heightTablet' => '400',
					'heightMobile' => '500',
				),
			),
		);

		$this->coblocks_generated_styles = new CoBlocks_Generated_Styles();
		$this->coblocks_block_assets     = new CoBlocks_Block_Assets();

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

	}

	/**
	 * Test the register method
	 */
	public function test_register() {

		$reflection     = new ReflectionClass( $this->coblocks_generated_styles );
		$new_reflection = new CoBlocks_Generated_Styles();

		$instance = $reflection->getProperty( 'instance' );
		$instance->setAccessible( true );
		$instance->setValue( null, null );

		$new_reflection::register();

		$this->assertTrue( is_a( $instance->getValue(), 'CoBlocks_Generated_Styles' ) );

	}

	/**
	 * Test the constructor actions
	 */
	public function test_construct_actions() {

		$actions = array(
			array( 'wp_enqueue_scripts', 'enqueue_styles' ),
			array( 'admin_enqueue_scripts', 'enqueue_styles' ),
		);

		foreach ( $actions as $action_data ) {

			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], array( $this->coblocks_generated_styles, $action_data[1] ) ) ) {

				$this->fail( "$action_data[0] is not attached to CoBlocks:$action_data[1]. It might also have the wrong priority (validated priority: $priority)" );

			}
		}

		$this->assertTrue( true );

	}

	/**
	 * Test the scripts enqueue correctly
	 */
	public function test_enqueue_styles() {

		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/block_with_custom_styles --><!-- /wp:coblocks/block_with_custom_styles -->',
				'post_title'   => 'Post title',
				'post_status'  => 'publish',
			)
		);

		update_post_meta( $post_id, '_coblocks_dimensions', json_encode( $this->dimensions ) );
		update_post_meta( $post_id, '_coblocks_responsive_height', json_encode( $this->responsive_height ) );

		global $post;

		$post = get_post( $post_id );

		$this->coblocks_block_assets->block_assets();
		$this->coblocks_generated_styles->enqueue_styles();

		do_action( 'enqueue_block_assets' );
		do_action( 'wp_enqueue_scripts' );

		global $wp_styles;

		$this->assertTrue( array_key_exists( 'coblocks-frontend', $wp_styles->registered ) );

	}

	/**
	 * Test the generated styles on the frontend
	 */
	public function test_styles_no_post_object() {

		global $post;

		$post = new stdClass();

		$this->assertNull( $this->coblocks_generated_styles->styles() );

	}

	/**
	 * Test the generated styles in the dashboard
	 */
	public function test_styles_dashboard() {

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => 'Post content',
				'post_title'   => 'Post title',
				'post_status'  => 'publish',
			)
		);

		update_post_meta( $post_id, '_coblocks_dimensions', json_encode( $this->dimensions ) );
		update_post_meta( $post_id, '_coblocks_responsive_height', json_encode( $this->responsive_height ) );

		global $post;

		$post = get_post( $post_id );

		$this->assertEquals( '.element > div {height:300px;}@media only screen and (max-width: 768px) {.element > div {:height: 300px; color: green; !important;}}@media only screen and (max-width: 514px) {.element > div {:height: 200px; color: red; !important;}}', $this->coblocks_generated_styles->styles() );

	}

	/**
	 * Test the generated styles on the frontend
	 */
	public function test_styles_frontend() {

		unset( $GLOBALS['current_screen'] );

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => 'Post content',
				'post_title'   => 'Post title',
				'post_status'  => 'publish',
			)
		);

		update_post_meta( $post_id, '_coblocks_dimensions', json_encode( $this->dimensions ) );
		update_post_meta( $post_id, '_coblocks_responsive_height', json_encode( $this->responsive_height ) );

		global $post;

		$post = get_post( $post_id );

		$this->assertEquals( '.element > div {height:300px;}@media only screen and (max-width: 768px) {.element > div {:height: 300px; color: green;;}}@media only screen and (max-width: 514px) {.element > div {:height: 200px; color: red;;}}@media only screen and (max-width: 768px) {.divider_key > [class*="__inner"]:not(.is-fullscreen) {min-height:200px !important}}@media only screen and (max-width: 514px) {.divider_key > [class*="__inner"]:not(.is-fullscreen)  {min-height:300px !important}}@media only screen and (max-width: 768px) {}@media only screen and (max-width: 514px) {}@media only screen and (max-width: 768px) {}@media only screen and (max-width: 514px) {}', $this->coblocks_generated_styles->styles() );

	}
}
