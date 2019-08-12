( function( $ ) {
	'use strict';

	var moreEvents = $( '.wp-block-coblocks-events__more-events-wrapper' );
	var nextPageIconContainer = $( '<div/>', { class: 'coblocks-events__next-page-icon-container' } );
	var previousPageIconContainer = $( '<div/>', { class: 'coblocks-events__previous-page-icon-container' } );
	var nextPageIcon = $( '<div/>', { class: 'next-page-icon' } );
	var previousPageIcon = $( '<div/>', { class: 'previous-page-icon' } );

	nextPageIconContainer.append( nextPageIcon );
	previousPageIconContainer.append( previousPageIcon );
	if ( moreEvents ) {
		moreEvents.prepend( previousPageIconContainer );
		moreEvents.append( nextPageIconContainer );
	}

	var currentPage = 0;
	// Initially set only first page items to be shown
	$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
	$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'initial' );
	previousPageIconContainer.css( 'display', 'none' );
	var totalPageCount = Number( $( '.wp-block-coblocks-event-item' ).last().attr( 'data-page' ) );

	nextPageIconContainer.click( function() {
		currentPage++;
		if ( currentPage === totalPageCount ) {
			nextPageIconContainer.css( 'display', 'none' );
		}
		previousPageIconContainer.css( 'display', 'flex' );
		$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
		$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'initial' );
	} );

	previousPageIconContainer.click( function() {
		currentPage--;
		nextPageIconContainer.css( 'display', 'flex' );
		if ( currentPage === 0 ) {
			previousPageIconContainer.css( 'display', 'none' );
		}
		$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
		$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'initial' );
	} );

}( jQuery ) );
