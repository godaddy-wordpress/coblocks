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

		add_filter( 'coblocks_layout_selector_categories', array( $this, 'load_categories' ) );
		add_filter( 'coblocks_layout_selector_layouts', array( $this, 'load_layouts' ) );
	}

	public function register_post_type() {
		$args = array(
			'label'             => __( 'Block Patterns', 'coblocks' ),
			'description'       => __( 'Description', 'coblocks' ),
			'supports'          => array( 'title', 'editor' ),
			'taxonomies'        => array(
				'coblocks_pattern_type',
			),
			'show_ui'           => true,
			'rewrite'           => false,
			'show_in_rest'      => true,
			'show_in_menu'      => 'themes.php',
			'show_in_admin_bar' => false,
		);

		register_post_type( 'coblocks_pattern', $args );
	}

	public function register_type_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Type', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( 'coblocks_pattern_type', array( 'coblocks_pattern' ), $args );
	}

	public function register_category_taxonomy() {
		$args = array(
			'label'        => __( 'Pattern Category', 'coblocks' ),
			'hierarchical' => true,
			'rewrite'      => false,
			'show_in_rest' => true,
		);

		register_taxonomy( 'coblocks_pattern_category', array( 'coblocks_pattern' ), $args );
	}

	public function load_categories( $categories ) {
		$categories_flattened = wp_list_pluck( $categories, 'title', 'slug' );

		$pattern_categories           = get_terms( 'coblocks_pattern_category' );
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
			'post_type'              => 'coblocks_pattern',

			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

			'tax_query'              => array(
				array(
					'taxonomy' => 'coblocks_pattern_type',
					'field'    => 'slug',
					'terms'    => 'layout',
				),
			),
		);

		$block_patterns_query = new \WP_Query( $query_args );
		wp_reset_postdata();

		foreach ( $block_patterns_query->posts as $block_pattern ) {
			$categories = get_the_terms( $block_pattern->ID, 'coblocks_pattern_category' );

			$layouts[] = array(
				'category'    => wp_list_pluck( $categories, 'slug' )[0],
				'postContent' => $block_pattern->post_content,
			);
		}

		return $layouts;
	}
}

CoBlocks_Block_Patterns::register();
