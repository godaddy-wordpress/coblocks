/*global Masonry*/

( function( ) {
	'use strict';

	const elem = document.querySelector( '.wp-block-coblocks-gallery-masonry ul' );

	if ( ! elem ) {
		return;
	}

	new Masonry( elem, {
		itemSelector: '.coblocks-gallery--item',
		transitionDuration: '0',
		percentPosition: true,
	} );
}( ) );
