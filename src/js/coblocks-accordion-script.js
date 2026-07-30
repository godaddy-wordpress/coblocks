/**
 * CoBlocks accordion deep-link helper.
 *
 * Reads window.location.hash on load, opens the single accordion item whose
 * <summary> title slug matches the hash, and scrolls it into view. Works with
 * the native <details> toggle and the legacy IE polyfill.
 */
const slugify = ( value ) => {
	return value
		.toLowerCase()
		.replace( /[^a-z0-9]+/g, '-' )
		.replace( /^-+|-+$/g, '' );
};

const setDetailsOpen = ( details ) => {
	details.open = true;
	// Set the attribute too so the legacy IE polyfill (which observes getAttribute('open')) picks it up.
	details.setAttribute( 'open', '' );
};

const openAccordionFromHash = () => {
	const rawHash = window.location.hash || '';
	if ( ! rawHash || rawHash === '#' ) {
		return;
	}

	let decodedHash;
	try {
		decodedHash = decodeURIComponent( rawHash.slice( 1 ) );
	} catch ( error ) {
		// Malformed percent-encoding: bail rather than throw.
		return;
	}

	const target = slugify( decodedHash );
	if ( ! target ) {
		return;
	}

	const summaries = document.querySelectorAll( '.wp-block-coblocks-accordion-item__title' );
	let match = null;
	let matchCount = 0;

	summaries.forEach( ( summary ) => {
		const title = slugify( summary.textContent || '' );
		if ( ! title || title !== target ) {
			return;
		}

		const details = summary.closest( 'details' );
		if ( ! details ) {
			return;
		}

		matchCount += 1;
		match = matchCount === 1 ? details : null;
	} );

	if ( matchCount !== 1 || ! match ) {
		return;
	}

	setDetailsOpen( match );

	const reduceMotion = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	match.scrollIntoView( { behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' } );
};

( function() {
	'use strict';

	document.addEventListener( 'DOMContentLoaded', openAccordionFromHash, false );
}() );
