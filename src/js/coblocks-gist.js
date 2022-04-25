( function() {
	'use strict';

	/*
		Gist block links are disabled by default
		on front end only, we remove the block to allow for clicking
	*/
	document.addEventListener( 'DOMContentLoaded', function() {
		const gistBlockContainers = document.querySelectorAll( '.coblocks-gist__container' );

		for ( let i = 0; i < gistBlockContainers.length; i++ ) {
			const currentGistBlock = gistBlockContainers[ i ];

			currentGistBlock.style.pointerEvents = 'all';
		}
	} );
}() );
