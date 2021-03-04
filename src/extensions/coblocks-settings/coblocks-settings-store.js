/*global coblocksSettings*/
/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

const registerCoBlocksSettingsStore = () => {
	const settingsNonce = coblocksSettings.coblocksSettingsNonce;
	apiFetch.use( apiFetch.createNonceMiddleware( settingsNonce ) );

	const layoutSelectorEnabled = applyFilters( 'coblocks-show-layout-selector', true );

	apiFetch( {
		path: '/wp/v2/settings/',
		method: 'GET',
		headers: {
			'X-WP-Nonce': settingsNonce,
		} } ).then( ( res ) => {
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

	registerStore( 'coblocks/coblocks-settings', {
		reducer( state = DEFAULT_STATE, action ) {
			let toggleValue;
			switch ( action.type ) {
				case 'UPDATE_CUSTOM_COLORS':
					toggleValue = ! state.customColors;

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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

					apiFetch( {
						path: '/wp/v2/settings/',
						method: 'POST',
						headers: {
							'X-WP-Nonce': settingsNonce,
						},
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
};

export default registerCoBlocksSettingsStore;
