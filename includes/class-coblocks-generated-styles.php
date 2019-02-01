<?php
/**
 * Load generated styles for our blocks.
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
			$output = '';

			if ( $meta ) {

				$meta = json_decode( $meta );

				if ( ! empty( $meta ) ) {

					$important = '';

					if( is_admin() ){
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

			//add media query for shape divider height on frontend
			$responsive_height    = get_post_meta( $post->ID, '_coblocks_responsive_height', true );
			$responsive_height 	  = json_decode( $responsive_height );

			if( $responsive_height && !is_admin() ){
				foreach ( $responsive_height as $dividerKey => $dividerObj ) {
					if( !empty( $dividerObj ) ){
						foreach ( $dividerObj as $dividerElement => $dividerElObj ) {
							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_tablet_breakpoint', '768px' ) . ') {';
								if( $dividerElement == 'shapeHeight' && isset( $dividerElObj->heightTablet ) ){
									$output .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__svg-wrapper {', esc_attr( $dividerKey ) );
										$output .= 'height:'. $dividerElObj->heightTablet . 'px !important';
									$output .= '}';
								}
								if( $dividerElement == 'backgroundHeight' && isset( $dividerElObj->heightTablet ) ){
									$output .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__alt-wrapper {', esc_attr( $dividerKey ) );
										$output .= 'height:'. $dividerElObj->heightTablet . 'px !important';
									$output .= '}';
								}
							$output .= '}';

							$output .= '@media only screen and (max-width: ' . apply_filters( 'coblocks_desktop_breakpoint', '514px' ) . ') {';
								if( $dividerElement == 'shapeHeight' && isset( $dividerElObj->heightMobile ) ){
									$output .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__svg-wrapper {', esc_attr( $dividerKey ) );
										$output .= 'height:'. $dividerElObj->heightMobile . 'px !important';
									$output .= '}';
								}
								if( $dividerElement == 'backgroundHeight' && isset( $dividerElObj->heightMobile ) ){
									$output .= sprintf( '.%1$s > .wp-block-coblocks-shape-divider__alt-wrapper {', esc_attr( $dividerKey ) );
										$output .= 'height:'. $dividerElObj->heightMobile . 'px !important';
									$output .= '}';
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
