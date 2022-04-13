<?php
/**
 * The Block Patterns.
 *
 * @package CoBlocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers the custom post type and custom taxonomies used for storing block patterns.
 *
 * @since 2.3.0
 */
class CoBlocks_Block_Patterns {
	use CoBlocks_Singleton_Trait;

	const POST_TYPE         = 'coblocks_pattern';
	const TYPE_TAXONOMY     = 'coblocks_pattern_type';
	const CATEGORY_TAXONOMY = 'coblocks_pattern_category';

	/**
	 * The Constructor.
	 */
	public function __construct() {

		add_action( 'admin_enqueue_scripts', array( $this, 'conditional_load_patterns' ) );

		if ( is_wp_version_compatible( '5.5' ) ) {
			add_action( 'init', array( $this, 'register_post_type' ) );
			add_action( 'init', array( $this, 'register_type_taxonomy' ) );
			add_action( 'init', array( $this, 'register_category_taxonomy' ) );
			add_action( 'init', array( $this, 'load_block_patterns' ) );
			add_action( 'rest_insert_' . self::POST_TYPE, array( $this, 'add_taxonomies_on_insert_post' ), 10, 2 );

			add_filter( 'coblocks_layout_selector_categories', array( $this, 'load_categories' ) );
			add_filter( 'coblocks_layout_selector_layouts', array( $this, 'load_layouts' ) );
		}
	}

	/**
	 * Register the Custom Post Type.
	 */
	public function register_post_type() {
		$args = array(
			'label'             => __( 'Block Patterns', 'coblocks' ),
			'description'       => __( 'Description', 'coblocks' ),
			'supports'          => array( 'title', 'editor', 'excerpt' ),
			'taxonomies'        => array(
				self::TYPE_TAXONOMY,
				self::CATEGORY_TAXONOMY,
			),
			'show_ui'           => true,
			'rewrite'           => false,
			'show_in_rest'      => true,
			'show_in_menu'      => 'themes.php',
			'show_in_admin_bar' => false,
		);

		register_post_type( self::POST_TYPE, $args );
	}

	/**
	 * Registers the "type" custom taxonomy.
	 *
	 * "Type" is used to differentiate between a full page "layout" and
	 * a block "pattern" so we can utilize the same CPT for different contexts.
	 */
	public function register_type_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Type', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( self::TYPE_TAXONOMY, array( self::POST_TYPE ), $args );
	}

	/**
	 * Registers the "category" custom taxonomy.
	 *
	 * "Category" is used to categorize different block patterns and layouts which are grouped together in the UI.
	 */
	public function register_category_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Category', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( self::CATEGORY_TAXONOMY, array( self::POST_TYPE ), $args );
	}

	/**
	 * Set custom taxonomies relationships with the REST API.
	 *
	 * @param WP_Post         $post     Inserted or updated post object.
	 * @param WP_REST_Request $request  Request object.
	 */
	public function add_taxonomies_on_insert_post( $post, $request ) {
		$params = $request->get_json_params();

		if ( array_key_exists( 'terms', $params ) ) {
			foreach ( $params['terms'] as $taxonomy => $terms ) {
				wp_set_object_terms( $post->ID, $terms, $taxonomy );
			}
		}
	}

	/**
	 * Localize conditional loading based on version check.
	 *
	 * @access public
	 */
	public function conditional_load_patterns() {
		wp_localize_script(
			'coblocks-editor',
			'coblocksBlockPatterns',
			array(
				'patternsEnabled' => (bool) apply_filters( 'coblocks_patterns_show_settings_panel', is_wp_version_compatible( '5.5' ) ),
			)
		);
	}

	/**
	 * Merge our "category" taxonomy with the categories already defined elsewhere.
	 *
	 * @param array $categories The existing categories.
	 *
	 * @return array
	 */
	public function load_categories( $categories ) {
		$categories_flattened = wp_list_pluck( $categories, 'title', 'slug' );

		$pattern_categories           = get_terms( self::CATEGORY_TAXONOMY );
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

	/**
	 * Merge our custom post type posts (with the 'layout' type) with the layouts already defined elsewhere.
	 *
	 * @param array $layouts The existing layouts.
	 *
	 * @return array
	 */
	public function load_layouts( $layouts ) {
		$query_args = array(
			'post_type'              => self::POST_TYPE,

			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

			'tax_query'              => array(
				array(
					'taxonomy' => self::TYPE_TAXONOMY,
					'field'    => 'slug',
					'terms'    => 'layout',
				),
			),
		);

		$block_patterns_query = new \WP_Query( $query_args );
		wp_reset_postdata();

		foreach ( $block_patterns_query->posts as $block_pattern ) {
			$categories = get_the_terms( $block_pattern->ID, self::CATEGORY_TAXONOMY );

			$layouts[] = array(
				'category'    => wp_list_pluck( $categories, 'slug' )[0],
				'postContent' => $block_pattern->post_content,
			);
		}

		return $layouts;
	}

	/**
	 * Register custom post type posts (with the 'pattern' type) as block patterns.
	 */
	public function load_block_patterns() {
		$query_args = array(
			'post_type'              => self::POST_TYPE,
			'posts_per_page'         => -1,

			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

			'tax_query'              => array(
				array(
					'taxonomy' => self::TYPE_TAXONOMY,
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
			$categories = get_the_terms( $block_pattern->ID, self::CATEGORY_TAXONOMY );

			register_block_pattern(
				self::POST_TYPE . '/' . $block_pattern->post_name,
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
