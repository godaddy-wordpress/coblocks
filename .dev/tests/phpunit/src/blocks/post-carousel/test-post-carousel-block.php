<?php
/**
 * Test /src/blocks/post-carousel/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Post_Carousel_Index_Tests extends WP_UnitTestCase {

	private $coblocks_register_blocks;

	public function set_up(): void {
		parent::set_up();

		$this->coblocks_register_blocks = new CoBlocks_Register_Blocks();

		set_current_screen( 'edit-post' );
	}

	public function tear_down(): void {
		parent::tear_down();

		unset( $GLOBALS['current_screen'] );
	}

	/**
	 * Test the social block markup returns correctly
	 */
	public function test_coblocks_render_coblocks_post_carousel_block() {
		// Test case 1: Default attributes
		$attributes = array(
			'className'    => 'test-class-name',
			'columns'      => 2,
			'postsToShow'  => 4,
			'order'        => 'date',
			'orderBy'      => 'desc',
			'postFeedType' => 'internal',
		);

		// Create a test post
		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '',
				'post_title'   => 'CoBlocks Post Carousel Block',
				'post_status'  => 'publish',
			)
		);

		global $post;
		$post = get_post( $post_id );

		$output = coblocks_render_coblocks_post_carousel_block( $attributes );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-post-carousel external test-class-name">', $output );

		// Test case 2: With categories and categoryRelation attributes
		$category1                      = wp_create_category( 'Category 1' );
		$category2                      = wp_create_category( 'Category 2' );
		$attributes['categories']       = array(
			array( 'id' => $category1 ),
			array( 'id' => $category2 ),
		);
		$attributes['categoryRelation'] = 'and';

		$output = coblocks_render_coblocks_post_carousel_block( $attributes );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-post-carousel external test-class-name">', $output );
	}

	/**
	 * Test coblocks_post_carousel
	 */
	public function test_coblocks_post_carousel() {
		$posts = array(
			array(
				'thumbnailURL' => 'https://example.com/thumbnail.jpg',
				'date'         => '2023-04-10T00:00:00',
				'dateReadable' => 'April 10, 2023',
				'title'        => 'Test Post',
				'postLink'     => 'https://example.com/test-post',
				'postExcerpt'  => 'This is a test post.',
			),
		);

		$attributes = array(
			'className'          => 'test-class-name',
			'columns'            => 2,
			'displayPostDate'    => true,
			'displayPostContent' => true,
			'excerptLength'      => 10,
			'displayPostLink'    => true,
			'postLink'           => 'Read more',
		);

		$output = coblocks_post_carousel( $posts, $attributes );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-post-carousel external test-class-name">', $output );
		$this->assertStringContainsString( '<time datetime="2023-04-10T00:00:00" class="wp-block-coblocks-post-carousel__date">April 10, 2023</time>', $output );
		$this->assertStringContainsString( '<a href="https://example.com/test-post" alt="Test Post">Test Post</a>', $output );
		$this->assertStringContainsString( '<div class="wp-block-coblocks-post-carousel__excerpt">This is a test post.</div>', $output );
		$this->assertStringContainsString( '<a href="https://example.com/test-post" class="wp-block-coblocks-post-carousel__more-link">Read more</a>', $output );
	}

	/**
	 * Test coblocks_post_carousel with displayPostDate set to false
	 */
	public function test_coblocks_post_carousel_without_date() {
		$posts = array(
			array(
				'thumbnailURL' => 'https://example.com/thumbnail.jpg',
				'date'         => '2023-04-10T00:00:00',
				'dateReadable' => 'April 10, 2023',
				'title'        => 'Test Post',
				'postLink'     => 'https://example.com/test-post',
				'postExcerpt'  => 'This is a test post.',
			),
		);

		$attributes = array(
			'className'          => 'test-class-name',
			'columns'            => 2,
			'displayPostDate'    => false,
			'displayPostContent' => true,
			'excerptLength'      => 10,
			'displayPostLink'    => true,
			'postLink'           => 'Read more',
		);

		$output = coblocks_post_carousel( $posts, $attributes );
		$this->assertStringNotContainsString( '<time datetime="2023-04-10T00:00:00" class="wp-block-coblocks-post-carousel__date">April 10, 2023</time>', $output );
		$this->assertStringNotContainsString( '2023-04-10T00:00:00', $output );
	}
}
