/**
 * Smoke tests for coblocks-accordion-script — the URL-hash deep-link helper.
 *
 * Source under test: src/js/coblocks-accordion-script.js
 *
 * The script registers a DOMContentLoaded listener that reads
 * window.location.hash, compares a slugified version against the slugified
 * text content of every <summary class="wp-block-coblocks-accordion-item__title">,
 * and (on a single match) opens the parent <details> then scrolls it into view.
 */

const buildAccordion = ( titles ) => {
	document.body.innerHTML = '';
	titles.forEach( ( title ) => {
		const summary = document.createElement( 'summary' );
		summary.className = 'wp-block-coblocks-accordion-item__title';
		summary.textContent = title;

		const content = document.createElement( 'div' );
		content.className = 'wp-block-coblocks-accordion-item__content';

		const details = document.createElement( 'details' );
		details.appendChild( summary );
		details.appendChild( content );

		document.body.appendChild( details );
	} );
};

describe( 'coblocks-accordion-script', () => {
	let scrollSpy;

	// Register the script's DOMContentLoaded listener exactly once for the
	// entire suite, before any test bodies run. globals.window.location.hash
	// and the DOM are reset between tests in the beforeEach block.
	require( '../coblocks-accordion-script.js' );

	beforeEach( () => {
		document.body.innerHTML = '';
		// jsdom does not implement scrollIntoView; stub it on every <details>.
		scrollSpy = jest.fn();
		HTMLElement.prototype.scrollIntoView = scrollSpy;
		window.location.hash = '';
		// Default matchMedia: motion allowed. Individual test overrides as needed.
		window.matchMedia = jest.fn().mockImplementation( () => ( {
			matches: false,
			media: '',
		} ) );
	} );

	const fireDomLoaded = () => {
		document.dispatchEvent( new Event( 'DOMContentLoaded' ) );
	};

	it( 'does nothing when no hash is present', () => {
		buildAccordion( [ 'Title A', 'Title B' ] );

		fireDomLoaded();

		const details = document.querySelectorAll( 'details' );
		details.forEach( ( d ) => expect( d.open ).toBe( false ) );
		expect( scrollSpy ).not.toHaveBeenCalled();
	} );

	it( 'does nothing when only a bare "#" is present', () => {
		window.location.hash = '#';
		buildAccordion( [ 'Title A' ] );

		fireDomLoaded();

		expect( document.querySelector( 'details' ).open ).toBe( false );
		expect( scrollSpy ).not.toHaveBeenCalled();
	} );

	it( 'opens the matching single item and scrolls it into view', () => {
		buildAccordion( [ 'Title A', 'Title B', 'Title C' ] );
		window.location.hash = '#title-b';

		fireDomLoaded();

		const details = document.querySelectorAll( 'details' );
		expect( details[ 0 ].open ).toBe( false );
		expect( details[ 1 ].open ).toBe( true );
		expect( details[ 2 ].open ).toBe( false );
		expect( scrollSpy ).toHaveBeenCalledTimes( 1 );
		expect( scrollSpy ).toHaveBeenCalledWith( { behavior: 'smooth', block: 'start' } );
	} );

	it( 'opens when the slug is matched after collapsing punctuation and spacing', () => {
		buildAccordion( [ 'Hello — World!' ] );
		window.location.hash = '#Hello%20World!';

		fireDomLoaded();

		const details = document.querySelector( 'details' );
		expect( details.open ).toBe( true );
		expect( scrollSpy ).toHaveBeenCalled();
	} );

	it( 'does nothing when the hash does not match any item', () => {
		buildAccordion( [ 'Title A', 'Title B' ] );
		window.location.hash = '#does-not-exist';

		fireDomLoaded();

		const details = document.querySelectorAll( 'details' );
		details.forEach( ( d ) => expect( d.open ).toBe( false ) );
		expect( scrollSpy ).not.toHaveBeenCalled();
	} );

	it( 'does not open anything when two items share a slug', () => {
		buildAccordion( [ 'Same', 'Same' ] );
		window.location.hash = '#same';

		fireDomLoaded();

		const details = document.querySelectorAll( 'details' );
		details.forEach( ( d ) => expect( d.open ).toBe( false ) );
		expect( scrollSpy ).not.toHaveBeenCalled();
	} );

	it( 'switches to instant scroll when the user prefers reduced motion', () => {
		window.matchMedia = jest.fn().mockImplementation( ( query ) => ( {
			matches: query === '(prefers-reduced-motion: reduce)',
			media: query,
		} ) );

		buildAccordion( [ 'Title A' ] );
		window.location.hash = '#title-a';

		fireDomLoaded();

		expect( scrollSpy ).toHaveBeenCalledWith( { behavior: 'auto', block: 'start' } );
	} );

	it( 'does not crash when no accordion items exist on the page', () => {
		window.location.hash = '#title-a';

		expect( () => fireDomLoaded() ).not.toThrow();
		expect( scrollSpy ).not.toHaveBeenCalled();
	} );

	it( 'also sets the open attribute for the legacy IE polyfill path', () => {
		buildAccordion( [ 'Title A' ] );
		window.location.hash = '#title-a';

		fireDomLoaded();

		const details = document.querySelector( 'details' );
		expect( details.hasAttribute( 'open' ) ).toBe( true );
	} );
} );
