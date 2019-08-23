/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import dividers from './dividers';

/**
 * Return the appropriate SVG for the block style.
 *
 * @param {Array} className The class names.
 * @returns {String} The divider.
 */
export function getDividerFromStyle( className ) {
	const angled = includes( className, 'is-style-angled' );
	const hills = includes( className, 'is-style-hills' );
	const pointed = includes( className, 'is-style-pointed' );
	const rounded = includes( className, 'is-style-rounded' );
	const sloped = includes( className, 'is-style-sloped' );
	const triangle = includes( className, 'is-style-triangle' );
	const waves = includes( className, 'is-style-waves' );

	let divider = dividers.wavy;

	if ( angled ) {
		divider = dividers.angled;
	} else if ( sloped ) {
		divider = dividers.sloped;
	} else if ( triangle ) {
		divider = dividers.triangle;
	} else if ( rounded ) {
		divider = dividers.rounded;
	} else if ( waves ) {
		divider = dividers.waves;
	} else if ( pointed ) {
		divider = dividers.pointed;
	} else if ( hills ) {
		divider = dividers.hills;
	}

	return divider;
}
