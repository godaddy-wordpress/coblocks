( function( $ ) {
	'use strict';

	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	$( document ).ready( function() {
		observer.observe( document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
		} );
	} );

	const observer = new MutationObserver( function( mutations ) {
		mutations.forEach( function( mutation ) {
			if ( ! mutation.addedNodes ) {
				return;
			}

			for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
				// do things to your newly added nodes here
				const node = mutation.addedNodes[ i ];

				if ( node.className === 'coblocks-slick' ) {
					const carousel = $( '.carousel-container' );

					if ( carousel ) {
						carousel.slick();
					}
				}
			}
		} );
	} );
}( jQuery ) );
