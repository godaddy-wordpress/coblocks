<?php
/**
 * Add admin styles and scripts.
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
 * Add admin scripts and styles.
 */
class CoBlocks_Admin_Styles {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'load_style' ), 100 );
	}

	/**
	 * Get all relevant screen ids.
	 *
	 * @return array
	 */
	public function get_screen_ids() {

		$screen_ids = array(
			'dashboard', // Dashboard Widget.
			'coblocks', // All Templates View.
			'edit-coblocks', // Single Edit Template.
			'dashboard_page_coblocks--welcome', // Welcome Page
		);

		return apply_filters( 'coblocks_screen_ids', $screen_ids );
	}

	/**
	 * Load Scripts
	 *
	 * Enqueues the required scripts.
	 *
	 * @return void
	 */
	public function load_style() {

		global $wp_query;

		$screen    = get_current_screen();
		$screen_id = $screen ? $screen->id : '';

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'styles' );

		// Register styles.
		wp_register_style( 'coblocks-admin', $dir . 'coblocks-admin' . COBLOCKS_ASSET_SUFFIX . '.css', COBLOCKS_VERSION, true );

		// Only enqueue admin scripts and styles on relevant pages.
		if ( in_array( $screen_id, $this->get_screen_ids(), true ) ) {
			wp_enqueue_style( 'coblocks-admin' );
		}
	}
}

new CoBlocks_Admin_Styles();
