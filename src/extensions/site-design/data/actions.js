/* global coblocksBlockData, siteDesign */

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

/**
 * WordPress dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
import { controls } from '@wordpress/data';
const { resolveSelect: select } = controls;

/**
 * Internal dependencies
 */
import STORE_KEY from './constants';
import {
	TOGGLE_COLORS_PANEL,
	TOGGLE_DESIGNS_PANEL,
	TOGGLE_FONTS_PANEL,
	TOGGLE_IS_UPDATING,
	UPDATE_COLOR_PALETTE,
	UPDATE_CUSTOM_COLORS,
	UPDATE_DESIGN,
	UPDATE_DESIGN_STYLE,
	UPDATE_FONT_SIZE,
	UPDATE_REF_STATE,
	UPDATE_SELECTED_FONTS,
	UPDATE_TYPE_RATIO,
} from './action-types';

export function* updateDesign( {
	designStyle = 'none',
	saveChanges = false,
	initialLoad = false,
} ) {
	const colorPaletteFromStore = yield select( STORE_KEY, 'getColorPalette' );

	let {
		colorPalette = colorPaletteFromStore === 'custom' ? 'custom' : 'one',
		customColors = colorPaletteFromStore === 'custom' ? yield select( STORE_KEY, 'getCurrentColors' ) : null,
		fonts = false,
		fontSize = false,
		typeRatio = false,
	} = {};

	if ( saveChanges ) {
		designStyle = yield select( STORE_KEY, 'getDesignStyle' );
		colorPalette = yield select( STORE_KEY, 'getColorPalette' );
		customColors = yield select( STORE_KEY, 'getCurrentColors' );
		fonts = yield select( STORE_KEY, 'getSelectedFonts' );
		// For some reason resolveSelect returns the actual state which has side effect if we play with it directly
		fonts = cloneDeep( fonts );
		// Compatible format is Php "uniquename" => [ weight1, weight2 ]
		// This is to make sure that if a user uses the same typo twice we keep having unique keys assoc array in Php
		if ( siteDesign.isAdvancedFontsEnabled ) {
			fonts[ 0 ][ 0 ] = `${ fonts[ 0 ][ 0 ] }_heading`;
			fonts[ 1 ][ 0 ] = `${ fonts[ 1 ][ 0 ] }_body`;
		}
		fonts = JSON.stringify( Object.fromEntries( fonts ) );
		fontSize = yield select( STORE_KEY, 'getFontSize' );
		typeRatio = yield select( STORE_KEY, 'getTypeRatio' );
	}

	const body = new FormData();
	body.append( 'action', 'site_design_update_design_style' );
	body.append( 'nonce', coblocksBlockData.labsSiteDesignNonce );
	body.append( 'design_style', designStyle );
	body.append( 'color_palette', colorPalette );
	body.append( 'fonts', fonts );
	body.append( 'font_size', fontSize );
	body.append( 'type_ratio', typeRatio );
	body.append( 'should_update', saveChanges );
	body.append( 'initial_load', initialLoad );

	if ( customColors ) {
		Object.keys( customColors ).forEach(
			( slug ) => body.append( `${ slug }_color`, customColors[ slug ] )
		);
	}

	if ( ! initialLoad ) {
		yield toggleIsUpdating();
	}
	yield updateDesignStyle( designStyle );

	let apiData;

	try {
		apiData = yield apiFetch( {
			body,
			method: 'POST',
			path: `${ coblocksBlockData.baseApiNamespace }/${ siteDesign.apiRoute }`,
		} );
	} catch ( e ) {
		// @TODO display a fetch problem to the user.
		// eslint-disable-next-line no-console
		console.log( 'Error updating design', e );
		return;
	}

	if ( ! apiData ) {
		return;
	}

	yield {
		newState: { designResp: apiData },
		type: UPDATE_DESIGN,
	};

	if ( initialLoad ) {
		return;
	}

	yield updateColorPalette( colorPalette );

	if ( fonts === false ) {
		const designStyleObj = yield select( STORE_KEY, 'getDesignStyleObj' );
		yield updateSelectedFonts( Object.entries( designStyleObj.fonts ) );
		yield updateFontSize( designStyleObj.font_size );
		yield updateTypeRatio( designStyleObj.type_ratio );
	}

	yield toggleIsUpdating();

	if ( saveChanges ) {
		yield updateRefState();
	}
}

export const updateDesignStyle = ( designStyle ) => ( {
	newState: { designStyle },
	type: UPDATE_DESIGN_STYLE,
} );

export function* updateColorPalette( colorPalette ) {
	const designStyleObj = yield select( STORE_KEY, 'getDesignStyleObj' );
	const defaultColors = Object.fromEntries( designStyleObj.palettes )[ colorPalette ];

	if ( colorPalette !== 'custom' ) {
		yield updateCustomColors( defaultColors );
	}

	if ( null === defaultColors || undefined === defaultColors || ! Object.entries( defaultColors ).length ) {
		return {
			newState: { colorPalette },
			type: UPDATE_COLOR_PALETTE,
		};
	}

	for ( const [ key, value ] of Object.entries( defaultColors ) ) {
		const backgroundElements = document.getElementsByClassName( `has-${ key }-background-color` );
		if ( backgroundElements.length ) {
			for ( let i = 0; i < backgroundElements.length; i++ ) {
				backgroundElements[ i ].style.backgroundColor = value;
			}
		}

		const colorElements = document.getElementsByClassName( `has-${ key }-color` );
		if ( colorElements.length ) {
			for ( let i = 0; i < colorElements.length; i++ ) {
				colorElements[ i ].style.color = value;
			}
		}
	}

	return {
		newState: { colorPalette },
		type: UPDATE_COLOR_PALETTE,
	};
}

export const updateCustomColors = ( customColors ) => ( {
	newState: { currentColors: customColors },
	type: UPDATE_CUSTOM_COLORS,
} );

export const updateFontSize = ( fontSize ) => ( {
	newState: { fontSize },
	type: UPDATE_FONT_SIZE,
} );

export const updateTypeRatio = ( typeRatio ) => ( {
	newState: { typeRatio },
	type: UPDATE_TYPE_RATIO,
} );

export const updateSelectedFonts = ( selectedFonts ) => ( {
	newState: { selectedFonts },
	type: UPDATE_SELECTED_FONTS,
} );

export const toggleFontsPanel = () => ( {
	stateProp: 'fontsPanelOpen',
	type: TOGGLE_FONTS_PANEL,
} );

export const toggleColorsPanel = () => ( {
	stateProp: 'colorsPanelOpen',
	type: TOGGLE_COLORS_PANEL,
} );

export const toggleDesignsPanel = () => ( {
	stateProp: 'designsPanelOpen',
	type: TOGGLE_DESIGNS_PANEL,
} );

export const toggleIsUpdating = () => ( {
	stateProp: 'isUpdating',
	type: TOGGLE_IS_UPDATING,
} );

export const updateRefState = () => ( {
	type: UPDATE_REF_STATE,
} );
