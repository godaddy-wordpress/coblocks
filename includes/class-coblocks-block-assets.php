<?php
/**
 * Load assets for our blocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class CoBlocks_Block_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_Assets();
		}
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'the_post', array( $this, 'frontend_scripts' ) );
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
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		$name       = 'coblocks-style';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		wp_enqueue_style(
			'coblocks-frontend',
			COBLOCKS_PLUGIN_URL . $filepath . '.css',
			array(),
			$asset_file['version']
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {
		// Styles.
		$name       = 'coblocks-editor';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		wp_register_style(
			'coblocks-editor',
			COBLOCKS_PLUGIN_URL . $filepath . '.css',
			array(),
			$asset_file['version']
		);

		// Scripts.
		$name       = 'coblocks';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		wp_register_script(
			'coblocks-editor',
			COBLOCKS_PLUGIN_URL . $filepath . '.js',
			array_merge( $asset_file['dependencies'], array( 'wp-api' ) ),
			$asset_file['version'],
			true
		);

		$post_id = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );

		/**
		 * Filter the default block email address value
		 *
		 * @param string  $to      Admin email.
		 * @param integer $post_id Current post ID.
		 */
		$email_to = (string) apply_filters( 'coblocks_form_default_email', get_option( 'admin_email' ), (int) $post_id );

		/**
		 * Filter to disable the typography controls
		 *
		 * @param bool    true Whether or not the controls are enabled.
		 * @param integer $post_id Current post ID.
		 */
		$typography_controls_enabled = (bool) apply_filters( 'coblocks_typography_controls_enabled', true, (int) $post_id );

		$form_subject = ( new CoBlocks_Form() )->default_subject();

		wp_localize_script(
			'coblocks-editor',
			'coblocksBlockData',
			array(
				'form'                           => array(
					'adminEmail'   => $email_to,
					'emailSubject' => $form_subject,
				),
				'cropSettingsOriginalImageNonce' => wp_create_nonce( 'cropSettingsOriginalImageNonce' ),
				'cropSettingsNonce'              => wp_create_nonce( 'cropSettingsNonce' ),
				'customIcons'                    => $this->get_custom_icons(),
				'typographyControlsEnabled'      => $typography_controls_enabled,
			)
		);

	}

	/**
	 * Load custom icons from the theme directory, if they exist
	 *
	 * @return array Custom icons array if they exist, else empty array.
	 */
	public function get_custom_icons() {

		$config = array();
		$icons  = glob( get_stylesheet_directory() . '/coblocks/icons/*.svg' );

		if ( empty( $icons ) ) {

			return array();

		}

		if ( file_exists( get_stylesheet_directory() . '/coblocks/icons/config.json' ) ) {

			$config = json_decode( file_get_contents( get_stylesheet_directory() . '/coblocks/icons/config.json' ), true );

		}

		$custom_icons = array();

		foreach ( $icons as $icon ) {

			$icon_slug = str_replace( '.svg', '', basename( $icon ) );
			$icon_name = ucwords( str_replace( '-', ' ', $icon_slug ) );

			if ( ! empty( $config ) ) {

				// Icon exists in directory, but not found in config.
				if ( ! array_key_exists( $icon_slug, $config ) ) {

					continue;

				}
			}

			ob_start();
			include $icon;
			$retrieved_icon = ob_get_clean();

			$custom_icons[ $icon_slug ] = array(
				'label'    => $icon_name,
				'keywords' => strtolower( $icon_name ),
				'icon'     => $retrieved_icon,
			);

		}

		if ( ! empty( $config ) ) {

			foreach ( $config as $icon => $metadata ) {

				if ( ! array_key_exists( $icon, $custom_icons ) ) {

					continue;

				}

				if ( array_key_exists( 'icon_outlined', $config[ $icon ] ) ) {

					$metadata['icon_outlined'] = file_exists( get_stylesheet_directory() . '/coblocks/icons/' . $metadata['icon_outlined'] ) ? file_get_contents( get_stylesheet_directory() . '/coblocks/icons/' . $metadata['icon_outlined'] ) : '';

				}

				$custom_icons[ $icon ] = array_replace_recursive( $custom_icons[ $icon ], array_filter( $metadata ) );

			}
		}
		return $custom_icons;

	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 * @since 1.9.5
	 */
	public function frontend_scripts() {

		// Custom scripts are not allowed in AMP, so short-circuit.
		if ( CoBlocks()->is_amp() ) {
			return;
		}

		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );

		// Define where the vendor asset is loaded from.
		$vendors_dir = CoBlocks()->asset_source( 'js', 'vendors' );

		// Masonry block.
		if ( has_block( 'coblocks/gallery-masonry' ) ) {
			wp_enqueue_script(
				'coblocks-masonry',
				$dir . 'coblocks-masonry.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Carousel block.
		if ( has_block( 'coblocks/gallery-carousel' ) ) {
			wp_enqueue_script(
				'coblocks-flickity',
				$vendors_dir . '/flickity.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);

			if ( has_block( 'coblocks/accordion' ) ) {
				wp_enqueue_script(
					'coblocks-accordion-carousel',
					$dir . 'coblocks-accordion-carousel.js',
					array( 'coblocks-flickity' ),
					COBLOCKS_VERSION,
					true
				);
			}
		}

		// Post Carousel block.
		if ( has_block( 'coblocks/post-carousel' ) ) {
			wp_enqueue_script(
				'coblocks-slick',
				$vendors_dir . '/slick.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
			wp_enqueue_script(
				'coblocks-slick-initializer-front',
				$dir . 'coblocks-slick-initializer-front.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Events block.
		if ( has_block( 'coblocks/events' ) ) {
			wp_enqueue_script(
				'coblocks-slick',
				$vendors_dir . '/slick.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
			wp_enqueue_script(
				'coblocks-events',
				$dir . 'coblocks-events.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Lightbox.
		if ( has_block( 'coblocks/gallery-masonry' ) || has_block( 'coblocks/gallery-stacked' ) || has_block( 'coblocks/gallery-collage' ) || has_block( 'coblocks/gallery-carousel' ) || has_block( 'coblocks/gallery-offset' ) ) {
			wp_enqueue_script(
				'coblocks-lightbox',
				$dir . 'coblocks-lightbox.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
		}
	}

}

CoBlocks_Block_Assets::register();
