/**
 * External dependencies
 */
import { difference } from 'lodash';

/**
 * WordPress dependencies
 */
import { controls } from '@wordpress/data';
const { resolveSelect: select } = controls;

/**
 * Internal dependencies
 */
import { updateDesign } from './actions';
import STORE_KEY from './constants';

export function* getDesignResp() {
	const designStyle = yield select( STORE_KEY, 'getDesignStyle' );
	const colorPalette = yield select( STORE_KEY, 'getColorPalette' );
	const customColors = yield select( STORE_KEY, 'getCurrentColors' );
	yield updateDesign( { designStyle, colorPalette, customColors, initialLoad: true } );
}

export function getIndexFromFontPair( selectedFonts, fonts ) {
	if ( ! selectedFonts ) {
		return -1;
	}

	const designStyleFonts = selectedFonts.map( ( font ) => font[ 0 ] );
	const fontsList = fonts.map( ( font ) => [ font[ 0 ][ 0 ], font[ 1 ][ 0 ] ] );

	// Find the package that has at least 2 fonts from the design style list
	// @todo use caching mechanism if we add dozens of new font pack.
	return fontsList.findIndex( ( fontsElem ) => {
		return difference( fontsElem, designStyleFonts ).length === 0;
	} );
}
