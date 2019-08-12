( function( $ ) {
	'use strict';
	$(document).ready(function() {

		observer.observe(document.body, {
			childList: true
			, subtree: true
			, attributes: false
			, characterData: false
		})
	});
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;


	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (!mutation.addedNodes) return

			for (var i = 0; i < mutation.addedNodes.length; i++) {
				// do things to your newly added nodes here
				var node = mutation.addedNodes[i];

				if (node.className === "coblocks-ical-events") {
					initializePagination();
				}
			}
		})
	})

	function initializePagination() {
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
	}

}( jQuery ) );
