( function( $ ) {
	'use strict';

	const container = $( '.wp-block-coblocks-gallery-masonry ul' );

	$( document ).ready( function() {
		container.imagesLoaded( function() {
			container.masonry( {
				itemSelector: '.coblocks-gallery--item',
				transitionDuration: '0.2s',
				percentPosition: true,
			} );
		} );
	} );
}( jQuery ) );
