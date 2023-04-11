<?php
/**
 * Test src/blocks/share/index.php
 *
 * @package CoBlocks
 */
class CoBlocks_Social_Index_Tests extends WP_UnitTestCase {

	private $thumbnail_id;

	public function set_up(): void {

		parent::set_up();

		set_current_screen( 'edit-post' );

	}

	public function tear_down(): void {

		parent::tear_down();

		unset( $GLOBALS['current_screen'] );

		if ( ! empty( $this->thumbnail_id ) ) {

			wp_delete_attachment( $this->thumbnail_id, true );

		}

	}


	/**
	 * Test the social block markup returns correctly
	 */
	public function test_coblocks_render_share_block() {

		$attributes = array(
			'className' => 'test-class-name',
			'size'      => 'large',
			'hasColors' => true,
		);

		$this->assertEquals( '<div class="wp-block-coblocks-social test-class-name has-colors has-button-size-large" style=" "><ul></ul></div>', coblocks_render_share_block( $attributes ) );

	}

	/**
	 * Test the social block markup returns correctly with style mask enabled
	 */
	public function test_coblocks_render_share_block_style_mask() {

		$attributes = array(
			'className' => 'test-class-name is-style-mask',
			'hasColors' => true,
		);

		$this->assertEquals( '<div class="wp-block-coblocks-social test-class-name is-style-mask has-colors" style=" "><ul></ul></div>', coblocks_render_share_block( $attributes ) );

	}

	/**
	 * Test the social block markup returns correctly when platforms are specified
	 */
	public function test_coblocks_render_share_block_platforms() {

		$attributes = array(
			'twitter' => true,
		);

		$this->assertMatchesRegularExpression( '/<a href="http:\/\/twitter.com\/share\?text=&#038;url=" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--twitter     " title="Share on Twitter" style="">/', coblocks_render_share_block( $attributes ) );

	}

	/**
	 * Test the social block markup returns correctly when platforms are specified
	 */
	public function test_coblocks_render_share_block_filter_twitter_share_url() {

		$attributes = array(
			'twitter' => true,
		);

		add_filter(
			'coblocks_twitter_share_url',
			function( $share_url ) {
				return 'https://www.custom-share-url.com';
			}
		);

		$this->assertMatchesRegularExpression( '/<a href="https:\/\/www.custom-share-url.com" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--twitter     " title="Share on Twitter" style="">/', coblocks_render_share_block( $attributes ) );

	}

	/**
	 * Test the social block markup when a thumbnail is set
	 */
	public function test_coblocks_render_share_block_with_thumbnail() {

		$post_id = wp_insert_post(
			array(
				'post_author'  => 1,
				'post_content' => '<!-- wp:coblocks/social --><!-- /wp:coblocks/social -->',
				'post_title'   => 'CoBlocks Social',
				'post_status'  => 'publish',
			)
		);

		$this->thumbnail_id = media_sideload_image( 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260', $post_id, 'Test cat image.', 'id' );

		update_post_meta( $post_id, '_thumbnail_id', $this->thumbnail_id );

		global $post;

		$post = get_post( $post_id );

		$attributes = array(
			'pinterest' => true,
		);

		$site_url = str_replace( '/', '\/', get_site_url() );

		$this->assertMatchesRegularExpression( '/<a href="https:\/\/pinterest.com\/pin\/create\/button\/\?&#038;url=' . $site_url . '\/\?p=' . $post_id . '&#038;description=CoBlocks%20Social&#038;media=' . $site_url . '\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[a-zA-Z0-9-]+.jpeg" class="wp-block-button__link wp-block-coblocks-social__button wp-block-coblocks-social__button--pinterest     " title="Share on Pinterest" style="">/', coblocks_render_share_block( $attributes ) );

	}

	public function test_phone_field_block_registered() {

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		$this->assertArrayHasKey( 'coblocks/social', $registered_blocks );

	}

	/**
	 * Test the social block markup returns correctly with custom block background color
	 */
	public function test_coblocks_render_share_block_custom_block_background_color() {
		$attributes = array(
			'customBlockBackgroundColor' => '#123456',
			'hasColors'                  => true,
		);

		$this->assertMatchesRegularExpression( '/<div class="wp-block-coblocks-social has-background has-colors" style="background-color:#123456;?\s?"><ul>/', coblocks_render_share_block( $attributes ) );
	}
}
