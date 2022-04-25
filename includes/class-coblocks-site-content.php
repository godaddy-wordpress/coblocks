<?php
/**
 * CoBlocks Site Content
 *
 * @package CoBlocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Site_Content
 *
 * @package CoBlocks
 * @author  GoDaddy
 */
class CoBlocks_Site_Content {

	/**
	 * Class constructor
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'register_settings' ), 11 );
		add_filter( 'wp_insert_post_empty_content', array( $this, 'allow_empty_post_content' ), 10, 2 );

	}

	/**
	 * Filters whether the post should be considered "empty".
	 *
	 * @see wp_insert_post()
	 *
	 * @param bool  $maybe_empty Whether the post should be considered "empty".
	 * @param array $postarr     Array of post data.
	 */
	public function allow_empty_post_content( $maybe_empty, $postarr ) {
		$post_type = empty( $postarr['post_type'] ) ? 'post' : $postarr['post_type'];

		return in_array( $post_type, array( 'post', 'page' ), true )
			? false // Allow empty title, content, and excerpt.
			: $maybe_empty;
	}

	/**
	 * Retreive the available post types
	 */
	private function get_page_nav_post_types() {

		$post_types = get_post_types();
		$white_list = array(
			'page' => 'pages',
		);

		foreach ( $post_types as $post_type_slug ) {

			if ( ! array_key_exists( $post_type_slug, $white_list ) ) {
				unset( $post_types[ $post_type_slug ] );
				continue;
			}

			$post_type_obj = get_post_type_object( $post_type_slug );

			$post_types[ $white_list[ $post_type_slug ] ] = $post_type_obj->label;
			unset( $post_types[ $post_type_slug ] );
		}

		ksort( $post_types );

		return $post_types;

	}

	/**
	 * Register core site settings for Site Content
	 */
	public function register_settings() {
		register_setting(
			'reading',
			'show_on_front',
			array(
				'show_in_rest' => true,
				'type'         => 'string',
				'description'  => __( 'What to show on the front page', 'gutenberg' ),
			)
		);

		register_setting(
			'reading',
			'page_on_front',
			array(
				'show_in_rest' => true,
				'type'         => 'number',
				'description'  => __( 'The ID of the page that should be displayed on the front page', 'gutenberg' ),
			)
		);

		register_setting(
			'reading',
			'page_for_posts',
			array(
				'show_in_rest' => true,
				'type'         => 'number',
				'description'  => __( 'The ID of the page that display the posts', 'gutenberg' ),
			)
		);
	}
}

new CoBlocks_Site_Content();
