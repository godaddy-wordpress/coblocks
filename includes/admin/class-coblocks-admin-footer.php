<?php
/**
 * Admin footer.
 *
 * @package CoBlocks
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
				/* translators: 1: Link to plugin homepage, 2: Link to WordPress.org rating page. */
				__( 'Thank you for using %1$s! Please <a href="%2$s" target="_blank">rate us on WordPress.org</a>.', 'coblocks' ),
				'<a href="' . esc_url( COBLOCKS_SHOP_URL ) . '" target="_blank">CoBlocks</a>',
				esc_url( COBLOCKS_REVIEW_URL )
			);

			return $rate_text;
		}
	}
}

new CoBlocks_Admin_Footer();
