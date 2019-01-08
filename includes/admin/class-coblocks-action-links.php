<?php
/**
 * Add links to @@pkg.title on the plugins admin page.
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
 * Generates a link.
 */
class CoBlocks_Action_Links {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2 );
		add_filter( 'plugin_action_links_' . plugin_basename( COBLOCKS_PLUGIN_DIR . 'class-coblocks.php' ), array( $this, 'plugin_action_links' ) );
		add_filter( 'admin_footer_text', array( $this, 'admin_footer_text' ) );
	}

	/**
	 * Add links to the settings page to the plugin.
	 *
	 * @param       array|array $actions The plugin.
	 * @return      array
	 */
	public function plugin_action_links( $actions ) {

		// Add the Settings link.
		$settings = array( 'settings' => sprintf( '<a href="%s">%s</a>', admin_url( 'edit.php?post_type=coblocks' ), esc_html__( 'Templates', '@@textdomain' ) ) );

		return array_merge(
			$settings,
			$actions
		);
	}

	/**
	 * Plugin row meta links
	 *
	 * @param array|array   $input already defined meta links.
	 * @param string|string $file plugin file path and name being processed.
	 * @return array $input
	 */
	public function plugin_row_meta( $input, $file ) {

		// Return early, for every other plugin except ours.
		if ( 'coblocks/class-coblocks.php' !== $file ) {
			return $input;
		}

		$url = CoBlocks_URL_Generator()->get_store_url(
			'support',
			array(
				'utm_medium'   => 'coblocks-lite',
				'utm_source'   => 'plugins-page',
				'utm_campaign' => 'plugins-row',
				'utm_content'  => 'extensions',
			)
		);

		$links = array(
			'<a href="' . esc_url( $url ) . '" target="_blank">' . esc_html__( 'Help & FAQ', '@@textdomain' ) . '</a>',
		);

		$input = array_merge( $input, $links );

		return $input;
	}

	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $footer_text The content that will be printed.
	 *
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		global $pagenow, $post_type;

		if ( ! in_array( $pagenow, array( 'edit.php' ) ) ) {
			return $footer_text;
		}

		if ( ! in_array( $post_type, array( 'coblocks' ) ) ) {
			return $footer_text;
		}

		$footer_text = sprintf(
			/* translators: 1: CoBlocks, 2: Link to plugin review */
			__( 'Enjoying %1$s? Please leave us a %2$s rating. We really appreciate your support!', '@@textdomain' ),
			'<strong>' . __( 'CoBlocks', '@@textdomain' ) . '</strong>',
			'<a href="https://wordpress.org/support/view/plugin-reviews/coblocks/" target="_blank">&#9733;&#9733;&#9733;&#9733;&#9733;</a>'
		);

		return $footer_text;
	}
}

new CoBlocks_Action_Links();
