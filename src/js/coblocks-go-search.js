/* global coblocksGoSearch */

import { unregisterBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

( function() {
	'use strict';

	if ( ! coblocksGoSearch.isGoActive ) {
		domReady( function() {
			unregisterBlockType( 'coblocks/go-search' );
		} );
		return;
	}

	/*
		Gist block links are disabled by default
		on front end only, we remove the block to allow for clicking
	*/
	document.addEventListener( 'DOMContentLoaded', function() {
		const params = new URLSearchParams( location.search );
		const searchQuery = params.get( 's' );
		if ( null !== searchQuery ) {
			[].forEach.call( document.querySelectorAll( '.search-form__input' ), function( input ) {
				input.value = searchQuery;
			} );
		}

		[].forEach.call( document.querySelectorAll( '.header__search-toggle' ), function( a ) {
			a.addEventListener( 'click', function() {
				const searchModal = a.nextElementSibling;
				[ 'show-modal', 'active' ].map( ( v ) => searchModal.classList.toggle( v ) );
			}, false );
		} );
	} );
}() );
