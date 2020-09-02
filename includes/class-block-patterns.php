<?php
/**
 * The Block Patterns post type.
 *
 * @package CoBlocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * The Block Patterns post type.
 *
 * @since NEXT
 */
class CoBlocks_Block_Patterns {
	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Block_Patterns
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return CoBlocks_Block_Patterns
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_Patterns();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'init', array( $this, 'register_type_taxonomy' ) );
		add_action( 'init', array( $this, 'register_category_taxonomy' ) );
		add_action( 'init', array( $this, 'load_block_patterns' ) );
		add_action( 'rest_insert_block_patterns', array( $this, 'add_taxonomies_on_insert_post' ), 10, 2 );

		add_filter( 'coblocks_layout_selector_categories', array( $this, 'load_categories' ) );
		add_filter( 'coblocks_layout_selector_layouts', array( $this, 'load_layouts' ) );
	}

	public function register_post_type() {
		$args = array(
			'label'             => __( 'Block Patterns', 'coblocks' ),
			'description'       => __( 'Description', 'coblocks' ),
			'supports'          => array( 'title', 'editor', 'excerpt' ),
			'taxonomies'        => array(
				'block_pattern_type',
				'block_pattern_category',
			),
			'show_ui'           => true,
			'rewrite'           => false,
			'show_in_rest'      => true,
			'show_in_menu'      => 'themes.php',
			'show_in_admin_bar' => false,
		);

		register_post_type( 'block_patterns', $args );
	}

	public function register_type_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Type', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( 'block_pattern_type', array( 'block_patterns' ), $args );
	}

	public function register_category_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Category', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( 'block_pattern_category', array( 'block_patterns' ), $args );
	}

	/**
	 * Set custom taxonomies relationships with the REST API.
	 *
	 * @param WP_Post         $post     Inserted or updated post object.
	 * @param WP_REST_Request $request  Request object.
	 */
	function add_taxonomies_on_insert_post( $post, $request ) {
		$params = $request->get_json_params();

		if ( array_key_exists( 'terms', $params ) ) {
			foreach ( $params['terms'] as $taxonomy => $terms ) {
				wp_set_object_terms( $post->ID, $terms, $taxonomy );
			}
		}
	}

	public function load_categories( $categories ) {
		$categories_flattened = wp_list_pluck( $categories, 'title', 'slug' );

		$pattern_categories           = get_terms( 'block_pattern_category' );
		$pattern_categories_flattened = wp_list_pluck( $pattern_categories, 'name', 'slug' );

		$merged_categories = array_merge(
			$categories_flattened,
			$pattern_categories_flattened
		);

		return array_map(
			function( $val, $key ) {
				return array(
					'slug'  => $key,
					'title' => $val,
				);
			},
			$merged_categories,
			array_keys( $merged_categories )
		);
	}

	public function load_layouts( $layouts ) {
		$query_args = array(
			'post_type'              => 'block_patterns',

			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

			'tax_query'              => array(
				array(
					'taxonomy' => 'block_pattern_type',
					'field'    => 'slug',
					'terms'    => 'layout',
				),
			),
		);

		$block_patterns_query = new \WP_Query( $query_args );
		wp_reset_postdata();

		foreach ( $block_patterns_query->posts as $block_pattern ) {
			$categories = get_the_terms( $block_pattern->ID, 'block_pattern_category' );

			$layouts[] = array(
				'category'    => wp_list_pluck( $categories, 'slug' )[0],
				'postContent' => $block_pattern->post_content,
			);
		}

		return $layouts;
	}

	function load_block_patterns() {
		$query_args = array(
			'post_type'              => 'block_patterns',

			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

			'tax_query'              => array(
				array(
					'taxonomy' => 'block_pattern_type',
					'field'    => 'slug',
					'terms'    => 'pattern',
				),
			),
		);

		$block_patterns_query = new \WP_Query( $query_args );
		wp_reset_postdata();

		if ( empty( $block_patterns_query->posts ) ) {
			return;
		}

		foreach ( $block_patterns_query->posts as $block_pattern ) {
			$categories = get_the_terms( $block_pattern->ID, 'block_pattern_category' );

			register_block_pattern(
				"block_patterns/{$block_pattern->post_name}",
				array(
					'title'       => $block_pattern->post_title,
					'content'     => $block_pattern->post_content,
					'categories'  => empty( $categories ) ? array() : wp_list_pluck( $categories, 'slug' ),
					'description' => $block_pattern->post_excerpt,
				)
			);
		}
	}
}

CoBlocks_Block_Patterns::register();
