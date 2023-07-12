( function() {
	'use strict';
	document.addEventListener( 'DOMContentLoaded', function() {
		const servicesBlocks = document.querySelectorAll( '.wp-block-coblocks-service' );

		for ( let i = 0; i < servicesBlocks.length; i++ ) {
			const currentServiceBlock = servicesBlocks[ i ];
			const hasImage = currentServiceBlock.getElementsByTagName( 'figure' ).length;

			if ( 0 === currentServiceBlock.innerText.length && ! hasImage ) {
				currentServiceBlock.remove();
			}
		}
	} );
}() );
