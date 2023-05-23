<?php
/**
 * Search block render callback function.
 *
 * @package CoBlocks
 */

/**
 * Render callback function for 'coblocks/coblocks-search' block.
 *
 * This function generates the HTML for the block to be rendered on the front-end.
 */
function coblocks_coblocks_render_coblocks_search_block() {
	$button_html = '<button class="header__search-toggle" data-toggle-target=".search-modal" data-set-focus=".search-modal .search-form__input" type="button" aria-controls="js-site-search">'
		. '<div class="search-toggle-icon">'
		. '<span class="dashicons dashicons-search"></span>'
		. '</div>'
		. '<span class="screen-reader-text">' . __( 'Search Toggle', 'coblocks' ) . '</span>'
		. '</button>';

	$modal_html = '<div class="search-modal" data-modal-target-string=".search-modal" aria-expanded="false">'
		. '<div class="search-modal-inner">'
		. '<div id="js-site-search" class="site-search" itemscope="" itemtype="http://schema.org/WebSite">'
		. '<form role="search" class="search-form" method="get" action="' . esc_url( home_url( '/' ) ) . '">'
		. '<label htmlfor="search-field">'
		. '<span class="screen-reader-text">' . __( 'Search For', 'coblocks' ) . '</span>'
		. '</label>'
		. '<input itemprop="query-input" type="search" id="search-field" class="input input--search search-form__input" autocomplete="off" placeholder="' . esc_attr_x( 'Search &hellip;', 'placeholder', 'coblocks' ) . '" name="s" />'
		. '<button type="submit" class="search-input__button">'
		. '<span class="search-input__label">' . __( 'Submit', 'coblocks' ) . '</span>'
		. '<span class="dashicons dashicons-search"></span>'
		. '</button>'
		. '</form>'
		. '</div>'
		. '</div>'
		. '</div>';
	return $button_html . $modal_html;
}
