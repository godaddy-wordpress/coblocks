<?php
/**
 * Test includes/src/blocks/post-carousel/test-index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Post_Carousel_Index_Tests extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();

		include_once COBLOCKS_PLUGIN_DIR . 'src/blocks/post-carousel/index.php';

		set_current_screen( 'edit-post' );
	}

	public function tear_down() {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test the file actions are hooked properly
	 */
	public function test_file_actions() {
		$actions = [
			[ 'init', 'coblocks_register_post_carousel_block' ],
		];

		foreach ( $actions as $action_data ) {
			$priority = isset( $action_data[2] ) ? $action_data[2] : 10;

			if ( ! has_action( $action_data[0], $action_data[1] ) ) {
				$this->fail( "$action_data[0] is not attached to $action_data[1]." );
			}
		}

		$this->assertTrue( true );
	}

	/**
	 * Test the social block markup returns correctly
	 */
	public function test_coblocks_render_post_carousel_block() {
		$attributes = [
			'className' => 'test-class-name',
			'columns' => 2,
			'postsToShow' => 4,
			'order' => 'date',
			'orderBy' => 'desc',
			'postFeedType' => 'internal',
		];

		$post_id = wp_insert_post(
			[
				'post_author'  => 1,
				'post_content' => '',
				'post_title'   => 'CoBlocks Post Carousel Block',
				'post_status'  => 'publish',
			]
		);

		global $post;
		$post = get_post( $post_id );



		$this->assertEquals(
			'<div class="wp-block-coblocks-post-carousel external test-class-name"><div class="coblocks-swiper swiper-container pb-8" data-swiper="{&quot;slidesToScroll&quot;:1,&quot;arrow&quot;:true,&quot;slidesToShow&quot;:2,&quot;infinite&quot;:true,&quot;adaptiveHeight&quot;:false,&quot;draggable&quot;:true,&quot;rtl&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:1024,&quot;settings&quot;:{&quot;slidesToShow&quot;:3}},{&quot;breakpoint&quot;:600,&quot;settings&quot;:{&quot;slidesToShow&quot;:2}},{&quot;breakpoint&quot;:480,&quot;settings&quot;:{&quot;slidesToShow&quot;:1}}]}"><div class="swiper-wrapper" ></div></div><button class="wp-coblocks-post-carousel-nav-button__prev" id="wp-coblocks-post-carousel-swiper-prev" style="visibility:hidden" /><button class="wp-coblocks-post-carousel-nav-button__next" id="wp-coblocks-post-carousel-swiper-next" style="visibility:hidden" /></div>',
			coblocks_render_post_carousel_block( $attributes )
		);
	}

	/**
	 * Test the share block is registered
	 *
	 * @expectedIncorrectUsage WP_Block_Type_Registry::register
	 */
	public function test_coblocks_register_post_carousel_block() {
		coblocks_register_post_carousel_block();

		$expected_registered_blocks = [
			'coblocks/post-carousel',
		];

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $expected_registered_blocks as $coblocks_block ) {

			if ( ! array_key_exists( $coblocks_block, $registered_blocks ) ) {
				$this->fail( "$coblocks_block is not registered." );
			}
		}

		$this->assertTrue( true );
	}
}
