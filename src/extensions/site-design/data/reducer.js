/* global coblocksBlockData */

/**
 * External dependencies
 */
import { isEmpty, isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { plugins, use } from '@wordpress/data';

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

const getDefaultState = () => {
	if ( typeof coblocksBlockData?.siteDesign === 'undefined' ) {
		return {};
	}

	// Change "Font Name_heading" and "Font Name_body" to simply "Font Name".
	const normalizeFont = ( fontPack ) => Object.entries( fontPack ).map( ( font ) => {
		font[ 0 ] = font[ 0 ].replace( /_(heading|body)/, '' );
		return font;
	} );

	const fonts = coblocksBlockData.siteDesign?.fonts?.map( ( fontPack ) => normalizeFont( fontPack ) );

	const getInitialFontsState = () => {
		const currentFontPack = coblocksBlockData.siteDesign?.currentFonts;

		if ( ! currentFontPack ) {
			return null;
		}

		return normalizeFont( currentFontPack );
	};

	const designStyles = Object.entries( coblocksBlockData.siteDesign.availableDesignStyles ).map( ( [ , style ] ) => {
		return {
			...style,
			palettes: Object.entries( style.color_schemes ).map(
				( [ slug, colorScheme ] ) => {
					return [
						slug,
						Object.fromEntries(
							[ 'primary', 'secondary', 'tertiary', 'background' ].map( ( colorSlug ) => [ colorSlug, colorScheme[ colorSlug ] ] )
						),
					];
				}
			),
		};
	} );

	const STATE = {
		colorPalette: coblocksBlockData.siteDesign.currentColorScheme,
		colorsPanelOpen: true,
		currentColors: Object.fromEntries( Object.entries( coblocksBlockData.siteDesign.currentColors ).filter( ( color ) => color[ 1 ] ) ),
		designStyle: coblocksBlockData.siteDesign.currentDesignStyle,
		designStyles,
		designsPanelOpen: true,
		fontSize: coblocksBlockData.siteDesign?.fontSize,
		fonts,
		fontsPanelOpen: true,
		isUpdating: false,
		selectedFonts: getInitialFontsState(),
		showSaveBtn: false,
		typeRatio: coblocksBlockData.siteDesign?.typeRatio,
	};

	// Keep reference to initial state for shallow comparison to display save button
	STATE.refState = { ...STATE };

	return STATE;
};

const shouldShowSaveBtn = ( refState, state ) => {
	return Object.keys( state ).some( ( name ) => ! isEqual( refState[ name ], state[ name ] ) );
};

const reducer = ( state = {}, action ) => {
	use( plugins.persistence, state );

	if ( isEmpty( state ) ) {
		state = getDefaultState();
	}

	switch ( action.type ) {
		case UPDATE_DESIGN:
			return {
				...state,
				...action.newState,
			};
		case UPDATE_DESIGN_STYLE:
		case UPDATE_COLOR_PALETTE:
		case UPDATE_SELECTED_FONTS:
		case UPDATE_CUSTOM_COLORS:
		case UPDATE_FONT_SIZE:
		case UPDATE_TYPE_RATIO:
			return {
				...state,
				...action.newState,
				showSaveBtn: shouldShowSaveBtn(
					state.refState,
					{
						colorPalette: state.colorPalette,
						currentColors: state.currentColors,
						designStyle: state.designStyle,
						fontSize: state.fontSize,
						selectedFonts: state.selectedFonts,
						typeRatio: state.typeRatio,
						...action.newState,
					} ),
			};
		case TOGGLE_FONTS_PANEL:
		case TOGGLE_COLORS_PANEL:
		case TOGGLE_DESIGNS_PANEL:
		case TOGGLE_IS_UPDATING:
			return {
				...state,
				[ action.stateProp ]: ! state[ action.stateProp ],
			};
		case UPDATE_REF_STATE:
			const oldState = { ...state };
			delete oldState.refState;
			return {
				...state,
				refState: oldState,
				showSaveBtn: false,
			};

		default: {
			return state;
		}
	}
};

export default reducer;
