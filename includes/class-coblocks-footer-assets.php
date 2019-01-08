<?php
/**
 * Load footer assets for styling our blocks.
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
 * Load footer assets for our blocks.
 *
 * @since 1.0.0
 */
class CoBlocks_Footer_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Footer_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Footer_Assets();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		add_action( 'wp_footer', array( $this, 'footer_assets' ) );
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

CoBlocks_Footer_Assets::register();
