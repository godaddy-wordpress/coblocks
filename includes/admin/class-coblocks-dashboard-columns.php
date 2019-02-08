<?php
/**
 * Dashboard Columns.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      @@pkg.author_uri
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Dashboard_Columns Class
 */
class CoBlocks_Dashboard_Columns {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'manage_edit-coblocks_columns', array( $this, 'define_columns' ) );
		add_action( 'manage_posts_custom_column', array( $this, 'render_columns' ), 10, 2 );
		add_filter( 'manage_edit-coblocks_sortable_columns', array( $this, 'sortable_columns' ) );
		add_filter( 'post_row_actions', array( $this, 'row_actions' ), 2, 100 );
		add_filter( 'request', array( $this, 'column_orderby' ) );
	}

	/**
	 * Post type columns
	 *
	 * Defines the custom columns and their order
	 *
	 * @param array $columns Array of columns.
	 * @return array $columns Updated array of columns for post type table.
	 */
	public function define_columns( $columns ) {

		if ( empty( $columns ) && ! is_array( $columns ) ) {
			$columns = array();
		}

		$thumb_labels = '<span class="template-image" data-tip="' . esc_attr__( 'Thumbnail', '@@textdomain' ) . '">' . esc_html__( 'Thumbnail', '@@textdomain' ) . '</span>';

		$columns = array(
			'cb'            => '<input type="checkbox"/>',
			'title'         => esc_html__( 'Name', '@@textdomain' ),
			'thumb'         => $thumb_labels,
			'template_type' => esc_html__( 'Type', '@@textdomain' ),
			'author'        => esc_html__( 'Author', '@@textdomain' ),
			'date'          => esc_html__( 'Date', '@@textdomain' ),
		);

		return apply_filters( 'coblocks_columns', $columns );
	}

	/**
	 * Render columns.
	 *
	 * @param string $column_name Column name.
	 * @param int    $post_id Portfolio (Post) ID.
	 */
	public function render_columns( $column_name, $post_id ) {

		$template_type = get_post_meta( $post_id, 'coblocks_library_type', true );

		if ( get_post_type( $post_id ) === 'coblocks' ) {
			switch ( $column_name ) {
				case 'thumb':
					echo '<a href="' . esc_url( get_edit_post_link( $post_id ) ) . '">' . get_the_post_thumbnail( $post_id, array( 45, 45 ) ) . '</a>';
					break;
				case 'template_type':
					echo ( ! empty( $template_type ) && 'section' == $template_type ) ? esc_html( ucfirst( $template_type ) ) : esc_html__( 'Page Template', '@@textdomain' );
					break;
			}
		}
	}

	/**
	 * Sortable columns
	 *
	 * Defines the custom columns and their order
	 *
	 * @param array $columns Array of columns.
	 * @return array $columns Updated array of columns for list table.
	 */
	public function sortable_columns( $columns ) {
		$columns['template_type'] = 'template_type';
		return $columns;
	}

	/**
	 * Portfolio Orderby
	 *
	 * Add filter to the request to make the hits sorting process numeric, not string.
	 *
	 * @param array $vars Array of variables.
	 * @return array $vars Updated array of variables for list table.
	 */
	public function column_orderby( $vars ) {
		if ( isset( $vars['orderby'] ) && 'template_type' === $vars['orderby'] ) {
			$vars = array_merge(
				$vars, array(
					'meta_key' => 'coblocks_library_type',
					'orderby'  => 'meta_value',
				)
			);
		}

		return $vars;
	}

	/**
	 * Add an ID to the portfolio posts.
	 *
	 * @param  array   $actions Available actions.
	 * @param  WP_Post $post The post.
	 * @return array
	 */
	public function row_actions( $actions, $post ) {
		if ( 'coblocks' === $post->post_type ) {
			return array_merge( array( 'id' => 'ID: ' . $post->ID ), $actions );
		}

		return $actions;
	}
}

return new CoBlocks_Dashboard_Columns();
