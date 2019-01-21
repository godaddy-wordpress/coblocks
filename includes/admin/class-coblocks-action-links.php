<?php
/**
 * Add links to @@pkg.title on the plugins admin page.
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
class CoBlocks_Action_Links {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2 );
		add_filter( 'plugin_action_links_' . plugin_basename( COBLOCKS_PLUGIN_DIR . 'class-coblocks.php' ), array( $this, 'plugin_action_links' ) );
	}

	/**
	 * Add links to the settings page to the plugin.
	 *
	 * @param       array|array $links The plugin links.
	 * @return      array
	 */
	public function plugin_action_links( $links ) {

		// Return early if we do not have a pro version or Pro is activated.
		if ( ! CoBlocks()->has_pro() || CoBlocks()->is_pro() ) {
			return $links;
		}

		// Generator the upgrade link.
		$url_generator = new CoBlocks_URL_Generator();

		$url = $url_generator->get_store_url(
			'pricing',
			array(
				'utm_medium'   => 'coblocs-lite',
				'utm_source'   => 'plugins-page',
				'utm_campaign' => 'plugins-row',
				'utm_content'  => 'go-pro',
			)
		);

		$links['go_pro'] = sprintf( '<a href="%1$s" target="_blank" class="coblocks-plugins-gopro" style="color: #39b54a;font-weight: 700;">%2$s</a>', esc_url( $url ), esc_html__( 'Go Pro', '@@textdomain' ) );

		return $links;
	}

	/**
	 * Plugin row meta links
	 *
	 * @param array  $plugin_meta An array of the plugin's metadata.
	 * @param string $plugin_file Path to the plugin file.
	 * @return array $input
	 */
	public function plugin_row_meta( $plugin_meta, $plugin_file ) {

		// Check if this is defined.
		if ( ! defined( 'COBLOCKS_PLUGIN_BASE' ) ) {
			define( 'COBLOCKS_PLUGIN_BASE', null );
		}

		$url_generator = new CoBlocks_URL_Generator();

		$support_url = $url_generator->get_store_url(
			'/',
			array(
				'utm_medium'   => 'coblocks-lite',
				'utm_source'   => 'plugins-page',
				'utm_campaign' => 'plugins-row',
				'utm_content'  => 'help-and-faqs',
			)
		);

		if ( COBLOCKS_PLUGIN_BASE === $plugin_file ) {
			$row_meta = [
				'docs'   => '<a href="' . esc_url( $support_url ) . '" aria-label="' . esc_attr( __( 'View CoBlocks Documentation', '@@textdomain' ) ) . '" target="_blank">' . __( 'Help & FAQs', '@@textdomain' ) . '</a>',
				'review' => '<a href="' . esc_url( COBLOCKS_REVIEW_URL ) . '" aria-label="' . esc_attr( __( 'Review CoBlocks on WordPress.org', '@@textdomain' ) ) . '" target="_blank">' . __( 'Leave a Review', '@@textdomain' ) . '</a>',
			];

			$plugin_meta = array_merge( $plugin_meta, $row_meta );
		}

		return $plugin_meta;
	}
}

new CoBlocks_Action_Links();
