<?php
/**
 * Duplicate templates.
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
 * CoBlocks_Duplicate_Template Class
 */
class CoBlocks_Duplicate_Template {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_action_duplicate_template', array( $this, 'duplicate_template_action' ) );
		add_filter( 'post_row_actions', array( $this, 'duplicate_link' ), 10, 2 );
		add_filter( 'page_row_actions', array( $this, 'duplicate_link' ), 10, 2 );
		add_action( 'post_submitbox_start', array( $this, 'duplicate_button' ) );
	}

	/**
	 * Show the "Duplicate" link in admin portfolios list.
	 *
	 * @param  array   $actions Actions.
	 * @param  WP_Post $post Post object.
	 * @return array
	 */
	public function duplicate_link( $actions, $post ) {
		if ( 'coblocks' != $post->post_type ) {
			return $actions;
		}

		// do not show if user reached the limit
		$count = wp_count_posts( 'coblocks' );
		if ( $count->publish > 10 ) {
			return $actions;
		}

		$actions['duplicate'] = '<a href="' . wp_nonce_url( admin_url( 'edit.php?post_type=coblocks&action=duplicate_template&amp;post=' . $post->ID ), 'coblocks-duplicate-portfolio_' . $post->ID ) . '" title="' . esc_attr__( 'Make a duplicate from this template or section', '@@textdomain' )
			. '" rel="permalink">' . esc_html__( 'Duplicate', '@@textdomain' ) . '</a>';

		return $actions;
	}

	/**
	 * Show the dupe portfolio link in admin
	 */
	public function duplicate_button() {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		if ( $post->post_type != 'portfolio' ) {
			return;
		}

		if ( isset( $_GET['post'] ) ) {
			$notifyUrl = wp_nonce_url( admin_url( 'edit.php?post_type=portfolio&action=duplicate_template&post=' . absint( $_GET['post'] ) ), 'coblocks-duplicate-portfolio_' . $_GET['post'] );
			?>
			<div id="duplicate-action"><a class="submitduplicate duplication" href="<?php echo esc_url( $notifyUrl ); ?>"><?php _e( 'Copy to a new draft', '@@textdomain' ); ?></a></div>
			<?php
		}
	}

	/**
	 * Duplicate a portfolio action.
	 */
	public function duplicate_template_action() {

		if ( empty( $_REQUEST['post'] ) ) {
			wp_die( __( 'No portfolio to duplicate has been supplied!', '@@textdomain' ) );
		}

		// Get the original page
		$id = isset( $_REQUEST['post'] ) ? absint( $_REQUEST['post'] ) : '';

		check_admin_referer( 'coblocks-duplicate-portfolio_' . $id );

		$post = $this->get_portfolio_to_duplicate( $id );

		// Copy the page and insert it
		if ( ! empty( $post ) ) {
			$new_id = $this->duplicate_template( $post );

			// If you have written a plugin which uses non-WP database tables to save
			// information about a page you can hook this action to dupe that data.
			do_action( 'coblocks_duplicate_template', $new_id, $post );

			// Redirect to the edit screen for the new draft page
			wp_redirect( admin_url( 'post.php?action=edit&post=' . $new_id ) );
			exit;
		} else {
			wp_die( __( 'Portfolio creation failed, could not find original portfolio:', '@@textdomain' ) . ' ' . $id );
		}
	}

	/**
	 * Function to create the duplicate of the portfolio.
	 *
	 * @param mixed  $post Post.
	 * @param int    $parent (default: 0) Parent post.
	 * @param string $post_status (default: '').
	 * @return int
	 */
	public function duplicate_template( $post, $parent = 0, $post_status = '' ) {
		global $wpdb;

		$new_post_author   = wp_get_current_user();
		$new_post_date     = current_time( 'mysql' );
		$new_post_date_gmt = get_gmt_from_date( $new_post_date );

		if ( $parent > 0 ) {
			$post_parent = $parent;
			$post_status = $post_status ? $post_status : 'publish';
			$suffix      = '';
		} else {
			$post_parent = $post->post_parent;
			$post_status = $post_status ? $post_status : 'draft';
			$suffix      = ' ' . __( '(Copy)', '@@textdomain' );
		}

		// Insert the new template in the post table.
		$wpdb->insert(
			$wpdb->posts,
			array(
				'post_author'           => $new_post_author->ID,
				'post_date'             => $new_post_date,
				'post_date_gmt'         => $new_post_date_gmt,
				'post_content'          => $post->post_content,
				'post_content_filtered' => $post->post_content_filtered,
				'post_title'            => $post->post_title . $suffix,
				'post_excerpt'          => $post->post_excerpt,
				'post_status'           => $post_status,
				'post_type'             => $post->post_type,
				'comment_status'        => $post->comment_status,
				'ping_status'           => $post->ping_status,
				'post_password'         => $post->post_password,
				'to_ping'               => $post->to_ping,
				'pinged'                => $post->pinged,
				'post_modified'         => $new_post_date,
				'post_modified_gmt'     => $new_post_date_gmt,
				'post_parent'           => $post_parent,
				'menu_order'            => $post->menu_order,
				'post_mime_type'        => $post->post_mime_type,
			)
		);

		$new_post_id = $wpdb->insert_id;

		// Copy the taxonomies.
		$this->duplicate_template_taxonomies( $post->ID, $new_post_id, $post->post_type );

		// Copy the meta information.
		$this->duplicate_template_meta( $post->ID, $new_post_id );

		// Copy the children (variations).
		$exclude = apply_filters( 'coblocks_duplicate_template_exclude_children', false );

		if ( ! $exclude && ( $children_portfolios = get_children( 'post_parent=' . $post->ID . '&post_type=portfolio_variation' ) ) ) {
			foreach ( $children_portfolios as $child ) {
				$this->duplicate_template( $this->get_portfolio_to_duplicate( $child->ID ), $new_post_id, $child->post_status );
			}
		}

		return $new_post_id;
	}

	/**
	 * Get a portfolio from the database to duplicate
	 *
	 * @param mixed $id
	 * @return WP_Post|bool
	 * @todo Returning false? Need to check for it in...
	 * @see duplicate_template
	 */
	private function get_portfolio_to_duplicate( $id ) {
		global $wpdb;

		$id = absint( $id );

		if ( ! $id ) {
			return false;
		}

		$post = $wpdb->get_results( "SELECT * FROM $wpdb->posts WHERE ID=$id" );

		if ( isset( $post->post_type ) && $post->post_type == 'revision' ) {
			$id   = $post->post_parent;
			$post = $wpdb->get_results( "SELECT * FROM $wpdb->posts WHERE ID=$id" );
		}

		return $post[0];
	}

	/**
	 * Copy the taxonomies of a post to another post
	 *
	 * @param mixed $id
	 * @param mixed $new_id
	 * @param mixed $post_type
	 */
	private function duplicate_template_taxonomies( $id, $new_id, $post_type ) {
		$exclude    = array_filter( apply_filters( 'coblocks_duplicate_template_exclude_taxonomies', array() ) );
		$taxonomies = array_diff( get_object_taxonomies( $post_type ), $exclude );

		foreach ( $taxonomies as $taxonomy ) {
			$post_terms       = wp_get_object_terms( $id, $taxonomy );
			$post_terms_count = sizeof( $post_terms );

			for ( $i = 0; $i < $post_terms_count; $i++ ) {
				wp_set_object_terms( $new_id, $post_terms[ $i ]->slug, $taxonomy, true );
			}
		}
	}

	/**
	 * Copy the meta information of a post to another post
	 *
	 * @param mixed $id
	 * @param mixed $new_id
	 */
	private function duplicate_template_meta( $id, $new_id ) {
		global $wpdb;

		$sql     = $wpdb->prepare( "SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id = %d", absint( $id ) );
		$exclude = array_map( 'esc_sql', array_filter( apply_filters( 'coblocks_duplicate_template_exclude_meta', array( 'total_sales' ) ) ) );

		if ( sizeof( $exclude ) ) {
			$sql .= " AND meta_key NOT IN ( '" . implode( "','", $exclude ) . "' )";
		}

		$post_meta = $wpdb->get_results( $sql );

		if ( sizeof( $post_meta ) ) {
			$sql_query_sel = array();
			$sql_query     = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";

			foreach ( $post_meta as $post_meta_row ) {
				$sql_query_sel[] = $wpdb->prepare( 'SELECT %d, %s, %s', $new_id, $post_meta_row->meta_key, $post_meta_row->meta_value );
			}

			$sql_query .= implode( ' UNION ALL ', $sql_query_sel );
			$wpdb->query( $sql_query );
		}
	}
}

return new CoBlocks_Duplicate_Template();
