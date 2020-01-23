( function( $ ) {
	'use strict';

	$( document ).ready( function() {
		const calendars = $( '.wp-block-coblocks-events[data-per-page]' );

		if ( calendars ) {
			calendars.each( function() {
				$( this ).slick( {
					infinite: false,
					rows: this.dataset.perPage,
					waitForAnimate: false,
				} );
			} );
		}
	} );
}( jQuery ) );
