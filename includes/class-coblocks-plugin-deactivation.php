<?php
/**
 * Register plugin deactivation class.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * CoBlocks_Plugin_Deactivation Class
 *
 * @since NEXT
 */
class CoBlocks_Plugin_Deactivation {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_footer-plugins.php', array( $this, 'admin_coblocks_deactivation_modal' ) );

		add_filter( 'admin_enqueue_scripts', array( $this, 'equeue_scripts' ) );
	}

	/**
	 * Loads the asset file for the given script or style.
	 * Returns a default if the asset file is not found.
	 *
	 * @param string $filepath The name of the file without the extension.
	 *
	 * @return array The asset file contents.
	 */
	public function get_asset_file( $filepath ) {
		$asset_path = COBLOCKS_PLUGIN_DIR . $filepath . '.asset.php';

		return file_exists( $asset_path )
			? include $asset_path
			: array(
				'dependencies' => array(),
				'version'      => COBLOCKS_VERSION,
			);
	}

	/**
	 * Register meta.
	 */
	public function equeue_scripts() {

		global $pagenow;

		if ( 'plugins.php' !== $pagenow ) {

			return;

		}

		$name       = 'coblocks-plugin-deactivation';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		// Enqueue modal script.
		wp_enqueue_script(
			'coblocks-plugin-deactivation',
			COBLOCKS_PLUGIN_URL . $filepath . '.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		// Pass data.
		wp_localize_script(
			'coblocks-plugin-deactivation',
			'coblocksDeactivateData',
			array(
				'hostname'        => gethostname(),
				'domain'          => site_url(),
				'coblocksVersion' => COBLOCKS_VERSION,
				'wpVersion'       => $GLOBALS['wp_version'],
			)
		);

		// Styles.
		$name       = 'style-coblocks-plugin-deactivation';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );
		$rtl        = ! is_rtl() ? '' : '-rtl';

		wp_enqueue_style(
			'coblocks-plugin-deactivation',
			COBLOCKS_PLUGIN_URL . $filepath . $rtl . '.css',
			array(),
			$asset_file['version']
		);
	}

	/**
	 *  Output React binding Div.
	 */
	public function admin_coblocks_deactivation_modal() {
		// Add CoBlocks Deactivation Modal backdrop to the DOM.
		?>

		<div id="coblocks-plugin-deactivate-modal"></div>

		<?php
	}

}

return new CoBlocks_Plugin_Deactivation();
