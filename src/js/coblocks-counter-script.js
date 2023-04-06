/**
 * External dependencies
 */
import counterUp from 'counterup2';

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

const ACTIVE = 'coblocks-counter-active';
class CoBlocksCounter {
	callback = ( entries ) => {
		entries.forEach( ( entry ) => {
			const el = entry.target;
			const counterSpeed = parseInt( el?.getAttribute( 'data-counter-speed' ) || 1 ) * 1000;
			if ( ! el.classList.contains( ACTIVE ) && entry.isIntersecting ) {
				setTimeout( () => {
					counterUp( el, { duration: counterSpeed } );
					el.classList.add( ACTIVE );
				}, 200 );
			}
		} );
	};

	init = () => {
		const els = document.querySelectorAll( '.wp-block-coblocks-counter' );

		// If reduce motion is on, don't animate.
		const reduceMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		// If IntersectionObserver is not supported, just show the blocks.
		if ( ! ( 'IntersectionObserver' in window ) || reduceMotion ) {
			els.forEach( ( el ) => {
				el.classList.add( ACTIVE );
			} );
			return;
		}

		if ( this.io ) {
			this.io.disconnect();
		}
		// Don't use threshold 1 because if a small part of the text is hidden,
		// the IO won't trigger.
		this.io = new IntersectionObserver( this.callback, { threshold: 0.25 } );
		els.forEach( ( el ) => {
			this.io.observe( el );
		} );
	};
}

window.coblocksCounter = new CoBlocksCounter();
domReady( window.coblocksCounter.init );

