<?php
/**
 * Generates a link to our shop.
 *
 * @package   CoBlocks
 * @author    Rich Tabor & Jeffrey Carandang from CoBlocks
 * @link      https://coblocks.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generates a link.
 */
class CoBlocks_URL_Generator {

	/**
	 * Returns the URL to upgrade the plugin to the pro version.
	 * Can be overridden by theme developers to use their affiliate
	 * link using the login_designer_affiliate_id filter.
	 *
	 * @since  1.0.0
	 * @return string
	 */
	public function get_affiliate_id() {

		$id = array( 'ref' => apply_filters( 'coblocks_affiliate_id', null ) );

		return $id;
	}

	/**
	 * Returns a URL that points to the CoBlocks store.
	 *
	 * @since 1.0.0
	 * @param string|string $path A URL path to append to the store URL.
	 * @param array|array   $params An array of key/value params to add to the query string.
	 * @return string
	 */
	public function get_store_url( $path = '', $params = array() ) {

		$id = $this->get_affiliate_id();

		$params = array_merge( $params, $id );

		$url = trailingslashit( COBLOCKS_SHOP_URL . $path ) . '?' . http_build_query( $params, '', '&#038;' );

		return $url;
	}
}

return new CoBlocks_URL_Generator();
