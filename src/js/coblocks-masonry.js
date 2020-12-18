import jQuery from 'jquery';

( function( $ ) {
	'use strict';

	const container = $( '.wp-block-coblocks-gallery-masonry ul' );
	// init Masonry
	if ( container.length === 0 ) {
		return;
	}

	const elem = document.querySelector( '.wp-block-coblocks-gallery-masonry ul' );
	// element
	imagesLoaded( elem, function( instance ) {
	// 	console.log( 'all images are loaded' );
		const msnry = new Masonry( elem, {
			itemSelector: '.coblocks-gallery--item',
			transitionDuration: '0',
			percentPosition: true,
		} );
	} );
}( jQuery ) );
