<?php
/**
 * Admin footer.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @link      https://coblocks.com
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add rating links to the admin dashboard.
 */
class CoBlocks_Admin_Footer {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'admin_footer_text', array( $this, 'admin_footer_text' ) );
	}

	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since 1.6.0
	 * @access public
	 * @param string $footer_text The existing footer text.
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		global $pagenow, $post_type;

		if ( in_array( $pagenow, array( 'edit.php' ), true ) ) {
			$rate_text = sprintf(
				/* translators: 1: Link to plugin homepage, 2: Plugin name, 3. Link to WordPress.org rating page. */
				__( 'Thank you for using <a href="%1$s" target="_blank">%2$s</a>! Please <a href="%3$s" target="_blank">rate us on WordPress.org</a>.', '@@textdomain' ),
				esc_url( COBLOCKS_SHOP_URL ),
				'CoBlocks',
				esc_url( COBLOCKS_REVIEW_URL )
			);

			return $rate_text;
		}
	}
}

new CoBlocks_Admin_Footer();
