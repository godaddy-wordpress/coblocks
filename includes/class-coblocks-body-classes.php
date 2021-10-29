<?php
/**
 * Add body classes to particular themes to help style them.
 *
 * @package CoBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Generate theme-specific body and admin classes.
 *
 * @since 1.0.0
 */
class CoBlocks_Body_Classes {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		// Filters.
		add_filter( 'body_class', array( $this, 'body_class' ) );
		add_filter( 'admin_body_class', array( $this, 'admin_body_class' ) );
	}

	/**
	 * See if theme is activate or not.
	 *
	 * @since 1.1.0
	 * @param string|array $theme Theme name or array of theme names to check.
	 * @return boolean
	 */
	public function is_active_theme( $theme ) {
		return is_array( $theme ) ? in_array( get_template(), $theme, true ) : get_template() === $theme;
	}

	/**
	 * Themes to check for.
	 *
	 * @since 1.1.0
	 * @return array
	 */
	public function themes() {
		$themes = array(
			'twentytwentyone',
			'twentytwenty',
			'twentynineteen',
			'twentyseventeen',
			'twentysixteen',
			'twentyfifteen',
			'twentyfourteen',
			'twentythirteen',
			'twentyeleven',
			'twentytwelve',
		);

		return apply_filters( 'coblocks_theme_body_classes', $themes );
	}

	/**
	 * Theme slug.
	 *
	 * @since 1.1.0
	 * @return string
	 */
	public function theme_slug() {
		return esc_attr( wp_get_theme( get_template() )->get_template() );
	}

	/**
	 * Add .is-{theme} class to the frontend for select themes.
	 *
	 * @param array $classes Classes for the body element.
	 * @return array (Maybe) filtered body classes.
	 *
	 * @access public
	 */
	public function body_class( $classes ) {

		if ( $this->is_active_theme( $this->themes() ) ) {
			$classes[] = 'is-' . $this->theme_slug();
		}

		if ( apply_filters( 'coblocks_is_amp', ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() && ! in_array( 'amp', $classes, true ) ) ) ) {
			$classes[] = 'amp';
		}

		return $classes;
	}

	/**
	 * Add .is-{theme} class to the admin editor for select themes.
	 *
	 * @param array $classes Classes for the admin editor body element.
	 * @return array (Maybe) filtered body classes.
	 *
	 * @access public
	 */
	public function admin_body_class( $classes ) {
		global $pagenow;

		// Return if not on viewing the editor.
		if ( ! in_array( $pagenow, array( 'post.php' ), true ) ) {
			return $classes;
		}

		if ( $this->is_active_theme( $this->themes() ) ) {
			$classes .= ' is-' . $this->theme_slug();
		}

		return $classes;
	}

}

new CoBlocks_Body_Classes();
