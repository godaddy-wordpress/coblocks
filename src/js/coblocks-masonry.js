/* eslint-disable sort-keys */
/* global jQuery */

( function( $ ) {
	'use strict';

	const container = $( '.wp-block-coblocks-gallery-masonry ul' );

	$( document ).ready( function() {
		container.imagesLoaded( function() {
			container.masonry( {
				itemSelector: '.coblocks-gallery--item',
				transitionDuration: '0',
				percentPosition: true,
			} );
		} );
	} );
}( jQuery ) );
