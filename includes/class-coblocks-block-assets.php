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
	 *
	 * @return CoBlocks_Block_Assets
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Block_Assets();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'frontend_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_scripts' ) );
		add_action( 'save_post_wp_template_part', array( $this, 'clear_template_transients' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_only_scripts' ) );
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
	 * Enqueue scripts that should only be available on the front end
	 */
	public function frontend_only_scripts() {
		// Define where the asset is loaded from.
		$dir = CoBlocks()->asset_source( 'js' );

		// Define where the vendor asset is loaded from.
		$vendors_dir = CoBlocks()->asset_source( 'js/vendors' );

		// Gist block.
		// only want this loading in front end.
		if ( has_block( 'coblocks/gist' ) || has_block( 'core/embed' ) ) {
			wp_enqueue_script(
				'coblocks-gist',
				$dir . 'coblocks-gist.js',
				array(),
				COBLOCKS_VERSION,
				true
			);
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {
		global $post;

		// Only load the front end CSS if a Coblock is in use.
		$has_coblock = ! is_singular();

		if ( ! is_admin() && is_singular() ) {
			$wp_post = get_post( $post );

			// This is similar to has_block() in core, but will match anything
			// in the coblocks/* namespace.
			if ( $wp_post instanceof WP_Post ) {

				$has_coblock = $this->has_coblocks_block( $wp_post );

			}

			$coblocks_template_part_query = get_transient( 'coblocks_template_parts_query' );

			if ( false === $coblocks_template_part_query ) {

				// Determine if template parts contain any coblocks/* namespace.
				$coblocks_template_part_query = get_posts(
					array(
						'post_type'      => 'wp_template_part',
						'posts_per_page' => -1,
					)
				);

				set_transient( 'coblocks_template_parts_query', $coblocks_template_part_query, WEEK_IN_SECONDS );

			}

			if ( ! $has_coblock && ! empty( $coblocks_template_part_query ) ) {

				foreach ( $coblocks_template_part_query as $template_part ) {

					if ( $this->has_coblocks_block( $template_part ) ) {

						$has_coblock = true;

					}
				}
			}
		}

		if ( ! $has_coblock && ! $this->is_page_gutenberg() && ! $this->has_coblocks_animation() ) {
			return;
		}

		// Styles.
		$name       = 'style-coblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );
		$rtl        = ! is_rtl() ? '' : '-rtl';

		wp_enqueue_style(
			'coblocks-frontend',
			COBLOCKS_PLUGIN_URL . $filepath . $rtl . '.css',
			array(),
			$asset_file['version']
		);

		$name       = 'style-coblocks-extensions';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );
		$rtl        = ! is_rtl() ? '' : '-rtl';

		wp_enqueue_style(
			'coblocks-extensions',
			COBLOCKS_PLUGIN_URL . $filepath . $rtl . '.css',
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
		// Define where the vendor asset is loaded from.
		$vendors_dir = CoBlocks()->asset_source( 'js/vendors' );

		// Styles.
		$name       = 'coblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );
		$rtl        = ! is_rtl() ? '' : '-rtl';

		wp_enqueue_style(
			'coblocks-editor',
			COBLOCKS_PLUGIN_URL . $filepath . $rtl . '.css',
			array(),
			$asset_file['version']
		);

		$name       = 'coblocks-extensions';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		global $pagenow;

		// Prevent wp-edit-post and coblocks settings/patterns plugins from loading on the widgets.php page.
		if ( 'widgets.php' === $pagenow ) {
			$script_key = array_search( 'wp-edit-post', $asset_file['dependencies'], true );

			if ( false !== $script_key ) {
				unset( $asset_file['dependencies'][ $script_key ] );
			}

			add_filter( 'coblocks_show_settings_panel', '__return_false' );
			add_filter( 'coblocks_patterns_show_settings_panel', '__return_false' );
		}

		wp_enqueue_script(
			'coblocks-editor',
			COBLOCKS_PLUGIN_URL . $filepath . '.js',
			array_merge( $asset_file['dependencies'], array( 'wp-api' ) ),
			$asset_file['version'],
			true
		);

		foreach ( glob( COBLOCKS_PLUGIN_DIR . 'dist/coblocks-*.js' ) as $file ) {
			$name = str_replace( '.js', '', basename( $file ) ); // coblocks-1.

			if ( ! preg_match( '/coblocks-\d+/', $name ) ) {
				continue;
			}

			$filepath   = 'dist/' . $name;
			$asset_file = $this->get_asset_file( $filepath );

			// Prevent wp-editor from loading on the widgets.php page.
			if ( 'widgets.php' === $pagenow ) {
				$script_key = array_search( 'wp-editor', $asset_file['dependencies'], true );

				if ( false !== $script_key ) {
					unset( $asset_file['dependencies'][ $script_key ] );
				}
			}

			wp_enqueue_script(
				$name,
				COBLOCKS_PLUGIN_URL . $filepath . '.js',
				array_merge( $asset_file['dependencies'], array( 'wp-api', 'coblocks-editor' ) ),
				$asset_file['version'],
				true
			);
		}

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

		/**
		 * Filter to disable the animation controls
		 *
		 * @param bool    true Whether or not the controls are enabled.
		 * @param integer $post_id Current post ID.
		 */
		$animation_controls_enabled = (bool) apply_filters( 'coblocks_animation_controls_enabled', true, (int) $post_id );

		/**
		 * Filter to disable all bundled CoBlocks svg icons
		 *
		 * @param bool true Whether or not the bundled icons are displayed.
		 */
		$bundled_icons_enabled = (bool) apply_filters( 'coblocks_bundled_icons_enabled', true );

		$form         = new CoBlocks_Form();
		$form_subject = $form->default_subject();
		$success_text = $form->default_success_text();

		wp_localize_script(
			'coblocks-editor',
			'coblocksBlockData',
			array(
				'form'                           => array(
					'adminEmail'   => $email_to,
					'emailSubject' => $form_subject,
					'successText'  => $success_text,
				),
				'cropSettingsOriginalImageNonce' => wp_create_nonce( 'cropSettingsOriginalImageNonce' ),
				'cropSettingsNonce'              => wp_create_nonce( 'cropSettingsNonce' ),
				'labsSiteDesignNonce'            => wp_create_nonce( 'labsSiteDesignNonce' ),
				'bundledIconsEnabled'            => $bundled_icons_enabled,
				'customIcons'                    => $this->get_custom_icons(),
				'customIconConfigExists'         => file_exists( get_stylesheet_directory() . '/coblocks/icons/config.json' ),
				'typographyControlsEnabled'      => $typography_controls_enabled,
				'animationControlsEnabled'       => $animation_controls_enabled,
				'localeCode'                     => get_locale(),
				'baseApiNamespace'               => COBLOCKS_API_NAMESPACE,
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
		$vendors_dir = CoBlocks()->asset_source( 'js/vendors' );

		$previous_aria_label = __( 'Previous', 'coblocks' );
		$next_aria_label     = __( 'Next', 'coblocks' );

		// Enqueue for coblocks animations.
		wp_enqueue_script(
			'coblocks-animation',
			$dir . 'coblocks-animation.js',
			array(),
			COBLOCKS_VERSION,
			true
		);

		// Masonry block.
		if ( $this->has_masonry_v1_block() ) {
			wp_enqueue_script(
				'coblocks-masonry',
				$dir . 'coblocks-masonry.js',
				array( 'jquery', 'masonry', 'imagesloaded' ),
				COBLOCKS_VERSION,
				true
			);
		}

		// Carousel block.
		if ( $this->is_page_gutenberg() || has_block( 'coblocks/gallery-carousel' ) || has_block( 'core/block' ) ) {
			wp_enqueue_script(
				'coblocks-tiny-swiper',
				$vendors_dir . 'tiny-swiper.js',
				array(),
				COBLOCKS_VERSION,
				true
			);
		}

		wp_enqueue_script(
			'coblocks-tinyswiper-initializer',
			$dir . 'coblocks-tinyswiper-initializer.js',
			array(),
			COBLOCKS_VERSION,
			true
		);

		wp_localize_script(
			'coblocks-tinyswiper-initializer',
			'coblocksTinyswiper',
			array(
				'carouselPrevButtonAriaLabel' => $previous_aria_label,
				'carouselNextButtonAriaLabel' => $next_aria_label,
				'sliderImageAriaLabel'        => __( 'Image', 'coblocks' ),
			)
		);

		// Post Carousel block.
		if ( $this->is_page_gutenberg() || has_block( 'coblocks/post-carousel' ) || has_block( 'core/block' ) ) {
			wp_enqueue_script(
				'coblocks-post-carousel',
				$dir . 'coblocks-post-carousel.js',
				array(),
				COBLOCKS_VERSION,
				true
			);

			wp_localize_script(
				'coblocks-post-carousel',
				'coblocksPostCarousel',
				array(
					'carouselPrevButtonAriaLabel' => $previous_aria_label,
					'carouselNextButtonAriaLabel' => $next_aria_label,
				)
			);
		}

		// Events block.
		if ( $this->is_page_gutenberg() || has_block( 'coblocks/events' ) || has_block( 'core/block' ) ) {
			wp_enqueue_script(
				'coblocks-events',
				$dir . 'coblocks-events.js',
				array(),
				COBLOCKS_VERSION,
				true
			);

			wp_localize_script(
				'coblocks-events',
				'coblocksEvents',
				array(
					'carouselPrevButtonAriaLabel' => $previous_aria_label,
					'carouselNextButtonAriaLabel' => $next_aria_label,
				)
			);
		}

		// Counter block.
		if ( $this->is_page_gutenberg() || has_block( 'coblocks/counter' ) || has_block( 'core/block' ) ) {
			$asset_file = $this->get_asset_file( 'dist/js/coblocks-counter' );
			wp_enqueue_script(
				'coblocks-counter-script',
				$dir . 'coblocks-counter.js',
				$asset_file['dependencies'],
				COBLOCKS_VERSION,
				true
			);
		}

		// Services block.
		if ( $this->is_page_gutenberg() || has_block( 'coblocks/services' ) ) {
			$asset_file = $this->get_asset_file( 'dist/js/coblocks-services' );
			wp_enqueue_script(
				'coblocks-services-script',
				$dir . 'coblocks-services.js',
				$asset_file['dependencies'],
				COBLOCKS_VERSION,
				true
			);
		}

		// Lightbox.
		if (
			has_block( 'coblocks/gallery-masonry' ) ||
			has_block( 'coblocks/gallery-stacked' ) ||
			has_block( 'coblocks/gallery-collage' ) ||
			has_block( 'coblocks/gallery-carousel' ) ||
			has_block( 'coblocks/gallery-offset' ) ||
			has_block( 'core/gallery' ) ||
			has_block( 'core/image' ) ||
			has_block( 'core/block' )
		) {
			wp_enqueue_script(
				'coblocks-lightbox',
				$dir . 'coblocks-lightbox.js',
				array(),
				COBLOCKS_VERSION,
				true
			);
		}

		wp_localize_script(
			'coblocks-lightbox',
			'coblocksLightboxData',
			array(
				'closeLabel' => __( 'Close Gallery', 'coblocks' ),
				'leftLabel'  => __( 'Previous', 'coblocks' ),
				'rightLabel' => __( 'Next', 'coblocks' ),
			)
		);
	}

	/**
	 * Clear transient when wp_template_part is saved/updated
	 *
	 * @access public
	 * @since  2.14.2
	 */
	public function clear_template_transients() {

		delete_transient( 'coblocks_template_parts_query' );

	}

	/**
	 * Determine if the given post content contains any CoBlocks blocks
	 *
	 * @access public
	 * @since  2.14.2
	 * @param  WP_Post $post_object Post object.
	 *
	 * @return boolean True when post content contains a CoBlocks block.
	 */
	public function has_coblocks_block( WP_Post $post_object ) {

		return ! empty(
			array_filter(
				array(
					false !== strpos( $post_object->post_content, '<!-- wp:coblocks/' ),
					has_block( 'core/block', $post_object ),
					has_block( 'core/button', $post_object ),
					has_block( 'core/cover', $post_object ),
					has_block( 'core/heading', $post_object ),
					has_block( 'core/image', $post_object ),
					has_block( 'core/gallery', $post_object ),
					has_block( 'core/list', $post_object ),
					has_block( 'core/paragraph', $post_object ),
					has_block( 'core/pullquote', $post_object ),
					has_block( 'core/quote', $post_object ),
				)
			)
		);

	}

	/**
	 * Determine if the given post content contains any v1 Masonry block.
	 *
	 * @access public
	 * @since  2.22.0
	 *
	 * @return boolean True when post content contains a v1 Masonry block.
	 */
	public function has_masonry_v1_block() {
		$v1_regex = '/<!-- wp:coblocks\/gallery-masonry.*|\n*(coblocks-gallery--item).*|\n*<!-- \/wp:coblocks\/gallery-masonry -->/m';

		global $post;

		/**
		 * Resolves a fatal error bug on PHP 8+ with Timber.
		 *
		 * @see https://wordpress.org/support/topic/the-method-has_masonry_v1_block-produces-a-fatal-error-on-php-8-0-22-and-above/
		 */
		$post_content = ! empty( $post ) ? $post->post_content : get_the_content();

		preg_match_all( $v1_regex, $post_content, $matches );
		return isset( $matches[0] ) && isset( $matches[0][2] ) && ! empty( $matches[0][2] );
	}

	/**
	 * Return whether a post type should display the Block Editor.
	 *
	 * @param string $post_type The post_type slug to check.
	 */
	protected function is_post_type_gutenberg( $post_type ) {
		return use_block_editor_for_post_type( $post_type );
	}

	/**
	 * Return whether the page we are on is loading the Block Editor.
	 */
	protected function is_page_gutenberg() {
		if ( ! is_admin() ) {
			return false;
		}

		$admin_page = isset( $_SERVER['REQUEST_URI'] ) ? wp_basename( esc_url_raw( filter_var( wp_unslash( $_SERVER['REQUEST_URI'] ), FILTER_SANITIZE_URL ) ) ) : false;

		if ( ! $admin_page ) {
			return false;
		}

		if ( false !== strpos( $admin_page, 'post-new.php' ) && empty( $_GET['post_type'] ) ) {
			return true;
		}

		if ( false !== strpos( $admin_page, 'post-new.php' ) && isset( $_GET['post_type'] ) && $this->is_post_type_gutenberg( filter_input( INPUT_GET, wp_unslash( $_GET['post_type'] ), FILTER_SANITIZE_SPECIAL_CHARS ) ) ) {
			return true;
		}

		if ( false !== strpos( $admin_page, 'post.php' ) && isset( $_GET['post'] ) ) {
			$post = filter_input( INPUT_GET, wp_unslash( $_GET['post'] ) );
			if ( ! $post ) {
				return false;
			}
			$wp_post = get_post( htmlspecialchars( $post ) );
			if ( isset( $wp_post ) && isset( $wp_post->post_type ) && $this->is_post_type_gutenberg( $wp_post->post_type ) ) {
				return true;
			}
		}

		if ( false !== strpos( $admin_page, 'revision.php' ) && isset( $_GET['revision'] ) ) {
			$revision = filter_input( INPUT_GET, wp_unslash( $_GET['revision'] ) );
			if ( ! $revision ) {
				return false;
			}
			$wp_post     = get_post( htmlspecialchars( $revision ) );
			$post_parent = get_post( $wp_post->post_parent );
			if ( isset( $post_parent ) && isset( $post_parent->post_type ) && $this->is_post_type_gutenberg( $post_parent->post_type ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Determine if the page content contains an element with a coblocks-animate class.
	 *
	 * @return boolean True when an element on the page has .coblocks-animate class, else false.
	 */
	public function has_coblocks_animation() {
		global $post;

		/**
		 * Resolves a fatal error bug on PHP 8+ with Timber.
		 *
		 * @see https://wordpress.org/support/topic/the-method-has_masonry_v1_block-produces-a-fatal-error-on-php-8-0-22-and-above/
		 */
		$post_content = ! empty( $post ) ? $post->post_content : get_the_content();

		return false !== strpos( $post_content, 'coblocks-animate' );
	}
}

CoBlocks_Block_Assets::register();
