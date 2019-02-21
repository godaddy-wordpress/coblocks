<?php
/**
 * Templates Post Type.
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
 * CoBlocks_Post_Type Class
 */
class CoBlocks_Post_Type {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'setup_post_type' ), 1 );
		add_action( 'admin_menu', array( $this, 'register_submenu' ), 1 );
		add_filter( 'enter_title_here', array( $this, 'default_title' ) );
		add_filter( 'post_updated_messages', array( $this, 'updated_messages' ) );
		add_filter( 'bulk_post_updated_messages', array( $this, 'bulk_updated_messages' ), 10, 2 );
		add_action( 'wp_before_admin_bar_render', array( $this, 'remove_new_item' ) );
	}

	/**
	 * Register 'coblocks' post type
	 *
	 * @return void
	 */
	public function setup_post_type() {

		$labels = apply_filters(
			'coblocks_labels', array(
				'name'               => _x( '%3$s', 'CoBlocks plugin name', '@@textdomain' ),
				'singular_name'      => _x( '%1$s', 'singular CoBlocks Template post type name', '@@textdomain' ),
				'add_new'            => esc_html__( 'Add New', '@@textdomain' ),
				'add_new_item'       => esc_html__( 'Add New %1$s', '@@textdomain' ),
				'edit_item'          => esc_html__( 'Edit %1$s', '@@textdomain' ),
				'new_item'           => esc_html__( 'New %1$s', '@@textdomain' ),
				'all_items'          => esc_html__( 'All Layouts', '@@textdomain' ),
				'view_item'          => esc_html__( 'View %1$s', '@@textdomain' ),
				'search_items'       => esc_html__( 'Search', '@@textdomain' ),
				'not_found'          => esc_html__( 'No %2$s found', '@@textdomain' ),
				'not_found_in_trash' => esc_html__( 'No %2$s Templates found in Trash', '@@textdomain' ),
				'menu_name'          => esc_html__( 'CoBlocks', '@@textdomain' ),
			)
		);

		foreach ( $labels as $key => $value ) {
			$labels[ $key ] = sprintf( $value, $this->get_singular_label(), $this->get_plural_label(), 'CoBlocks' );
		}

		// Menu icon.
		$svg = '<svg fill="#a0a5aa" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m4.26414583.01915857 7.65399957-.01909461c1.4476957-.0036116 1.9730418.14581421 2.5030049.42754356.5299632.28172936.9463642.69605707 1.2307358 1.22460786.2843716.5285508.4364185 1.0531452.4400359 2.50084368l.019125 7.65401434c.0036173 1.4476985-.1458061 1.973045-.4275329 2.503008-.2817267.5299631-.6960519.9463632-1.2246006 1.2307333-.5285486.28437-1.0531414.4364151-2.5008371.4400267l-7.6539996.0190946c-1.44769568.0036116-1.97304176-.1458142-2.50300491-.4275435-.52996316-.2817294-.94636416-.6960571-1.23073576-1.2246079s-.43641852-1.0531452-.44003586-2.5008437l-.019125-7.65401429c-.00361735-1.44769847.1458061-1.97304496.4275328-2.50300802.28172671-.52996305.69605197-.9463632 1.22460063-1.23073324.52854865-.28437005 1.05314144-.43641517 2.50083713-.44002678zm-.15303472 2.98084143c-.55228475 0-1 .44771525-1 1v8c0 .5522847.44771525 1 1 1h2c.55228475 0 1-.4477153 1-1v-8c0-.55228475-.44771525-1-1-1zm5.99999999 6c-.55228474 0-.99999999.44771525-.99999999 1v2c0 .5522847.44771525 1 .99999999 1h2c.5522848 0 1-.4477153 1-1v-2c0-.55228475-.4477152-1-1-1zm0-6c-.55228474 0-.99999999.44771525-.99999999 1v2c0 .55228475.44771525 1 .99999999 1h2c.5522848 0 1-.44771525 1-1v-2c0-.55228475-.4477152-1-1-1z" fill-rule="evenodd" transform="translate(1.888889 2)"/></svg>';

		$args = array(
			'labels'              => $labels,
			'public'              => false,
			'publicly_queryable'  => false,
			'show_in_nav_menus'   => false,
			'show_in_admin_bar'   => true,
			'exclude_from_search' => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 100,
			'menu_icon'           => 'data:image/svg+xml;base64,' . base64_encode( $svg ),
			'can_export'          => true,
			'delete_with_user'    => false,
			'show_in_rest'        => true,
			'hierarchical'        => false,
			'has_archive'         => false,
			'capability_type'     => 'post',
			'supports'            => apply_filters( 'coblocks_supports', array( 'title', 'editor', 'thumbnail', 'author', 'revisions', 'custom-fields' ) ),
		);

		// Register our post type.
		register_post_type( 'coblocks', apply_filters( 'coblocks_setup_post_type', $args ) );
	}

	/**
	 * Get default labels.
	 *
	 * @return array $defaults Default labels.
	 */
	public function labels() {

		$defaults = array(
			'singular' => esc_html__( 'Section', '@@textdomain' ),
			'plural'   => esc_html__( 'sections', '@@textdomain' ),
		);

		return apply_filters( 'coblocks_default_labels', $defaults );
	}

	/**
	 * Get Singular Label.
	 *
	 * @param bool $lowercase Is this lowercase or not.
	 */
	public function get_singular_label( $lowercase = false ) {
		$defaults = $this->labels();
		return ( $lowercase ) ? strtolower( $defaults['singular'] ) : $defaults['singular'];
	}

	/**
	 * Get Plural Label.
	 *
	 * @param bool $lowercase Is this lowercase or not.
	 */
	public function get_plural_label( $lowercase = false ) {
		$defaults = $this->labels();
		return ( $lowercase ) ? strtolower( $defaults['plural'] ) : $defaults['plural'];
	}

	/**
	 * Change default "Enter title here" input.
	 *
	 * @param string $title Default title placeholder text.
	 */
	public function default_title( $title ) {

		if ( ! is_admin() ) {
			$label = $this->get_singular_label( true );
			/* translators: Custom post type label */
			$title = sprintf( esc_html__( '%s name here', '@@textdomain' ), $label );
			return $title;
		}

		$screen = get_current_screen();

		if ( 'coblocks' === $screen->post_type ) {
			$label = $this->get_singular_label( true );
			/* translators: Custom post type label */
			$title = sprintf( esc_html__( 'Enter %s name here', '@@textdomain' ), $label );
		}

		return $title;
	}

	/**
	 * Updated Messages.
	 *
	 * Returns an array of with all updated messages.
	 *
	 * @param array $messages Post updated message.
	 */
	public function updated_messages( $messages ) {
		global $post;

		$url1 = '<a href="' . get_permalink( $post->ID ) . '">';
		$url2 = $this->get_singular_label();
		$url3 = '</a>';

		$messages['coblocks'] = array(
			1 => sprintf( esc_html__( '%2$s updated. %1$sView %2$s%3$s', '@@textdomain' ), $url1, $url2, $url3 ),
			4 => sprintf( esc_html__( '%2$s updated. %1$sView %2$s%3$s', '@@textdomain' ), $url1, $url2, $url3 ),
			6 => sprintf( esc_html__( '%2$s published. %1$sView %2$s%3$s', '@@textdomain' ), $url1, $url2, $url3 ),
			7 => sprintf( esc_html__( '%2$s saved. %1$sView %2$s%3$s', '@@textdomain' ), $url1, $url2, $url3 ),
			8 => sprintf( esc_html__( '%2$s submitted. %1$sView %2$s%3$s', '@@textdomain' ), $url1, $url2, $url3 ),
		);

		return $messages;
	}

	/**
	 * Updated bulk messages.
	 *
	 * @param array $bulk_messages Post updated messages.
	 * @param array $bulk_counts Post counts.
	 */
	public function bulk_updated_messages( $bulk_messages, $bulk_counts ) {
		$singular = $this->get_singular_label();
		$plural   = $this->get_plural_label();

		$bulk_messages['coblocks'] = array(
			'updated'   => sprintf( _n( '%1$s %2$s updated.', '%1$s %3$s updated', $bulk_counts['updated'], '@@textdomain' ), $bulk_counts['updated'], $singular, $plural ),
			'locked'    => sprintf( _n( '%1$s %2$s not updated, somebody is editing it', '%1$s %3$s not updated, somebody is editing them.', $bulk_counts['locked'], '@@textdomain' ), $bulk_counts['locked'], $singular, $plural ),
			'deleted'   => sprintf( _n( '%1$s %2$s permanently deleted', '%1$s %3$s permanently deleted.', $bulk_counts['deleted'], '@@textdomain' ), $bulk_counts['deleted'], esc_html__( 'CoBlocks Template', '@@textdomain' ), esc_html__( 'CoBlocks Templates', '@@textdomain' ) ),
			'trashed'   => sprintf( _n( '%1$s %2$s moved to the Trash', '%1$s %3$s moved to the Trash.', $bulk_counts['trashed'], '@@textdomain' ), $bulk_counts['trashed'], $singular, $plural ),
			'untrashed' => sprintf( _n( '%1$s %2$s restored from the Trash', '%1$s %3$s restored from the Trash.', $bulk_counts['untrashed'], '@@textdomain' ), $bulk_counts['untrashed'], $singular, $plural ),
		);

		return $bulk_messages;
	}

	/**
	 * Add Submenu for CoBlocks
	 */
	public function register_submenu() {
		global $submenu;

		$permalink = admin_url( 'edit.php?post_type=coblocks' );

		$add       = add_query_arg( 'add-new', 'section', $permalink );
		$templates = add_query_arg( 'coblocks_library_type', 'template', $permalink );
		$sections  = add_query_arg( 'coblocks_library_type', 'section', $permalink );

		foreach ( $submenu['edit.php?post_type=coblocks'] as $key => $value ) {
			if ( in_array( 'post-new.php?post_type=coblocks', $value, true ) ) {
				unset( $submenu['edit.php?post_type=coblocks'][ $key ] );
			}
		}

		$submenu['edit.php?post_type=coblocks'][] = array( esc_html__( 'Add New', '@@textdomain' ), 'manage_options', $add );
	}

	/**
	 * Remove "Add New Template" from the "New admin bar menu.
	 */
	public function remove_new_item() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu( 'new-coblocks' );
	}
}

return new CoBlocks_Post_Type();
