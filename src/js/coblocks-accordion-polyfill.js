/*global define*/
void ( function( root, factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( factory );
	} else if ( typeof exports === 'object' ) {
		module.exports = factory();
	} else {
		factory();
	}
}( this, function() {
	const DETAILS = 'details';
	const SUMMARY = 'summary';

	const supported = checkSupport();
	if ( supported ) {
		return;
	}

	// Add a classname
	document.documentElement.className += ' no-details';

	// Disable issue: https://github.com/godaddy-wordpress/coblocks/issues/2000
	// Disable note: This is a stand-alone script and may not be able to refactor.
	// eslint-disable-next-line @wordpress/no-global-event-listener
	window.addEventListener( 'click', clickHandler );

	injectStyle( 'details-polyfill-style',
		'html.no-details ' + DETAILS + ':not([open]) > :not(' + SUMMARY + ') { display: none; }\n' +
    'html.no-details ' + DETAILS + ' > ' + SUMMARY + ':before { border: none; background: transparent; content: "\u25b6"; margin-right: 5px; display: inline-block; font-size: .8em;  }\n' +
    'html.no-details ' + DETAILS + '[open] > ' + SUMMARY + ':before { content: "\u25bc"; }' );

	/*
   * Click handler for `<summary>` tags
   */

	function clickHandler( e ) {
		if ( e.target.nodeName.toLowerCase() === 'summary' ) {
			const details = e.target.parentNode;
			if ( ! details ) {
				return;
			}

			if ( details.getAttribute( 'open' ) ) {
				details.open = false;
				details.removeAttribute( 'open' );
			} else {
				details.open = true;
				details.setAttribute( 'open', 'open' );
			}
		}
	}

	/*
   * Checks for support for `<details>`
   */

	function checkSupport() {
		const el = document.createElement( DETAILS );
		if ( ! ( 'open' in el ) ) {
			return false;
		}

		el.innerHTML = '<' + SUMMARY + '>a</' + SUMMARY + '>b';
		document.body.appendChild( el );

		const diff = el.offsetHeight;
		el.open = true;
		const result = ( diff !== el.offsetHeight );

		document.body.removeChild( el );
		return result;
	}

	/*
   * Injects styles (idempotent)
   */

	function injectStyle( id, style ) {
		if ( document.getElementById( id ) ) {
			return;
		}

		const el = document.createElement( 'style' );
		el.id = id;
		el.innerHTML = style;

		document.getElementsByTagName( 'head' )[ 0 ].appendChild( el );
	}
} ) ); // eslint-disable-line semi
