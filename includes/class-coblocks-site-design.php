<?php
/**
 * CoBlocks Site Design
 *
 * @package CoBlocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Site_Design
 *
 * @package CoBlocks
 * @author  GoDaddy
 */
class CoBlocks_Site_Design {

	const EDITOR_WRAPPER_CLASS = 'editor-styles-wrapper';
	const API_ROUTE            = 'design';

	const COBLOCKS_ONLY_FONTS = array(
		array(
			'Cardo'  => array(
				'700',
			),
			'Roboto' => array(
				'400',
			),
		),
		array(
			'Yeseva One' => array(
				'400',
			),
			'Vollkorn'   => array(
				'400',
			),
		),
		array(
			'Anton'         => array(
				'400',
			),
			'IBM Plex Sans' => array(
				'400',
			),
		),
		array(
			'IBM Plex Mono_heading' => array(
				'600',
				'400',
			),
			'IBM Plex Mono_body'    => array(
				'400',
			),
		),
		array(
			'Recursive' => array(
				'900',
			),
			'Open Sans' => array(
				'400',
			),
		),
	);

	/**
	 * The requests params set for the ajax callback.
	 *
	 * @var array
	 */
	private $request_params;

	/**
	 * Class constructor
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );

		// short-circuit.
		if ( $this->short_circuit_check() ) {
			return array();
		}

		add_action( 'wp_ajax_site_design_update_design_style', array( $this, 'design_endpoint_ajax' ) );
		add_action( 'rest_api_init', array( $this, 'design_endpoint' ) );

		add_action(
			'admin_head',
			function() {
				printf( '<style id="site-design-styles">%s</style>', esc_html( $this->get_editor_styles() ) );
			}
		);

	}

	/**
	 * Check if we should short-circuit function calls.
	 *
	 * @return boolean
	 */
	public function short_circuit_check() {
		return 'go' !== get_stylesheet();
	}

	/**
	 * Enqueue the scripts and styles.
	 */
	public function get_coblocks_site_design_data() {
		// Permission check.
		if ( is_wp_error( $this->design_endpoint_permissions_check() ) ) {
			return array();
		}

		// short-circuit.
		if ( $this->short_circuit_check() ) {
			return array();
		}

		$current_design_style = \Go\Core\get_design_style();
		$fonts                = $this->get_go_fonts();

		$data = array(
			'apiRoute'               => self::API_ROUTE,
			'editorClass'            => self::EDITOR_WRAPPER_CLASS,
			'availableDesignStyles'  => \Go\Core\get_available_design_styles(),
			'currentDesignStyle'     => get_theme_mod( 'design_style', \Go\Core\get_default_design_style() ),
			'currentColorScheme'     => get_theme_mod( 'color_scheme', \Go\Core\get_default_color_scheme() ),
			'currentColors'          => array(
				'primary'    => get_theme_mod( 'primary_color' ),
				'secondary'  => get_theme_mod( 'secondary_color' ),
				'tertiary'   => get_theme_mod( 'tertiary_color' ),
				'background' => get_theme_mod( 'background_color' ),
			),
			'isAdvancedFontsEnabled' => false,
		);

		if ( version_compare( GO_VERSION, '1.3.9', '>' ) ) {
			$data = array_merge(
				$data,
				array( 'isAdvancedFontsEnabled' => true )
			);
		}

		if ( version_compare( GO_VERSION, '1.3.6', '>=' ) ) {
			$data = array_merge(
				$data,
				array(
					'currentFonts' => get_theme_mod( 'fonts', $current_design_style['fonts'] ),
					'fontSize'     => get_theme_mod( 'font_size', $current_design_style['font_size'] ),
					'typeRatio'    => get_theme_mod( 'type_ratio', $current_design_style['type_ratio'] ),
					'fonts'        => $fonts,
				)
			);
		}

		wp_add_inline_style(
			'coblocks-site-design',
			'.editor-post-title__input { height: auto !important; scrollbar-width: none; }'
		);

		return $data;

	}


	/**
	 * Register a design endpoint to deal with site design.
	 */
	public function design_endpoint() {
		register_rest_route(
			COBLOCKS_API_NAMESPACE,
			self::API_ROUTE,
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'design_endpoint_permissions_check' ),
				'callback'            => array( $this, 'update_design_style' ),
			)
		);
	}

	/**
	 * Check if the current user can edit theme options.
	 *
	 * @return true|WP_Error True if the user can edit theme options, WP_Error otherwise.
	 */
	public function design_endpoint_permissions_check() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return new WP_Error(
				'rest_forbidden',
				__( 'Sorry, you are not allowed to do that.', 'coblocks' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}
		return true;
	}

	/**
	 * Ajax callback for updating the design style.
	 */
	public function design_endpoint_ajax() {
		// Nonce check.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce' ), 'labsSiteDesignNonce' ) ) {
			wp_send_json_error( 'invalid_nonce', 403 );
		}

		// Permission check.
		if ( is_wp_error( $this->design_endpoint_permissions_check() ) ) {
			wp_send_json_error( 'invalid_permissions', 403 );
		}

		return $this->update_design_style();
	}

	/**
	 * Return array of Go fonts.
	 *
	 * @return array
	 */
	private function get_go_fonts() {
		// short-circuit.
		if ( $this->short_circuit_check() ) {
			return array();
		}

		$design_styles = \Go\Core\get_available_design_styles();

		$fonts = array_values(
			array_map(
				function( $design_style ) {
					return isset( $design_style['fonts'] ) ? $design_style['fonts'] : array();
				},
				$design_styles
			)
		);

		if ( version_compare( GO_VERSION, '1.3.9', '>' ) ) {
			$fonts = array_merge( $fonts, self::COBLOCKS_ONLY_FONTS );
		}

		return $fonts;
	}

	/**
	 * Set's the request params used in the ajax callback.
	 *
	 * @param array $args The parameters.
	 */
	public function set_request_params( array $args ) {
		$this->request_params = $this->sanitize_request_params( $args );
	}

	/**
	 * Get the sanitized request params.
	 *
	 * @return array
	 */
	public function get_request_params() {
		return $this->sanitize_request_params( $this->request_params );
	}

	/**
	 * Returns the sanitized request params.
	 *
	 * Uses INPUT_POST if params are not passed as an argument.
	 *
	 * @param array $request_params The passed params.
	 *
	 * @return array
	 */
	protected function sanitize_request_params( $request_params = null ) {
		$args = array(
			'design_style'     => FILTER_SANITIZE_SPECIAL_CHARS,
			'color_palette'    => FILTER_SANITIZE_SPECIAL_CHARS,
			'fonts'            => FILTER_SANITIZE_SPECIAL_CHARS,
			'font_size'        => FILTER_SANITIZE_SPECIAL_CHARS,
			'type_ratio'       => FILTER_VALIDATE_FLOAT,
			'should_update'    => FILTER_VALIDATE_BOOLEAN,
			'initial_load'     => FILTER_VALIDATE_BOOLEAN,
			'primary_color'    => FILTER_SANITIZE_SPECIAL_CHARS,
			'secondary_color'  => FILTER_SANITIZE_SPECIAL_CHARS,
			'tertiary_color'   => FILTER_SANITIZE_SPECIAL_CHARS,
			'background_color' => FILTER_SANITIZE_SPECIAL_CHARS,
		);

		return is_array( $request_params )
			? filter_var_array( $request_params, $args )
			: filter_input_array( INPUT_POST, $args );
	}

	/**
	 * Get the stylesheet content of current design style
	 *
	 * @param null $design_style design style object.
	 *
	 * @return string|string[]
	 */
	private function get_editor_styles( $design_style = null ) {
		if ( ! $design_style ) {
			$design_style = \Go\Core\get_design_style();
		}

		// @codingStandardsIgnoreStart
		$stylesheet = file_get_contents(
			sprintf(
				'%1$s/go/%2$s',
				get_theme_root(),
				str_replace( '.min', '', $design_style['editor_style'] )
			)
		);
		// @codingStandardsIgnoreEnd

		return str_replace(
			'../../../dist/images/',
			'/wp-content/themes/go/dist/images/',
			str_replace( ':root', '.' . self::EDITOR_WRAPPER_CLASS, $stylesheet )
		);
	}

	/**
	 * Retrieve the selected design style styles and return them for injection into the DOM
	 */
	public function update_design_style() {
		// short-circuit.
		if ( $this->short_circuit_check() ) {
			return array();
		}

		$request_params = $this->get_request_params();

		if ( ! $request_params ) {
			return new WP_Error(
				'rest_invalid',
				__( 'Error processing your request.', 'coblocks' ),
				array( 'status' => 500 )
			);
		}

		$selected_style = $request_params['design_style'];
		$color_palette  = $request_params['color_palette'];
		$fonts          = $request_params['fonts'];
		$font_size      = $request_params['font_size'];
		$type_ratio     = $request_params['type_ratio'];
		$should_update  = $request_params['should_update'];
		$initial_load   = $request_params['initial_load'];

		$custom_colors = array(
			'primary_color'    => $request_params['primary_color'],
			'secondary_color'  => $request_params['secondary_color'],
			'tertiary_color'   => $request_params['tertiary_color'],
			'background_color' => $request_params['background_color'],
		);

		if ( ! $selected_style ) {

			return new WP_Error(
				'rest_selected_style_invalid',
				__( 'A design_style must be passed.', 'coblocks' ),
				array( 'status' => 404 )
			);

		}

		$design_styles = \Go\Core\get_available_design_styles();

		if ( ! isset( $design_styles[ $selected_style ] ) ) {

			return new WP_Error(
				'rest_design_style_invalid',
				__( 'An available design_style must be passed.', 'coblocks' ),
				array( 'status' => 404 )
			);

		}

		$design_style  = $design_styles[ $selected_style ];
		$default_fonts = $this->get_go_fonts();

		if ( $should_update ) {

			set_theme_mod( 'design_style', $selected_style );
			set_theme_mod( 'color_scheme', $color_palette );

			if ( isset( $fonts, $font_size, $type_ratio ) ) {
				$fonts = json_decode( html_entity_decode( $fonts ), true );

				if ( is_array( $fonts ) && count( $fonts ) <= 3 ) {
					$avail_font_keys = str_replace( array( '_heading', '_body' ), '', array_keys( array_merge( ...$default_fonts ) ) ); // flatten array.
					$font_keys       = str_replace( array( '_heading', '_body' ), '', array_keys( $fonts ) );

					// Make sure the font pack selected are in the available list of fonts.
					if ( ! array_diff( $font_keys, $avail_font_keys ) ) {
						set_theme_mod( 'fonts', $fonts );
					}
				}

				set_theme_mod( 'font_size', $font_size );
				set_theme_mod( 'type_ratio', $type_ratio );
			}

			foreach ( $custom_colors as $theme_mod => $color ) {
				$theme_mod_string = str_replace( '_color', '', $theme_mod );
				$color            = ! empty( $color ) ? $color : $design_style['color_schemes'][ $color_palette ][ $theme_mod_string ];

				set_theme_mod( $theme_mod, $color );
			}
		}

		$fonts_string = array();

		foreach ( $default_fonts as $fonts ) {
			foreach ( $fonts as $font_name => $font_weights ) {
				$fonts_string[] = sprintf( '%1$s:%2$s', str_replace( array( '_heading', '_body' ), '', $font_name ), implode( ',', $font_weights ) );
			}
		}

		// Fonts take too long to load. So we are only fetching on first page load.
		$font_styles = $initial_load ? file_get_contents( // @codingStandardsIgnoreLine
			esc_url_raw(
				add_query_arg(
					array(
						'family'  => rawurlencode( implode( '|', $fonts_string ) ),
						'subset'  => rawurlencode( 'latin,latin-ext' ),
						'display' => 'swap',
					),
					'https://fonts.googleapis.com/css'
				)
			)
		) : false;

		return array(
			'stylesheet' => $this->get_editor_styles( $design_style ),
			'fontStyles' => $font_styles,
		);

	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {
		wp_localize_script(
			'coblocks-editor',
			'siteDesign',
			self::get_coblocks_site_design_data()
		);
	}

}
new CoBlocks_Site_Design();
