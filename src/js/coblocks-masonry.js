( function( $ ) {
	"use strict";

	var container = $( '.wp-block-coblocks-gallery-masonry ul' );

	$( document ).ready( function () {

		container.imagesLoaded(function(){
			container.masonry( {
				itemSelector: '.blockgallery--item',
				transitionDuration: '0.2s',
				percentPosition: true,
			} );
		});
	});

} )( jQuery );
