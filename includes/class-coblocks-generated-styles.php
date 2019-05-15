<?php
/**
 * Load generated styles for our blocks.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load footer assets for our blocks.
 *
 * @since 1.6.0
 */
class CoBlocks_Generated_Styles {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Generated_Styles
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Generated_Styles();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Footer Styling
	 *
	 * @access public
	 */
	public function enqueue_styles() {
		wp_add_inline_style( 'coblocks-frontend', $this->styles() );
	}

	/**
	 * Footer Styling
	 *
	 * @access public
	 */
	public function styles() {
		global $post;

		if ( $post && isset( $post->ID ) ) {

			$meta    = get_post_meta( $post->ID, '_coblocks_dimensions', true );
			$desktop = array();
			$tablet  = array();
			$mobile  = array();
			$output  = '';

			if ( $meta ) {

				$meta = json_decode( $meta );

				if ( ! empty( $meta ) ) {

					$important = '';

					if ( is_admin() ) {
						$important = ' !important';
					}

					foreach ( $meta as $id => $block ) {

						$output .= sprintf( '.%1$s > div {', esc_attr( $id ) );

						if ( ! empty( $block ) ) {
							foreach ( $block as $key => $style ) {
								if ( ! empty( $style ) ) {
									foreach ( $style as $ky => $value ) {
										if ( ! empty( $value ) ) {
											if ( strpos( $ky, 'Mobile' ) !== false ) {
												$mobile[] = strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', str_replace( 'Mobile', '', $ky ) ) ) . ':' . esc_attr( $value ) . $important . ';';
											} elseif ( strpos( $ky, 'Tablet' ) !== false ) {
												$tablet[] = strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', str_replace( 'Tablet', '', $ky ) ) ) . ':' . esc_attr( $value ) . $important . ';';
											} else {
												$output .= strtolower( preg_replace( '/([a-zA-Z])(?=[A-Z])/', '$1-', $ky ) ) . ':' . esc_attr( $value ) . ';';
											}
										}
									}
								}
							}
						}

						$output .= '}';

						if ( ! empty( $tablet ) ) {
							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_tablet_breakpoint', '768px' ) . ') {';
							$output .= sprintf( '.%1$s > div {', esc_attr( $id ) );
							foreach ( $tablet as $tablet_setting ) {
								$output .= $tablet_setting;
							}
							$output .= '}';
							$output .= '}';
						}

						if ( ! empty( $mobile ) ) {
							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_desktop_breakpoint', '514px' ) . ') {';
							$output .= sprintf( '.%1$s > div {', esc_attr( $id ) );
							foreach ( $mobile as $mobile_setting ) {
								$output .= $mobile_setting;
							}
							$output .= '}';
							$output .= '}';
						}

						// Reset media queries.
						$tablet = array();
						$mobile = array();
					}
				}
			}

			// Add media query for responsive height controls on the front-end.
			$responsive_height = get_post_meta( $post->ID, '_coblocks_responsive_height', true );
			$responsive_height = json_decode( $responsive_height );

			if ( $responsive_height && ! is_admin() ) {
				foreach ( $responsive_height as $divider_key => $divider_obj ) {
					if ( ! empty( $divider_obj ) ) {
						foreach ( $divider_obj as $divider_element => $divider_el_obj ) {
							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_tablet_breakpoint', '768px' ) . ') {';
							if ( 'height' === $divider_element && isset( $divider_el_obj->heightTablet ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > [class*="__inner"]:not(.is-fullscreen) {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightTablet . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}

							if ( 'shapeHeight' === $divider_element && isset( $divider_el_obj->heightTablet ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__svg-wrapper {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightTablet . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}
							if ( 'backgroundHeight' === $divider_element && isset( $divider_el_obj->heightTablet ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__alt-wrapper {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightTablet . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}
							$output .= '}';

							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_desktop_breakpoint', '514px' ) . ') {';
							if ( 'shapeHeight' === $divider_element && isset( $divider_el_obj->heightMobile ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__svg-wrapper {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightMobile . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}
							if ( 'backgroundHeight' === $divider_element && isset( $divider_el_obj->heightMobile ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__alt-wrapper {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightMobile . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}
							if ( 'height' === $divider_element && isset( $divider_el_obj->heightMobile ) ) { // @codingStandardsIgnoreLine
								$output     .= sprintf( '.%1$s > [class*="__inner"]:not(.is-fullscreen)  {', esc_attr( $divider_key ) );
									$output .= 'min-height:' . $divider_el_obj->heightMobile . 'px !important'; // @codingStandardsIgnoreLine
								$output     .= '}';
							}
							$output .= '}';

						}
					}
				}
			}

			return wp_strip_all_tags( $output );

		}
	}
}

CoBlocks_Generated_Styles::register();
