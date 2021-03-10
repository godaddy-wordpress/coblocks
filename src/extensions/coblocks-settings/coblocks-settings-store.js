/*global coblocksSettings*/
/**
 * WordPress dependencies
 */
import { createReduxStore, register, registerStore } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

/**
 * Constant will check if `@wordpress/data` has deprecated `registerStore`
 * by checking if `createReduxStore` or `register` are undefined
 *
 * @constant {boolean} registerStoreDeprecated
 */
const registerStoreDeprecated =
	typeof createReduxStore !== 'undefined' &&
	typeof register !== 'undefined';

/**
 * Helper function for the CoBlocks Settings Store.
 * This function is used to detect which data-stores are deprecated
 * and use the current supported data-store type.
 *
 * @function getStoreType
 * @param {string} storeName - Store identifier for CoBlocks Setting store.
 * @param {Object} storeOptions - Object with Redux-like configuration.
 * @return {Function} createReduxStore(storeName, storeOptions) || registerStore(storeName, storeOptions)
 */
const getStoreType = ( storeName, storeOptions ) => {
	return registerStoreDeprecated
		? createReduxStore( storeName, storeOptions ) : registerStore( storeName, storeOptions );
};

/**
 * Function intended to fire conditionally when the CoBlocks Settings extension is enabled for user.
 * Function will perform all necessary actions to register Redux store for use with CoBlocks Settings.
 *
 * Store namespace: `coblocks/settings`
 *
 * @function registerCoBlocksSettingsStore
 */
const registerCoBlocksSettingsStore = () => {
	const settingsNonce = coblocksSettings.coblocksSettingsNonce;

	const getOptions = {
		path: '/wp/v2/settings/',
		method: 'GET',
		headers: {
			'X-WP-Nonce': settingsNonce,
		} };

	const postOptions = {
		path: '/wp/v2/settings/',
		method: 'POST',
		headers: {
			'X-WP-Nonce': settingsNonce,
		} };

	apiFetch.use( apiFetch.createNonceMiddleware( settingsNonce ) );

	const layoutSelectorEnabled = applyFilters( 'coblocks-show-layout-selector', true );

	apiFetch( getOptions ).then( ( res ) => {
		DEFAULT_STATE.customColors = res.coblocks_custom_colors_controls_enabled || false;
		DEFAULT_STATE.gradients = res.coblocks_gradient_presets_enabled || false;
		DEFAULT_STATE.typography = res.coblocks_typography_controls_enabled || false;
		DEFAULT_STATE.animation = res.coblocks_animation_controls_enabled || false;
		DEFAULT_STATE.colorsPanel = res.coblocks_color_panel_controls_enabled || false;
		DEFAULT_STATE.layoutSelector = layoutSelectorEnabled ? res.coblocks_layout_selector_controls_enabled || false : false;
	} );

	const DEFAULT_STATE = {
		customColors: true,
		colorsPanel: true,
		gradients: true,
		typography: true,
		animation: true,
		layoutSelector: false, // default false to prevent screen flicker.
	};

	const actions = {
		setCustomColors: ( ) => ( { type: 'UPDATE_CUSTOM_COLORS' } ),
		setColorPanel: ( ) => ( { type: 'UPDATE_COLOR_PANEL' } ),
		setGradients: ( ) => ( { type: 'UPDATE_GRADIENTS' } ),
		setLayoutSelector: ( ) => ( { type: 'UPDATE_LAYOUT_SELECTOR' } ),
		setTypography: ( ) => ( { type: 'UPDATE_TYPOGRAPHY' } ),
		setAnimation: ( ) => ( { type: 'UPDATE_ANIMATION' } ),
	};

	const store = getStoreType( 'coblocks/settings', {
		reducer( state = DEFAULT_STATE, action ) {
			let toggleValue;
			switch ( action.type ) {
				case 'UPDATE_CUSTOM_COLORS':
					toggleValue = ! state.customColors;

					apiFetch( {	...postOptions,
						data: {
							coblocks_custom_colors_controls_enabled: toggleValue,
						},
					} );

					return {
						...state,
						customColors: toggleValue,
					};
				case 'UPDATE_COLOR_PANEL':
					toggleValue = ! state.colorsPanel;

					apiFetch( {	...postOptions,
						data: {
							coblocks_color_panel_controls_enabled: toggleValue,
							coblocks_gradient_presets_enabled: toggleValue,
							coblocks_custom_colors_controls_enabled: toggleValue,
						},
					} );

					return {
						...state,
						colorsPanel: toggleValue,
						customColors: toggleValue,
						gradients: toggleValue,
					};
				case 'UPDATE_GRADIENTS':
					toggleValue = ! state.gradients;

					apiFetch( {	...postOptions,
						data: {
							coblocks_gradient_presets_enabled: toggleValue,
						},
					} );

					return {
						...state,
						gradients: toggleValue,
					};
				case 'UPDATE_LAYOUT_SELECTOR':
					toggleValue = ! state.layoutSelector;

					apiFetch( {	...postOptions,
						data: {
							coblocks_layout_selector_controls_enabled: toggleValue,
						},
					} );

					return {
						...state,
						layoutSelector: toggleValue,
					};
				case 'UPDATE_TYPOGRAPHY':
					toggleValue = ! state.typography;

					apiFetch( {	...postOptions,
						data: {
							coblocks_typography_controls_enabled: toggleValue,
						},
					} );

					return {
						...state,
						typography: toggleValue,
					};
				case 'UPDATE_ANIMATION':
					toggleValue = ! state.animation;

					apiFetch( {	...postOptions,
						data: {
							coblocks_animation_controls_enabled: toggleValue,
						},
					} );
					return {
						...state,
						animation: toggleValue,
					};
			}

			return state;
		},

		actions,

		selectors: {
			getLayoutSelector: ( state ) => state.layoutSelector,
			getCustomColors: ( state ) => state.customColors,
			getGradients: ( state ) => state.gradients,
			getTypography: ( state ) => state.typography,
			getAnimation: ( state ) => state.animation,
			getColorPanel: ( state ) => state.colorsPanel,
		},
	} );

	// Register is only used when the registerStore function has been deprecated.
	if ( registerStoreDeprecated ) {
		register( store );
	}
};

export default registerCoBlocksSettingsStore;
