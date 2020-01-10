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
	 * The base URL path (without trailing slash).
	 *
	 * @var string $url
	 */
	private $url;

	/**
	 * The plugin version.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->slug = 'coblocks';
		$this->url  = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'the_post', array( $this, 'frontend_scripts' ) );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_enqueue_style(
			$this->slug . '-frontend',
			$this->url . '/dist/blocks.style.build.css',
			array(),
			COBLOCKS_VERSION
		);

		/**
		 * Filters whether to load utility styles.
		 *
		 * @param bool $load_utility_styles whether the utility css should be loaded. Default false.
		 */
		$load_utility_styles = (bool) apply_filters( 'coblocks_utility_styles_enabled', false );

		if ( $load_utility_styles ) {

			// Mock wp_enqueue_style for utility styles.
			wp_enqueue_style(
				$this->slug . '-utilities',
				$this->url . '/dist/utilities.style.build.css',
				array(),
				COBLOCKS_VERSION
			);
		};
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		wp_register_style(
			$this->slug . '-editor',
			$this->url . '/dist/blocks.editor.build.css',
			array(),
			COBLOCKS_VERSION
		);

		// Scripts.
		wp_register_script(
			$this->slug . '-editor',
			$this->url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api', 'wp-rich-text', 'wp-editor' ),
			COBLOCKS_VERSION,
			false
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
			$this->slug . '-editor',
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
		if ( has_block( $this->slug . '/gallery-masonry' ) ) {
			wp_enqueue_script(
				$this->slug . '-masonry',
				$dir . $this->slug . '-masonry' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Carousel block.
		if ( has_block( $this->slug . '/gallery-carousel' ) ) {

			wp_enqueue_script(
				$this->slug . '-flickity',
				$vendors_dir . '/flickity' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);

		}

		// Post Carousel block.
		if ( has_block( $this->slug . '/post-carousel' ) ) {
			wp_enqueue_script(
				$this->slug . '-slick',
				$vendors_dir . '/slick' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
			wp_enqueue_script(
				$this->slug . '-slick-initializer-front',
				$dir . $this->slug . '-slick-initializer-front' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Lightbox.
		if ( has_block( $this->slug . '/gallery-masonry' ) || has_block( $this->slug . '/gallery-stacked' ) || has_block( $this->slug . '/gallery-collage' ) || has_block( $this->slug . '/gallery-carousel' ) || has_block( $this->slug . '/gallery-offset' ) ) {
			wp_enqueue_script(
				$this->slug . '-lightbox',
				$dir . $this->slug . '-lightbox' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				COBLOCKS_VERSION,
				true
			);
		}
	}

}

CoBlocks_Block_Assets::register();
