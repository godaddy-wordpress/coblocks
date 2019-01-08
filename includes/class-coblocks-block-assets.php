<?php
/**
 * Load @@pkg.title block assets.
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
 * Main @@pkg.title Class
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
	 * The base directory path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_dir;

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The Plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The Plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_version = COBLOCKS_VERSION;
		$this->_slug    = 'coblocks';
		$this->_dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'init', array( $this, 'register_blocks' ), 99 );
		add_action( 'init', array( $this, 'editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'localization' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'fonts_loader' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'fonts_loader' ) );
		// add_action( 'wp_enqueue_scripts', array( $this, 'google_map_assets' ) );
		// add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'wp_footer', array( $this, 'footer_assets' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->_slug;

		register_block_type(
			$slug . '/accordion', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/alert', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/author', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/click-to-tweet', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/dynamic-separator', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gif', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/gist', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
		register_block_type(
			$slug . '/highlight', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_enqueue_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			array(),
			$this->_version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		wp_register_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array(),
			$this->_version
		);

		// Scripts.
		wp_register_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-plugins', 'wp-components', 'wp-edit-post', 'wp-api' ),
			time(),
			true
		);
	}

	/**
	 * Enqueue Jed-formatted localization data.
	 *
	 * @access public
	 */
	public function localization() {

		// Check if this function exists.
		if ( ! function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			return;
		}

		$locale  = gutenberg_get_jed_locale_data( $this->_slug );
		$content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ' );';

		wp_script_add_data( $this->_slug . '-editor', 'data', $content );
	}

	/**
	 * Load fonts.
	 *
	 * @access public
	 */
	public function fonts_loader() {
		global $post;

		if ( $post && isset( $post->ID ) ) {

			$fonts = get_post_meta( $post->ID, '_coblocks_attr', true );

			if ( ! empty( $fonts ) ) {
				$fonts  = array_unique( explode( ',', $fonts ) );
				$system = array(
					'Arial',
					'Tahoma',
					'Verdana',
					'Helvetica',
					'Times New Roman',
					'Trebuchet MS',
					'Georgia',
				);

				$gfonts      = '';
				$gfonts_attr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

				foreach ( $fonts as $font ) {
					if ( ! in_array( $font, $system, true ) && ! empty( $font ) ) {
						$gfonts .= str_replace( ' ', '+', trim( $font ) ) . $gfonts_attr . '|';
					}
				}

				if ( ! empty( $gfonts ) ) {
					$query_args = array(
						'family' => $gfonts,
					);

					wp_register_style(
						'coblocks-plugin-fonts',
						add_query_arg( $query_args, '//fonts.googleapis.com/css' ),
						array(),
						$this->_version
					);

					wp_enqueue_style( 'coblocks-plugin-fonts' );
				}

				// Reset.
				$gfonts = '';
			}
		}
	}

	/**
	 * Enqueue front-end assets for blocks.
	 *
	 * @access public
	 */
	public function google_map_assets() {
		global $post;
		// Retrieve the Google Maps API key.
		$key = get_option( 'coblocks_google_maps_api_key' );
		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );
		// Google Maps block.
		if ( $key && ( $post && null !== $post->post_content && strpos( $post->post_content, 'wp-block-coblocks-google-map' ) ) ) {
			wp_enqueue_script(
				$this->_slug . '-google-maps',
				$dir . $this->_slug . '-google-maps' . COBLOCKS_ASSET_SUFFIX . '.js',
				array( 'jquery' ),
				$this->_version,
				true
			);
			wp_enqueue_script(
				$this->_slug . '-google-maps-api',
				'https://maps.googleapis.com/maps/api/js?key=' . $key,
				array( $this->_slug . '-google-maps' ),
				$this->_version,
				true
			);
			wp_localize_script( $this->_slug . '-google-maps', 'baAtts', array( 'url' => $this->_url ) );
		}
	}

	/**
	 * Register block settings.
	 *
	 * @access public
	 */
	public function register_settings() {
		register_setting(
			'coblocks_google_maps_api_key',
			'coblocks_google_maps_api_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google Map API key for map rendering', '@@textdomain' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);
	}

	/**
	 * Footer Styling
	 *
	 * @access public
	 */
	public function footer_assets() {
		global $post;

		if ( $post && isset( $post->ID ) ) {
			$meta    = get_post_meta( $post->ID, '_coblocks_dimensions', true );
			$desktop = array();
			$tablet  = array();
			$mobile  = array();
			if ( $meta ) {
				$meta = json_decode( $meta );
				if ( ! empty( $meta ) ) {
					echo '<!-- CoBlocks Styles -->';
					echo '<style>';
					foreach ( $meta as $k => $block ) {
						echo '.' . $k . ' > div {';
						if ( ! empty( $block ) ) {
							foreach ( $block as $key => $style ) {
								if ( ! empty( $style ) ) {
									foreach ( $style as $ky => $value ) {
										if ( strpos( $ky, 'Mobile' ) !== false ) {
											$mobile[] = strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', str_replace( 'Mobile', '', $ky ) ) ) . ':' . $value . ';';
										} elseif ( strpos( $ky, 'Tablet' ) !== false ) {
											$tablet[] = strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', str_replace( 'Tablet', '', $ky ) ) ) . ':' . $value . ';';
										} else {
											echo strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', $ky ) ) . ':' . $value . ';';
										}
									}
								}
							}
						}
						echo '}';

						if ( ! empty( $tablet ) ) {
							echo '@media (max-width: ' . apply_filters( 'coblocks_tablet_breakpoint', '768px' ) . ') {';
								echo '.' . $k . ' > div{';
							foreach ( $tablet as $tab ) {
								echo $tab;
							}
								echo '}';
							echo '}';
						}

						if ( ! empty( $mobile ) ) {
							echo '@media (max-width: ' . apply_filters( 'coblocks_desktop_breakpoint', '514px' ) . ') {';
								echo '.' . $k . ' > div{';
							foreach ( $mobile as $mobi ) {
								echo $mobi;
							}
								echo '}';
							echo '}';
						}

						// Reset media queries.
						$tablet = array();
						$mobile = array();
					}
					echo '</style><!-- End CoBlocks Styles -->';
				}
			}
		}
	}
}

CoBlocks_Block_Assets::register();
