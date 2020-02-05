import jQuery from 'jquery';

( function( $ ) {
	'use strict';

	$( document ).ready( function() {
		const carousel = $( '.coblocks-slick' );

		if ( carousel ) {
			carousel.slick();
		}
	} );
}( jQuery ) );
