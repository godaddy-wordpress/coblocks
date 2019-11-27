( function( $ ) {
	'use strict';
	$( window ).on( 'load', function() {
		const arrowRight = $( '<div/>', { class: 'arrow-right' } );
		const arrowLeft = $( '<div/>', { class: 'arrow-left' } );
		const flickityArrowLeft = $( 'div.wp-block-coblocks-gallery-carousel > .coblocks-gallery > .has-carousel > button.previous' );
		const flickityArrowRight = $( 'div.wp-block-coblocks-gallery-carousel > .coblocks-gallery > .has-carousel > button.next' );
		flickityArrowLeft.empty().removeClass().addClass( 'coblocks-lightbox__arrow coblocks-lightbox__arrow--left' ).append( arrowLeft );
		flickityArrowRight.empty().removeClass().addClass( 'coblocks-lightbox__arrow coblocks-lightbox__arrow--right' ).append( arrowRight );
	} );
}( jQuery ) );
