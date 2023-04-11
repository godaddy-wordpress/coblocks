<?php
/**
 * Test /src/blocks/posts/test-index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Posts_Index_Tests extends WP_UnitTestCase {

	public function set_up(): void {
		parent::set_up();

		set_current_screen( 'edit-post' );
	}

	public function tear_down(): void {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test the posts block markup returns correctly
	 */
	public function test_coblocks_render_posts_block() {
		$attributes = array(
			'className'    => 'test-class-name',
			'postsToShow'  => 4,
			'order'        => 'date',
			'orderBy'      => 'desc',
			'postFeedType' => 'internal',
		);

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '',
				'post_title'   => 'CoBlocks Posts Block',
				'post_status'  => 'publish',
			)
		);

		global $post;
		$post = get_post( $post_id );

		$this->assertEquals( '<div class="wp-block-coblocks-posts test-class-name"><div class="wp-block-coblocks-posts__inner"></div></div>', coblocks_render_posts_block( $attributes ) );
	}

	/**
	 * Test the posts block markup returns correctly with styles
	 */
	public function test_coblocks_render_posts_block_with_styles() {
		$attributes = array(
			'className'    => 'test-class-name',
			'postsToShow'  => 4,
			'order'        => 'date',
			'orderBy'      => 'desc',
			'postFeedType' => 'internal',
		);

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '',
				'post_title'   => 'CoBlocks Posts Block',
				'post_status'  => 'publish',
			)
		);

		global $post;
		$post = get_post( $post_id );

		// Add a filter to simulate custom styles being applied.
		add_filter(
			'coblocks_render_wrapper_styles',
			function( $styles, $attributes ) {
				$styles[] = 'background-color: red;';
				return $styles;
			},
			10,
			2
		);

		// Test if the style attribute is present and contains the custom styles.
		$this->assertStringContainsString(
			'style="background-color: red;"',
			coblocks_render_posts_block( $attributes )
		);

		// Remove the filter after the test.
		remove_all_filters( 'coblocks_render_wrapper_styles' );
	}
}
