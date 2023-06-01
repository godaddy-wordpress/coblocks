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
function coblocks_render_coblocks_search_block() {

	ob_start();

	?>

	<button id="header__search-toggle" class="header__search-toggle" data-toggle-target=".coblocks-search-modal" data-set-focus=".coblocks-search-modal .search-form__input" type="button" aria-controls="js-site-search">
		<div class="search-toggle-icon">
		<span class="dashicons dashicons-search"></span>
		</div>
		<span class="screen-reader-text"><?php esc_html_e( 'Search Toggle', 'coblocks' ); ?></span>
	</button>

	<div class="coblocks-search-modal" data-modal-target-string=".coblocks-search-modal" aria-expanded="false">
		<div class="coblocks-search-modal-inner">
			<div id="js-site-search" class="site-search" itemscope="" itemtype="http://schema.org/WebSite">
				<form role="search" class="search-form" method="get" action="<?php esc_url( home_url( '/' ) ); ?>">
					<label htmlfor="search-field">
						<span class="screen-reader-text"><?php esc_html_e( 'Search For', 'coblocks' ); ?></span>
					</label>
					<input itemprop="query-input" type="search" id="search-field" class="input input--search search-form__input" autocomplete="off" placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'coblocks' ); ?>" name="s" />
					<button type="submit" class="search-input__button">
						<span class="search-input__label"><?php esc_html_e( 'Submit', 'coblocks' ); ?></span>
						<span class="dashicons dashicons-search"></span>
					</button>
				</form>
			</div>
		</div>
	</div>

	<?php

	return ob_get_clean();

}
