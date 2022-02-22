<?php
/**
 * Register theme deactivation class.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Go_Theme_Deactivation Class
 *
 * @since NEXT
 */
class CoBlocks_Go_Theme_Deactivation {

	const CONTAINER_CLASS = 'go-theme-deactivate-modal';

	/**
	 * Constructor
	 */
	public function __construct() {

		if ( 'go' !== get_option( 'stylesheet' ) ) {

			return;

		}

		add_action( 'admin_footer-themes.php', array( $this, 'admin_go_deactivation_modal' ) );

		add_filter( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

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
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_scripts( $hook_suffix ) {

		if ( 'themes.php' !== $hook_suffix ) {

			return;

		}

		$name       = 'go-theme-deactivation';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		// Enqueue modal script.
		wp_enqueue_script(
			'go-theme-deactivation',
			COBLOCKS_PLUGIN_URL . $filepath . '.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		$wpnux_export_data = json_decode( get_option( 'wpnux_export_data', '[]' ), true );

		// Pass data.
		wp_localize_script(
			'go-theme-deactivation',
			'goThemeDeactivateData',
			array(
				'containerClass' => self::CONTAINER_CLASS,
				'hostname'       => gethostname(),
				'domain'         => site_url(),
				'goThemeVersion' => GO_VERSION,
				'wpVersion'      => $GLOBALS['wp_version'],
				'wpOptions'      => array(
					'persona' => isset( $wpnux_export_data['_meta']['persona'] ) ? $wpnux_export_data['_meta']['persona'] : null,
					'skill'   => isset( $wpnux_export_data['_meta']['skill'] ) ? $wpnux_export_data['_meta']['skill'] : null,
				),
			)
		);

		// Styles.
		$name     = 'style-go-theme-deactivation';
		$filepath = 'dist/' . $name;
		$rtl      = ! is_rtl() ? '' : '-rtl';

		wp_enqueue_style(
			'go-theme-deactivation',
			COBLOCKS_PLUGIN_URL . $filepath . $rtl . '.css',
			array( 'wp-components' ),
			$asset_file['version']
		);

	}

	/**
	 * Add Go Theme Deactivation Modal backdrop to the DOM.
	 */
	public function admin_go_deactivation_modal() {

		?>

		<div id="<?php echo esc_attr( self::CONTAINER_CLASS ); ?>"></div>

		<?php

	}

}

return new CoBlocks_Go_Theme_Deactivation();
