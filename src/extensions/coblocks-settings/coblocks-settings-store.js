/*global coblocksSettings*/

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

export default function createCoBlocksStore() {
	const settingsNonce = coblocksSettings.coblocksSettingsNonce;
	apiFetch.use( apiFetch.createNonceMiddleware( settingsNonce ) );

	let storeChanged = () => {};
	const settings = {
		customColors: true,
		gradients: true,
		typography: true,
	};

	apiFetch( {
		path: '/wp-json/wp/v2/settings/',
		method: 'GET',
		headers: {
			'X-WP-Nonce': settingsNonce,
		} } ).then( ( res ) => {
		settings.customColors = res.coblocks_custom_colors_controls_enabled || false;
		settings.gradients = res.coblocks_gradient_presets_enabled || false;
		settings.typography = res.coblocks_typography_controls_enabled || false;
		storeChanged();
	} );

	const selectors = {
		getCustomColors( ) {
			return settings.customColors;
		},
		getGradients() {
			return settings.gradients;
		},
		getTypography( ) {
			return settings.typography;
		},
	};

	const actions = {

		setCustomColors( ) {
			const toggle = ! settings.customColors;
			settings.customColors = toggle;
			storeChanged();
			apiFetch( {
				path: '/wp-json/wp/v2/settings/',
				method: 'POST',
				headers: {
					'X-WP-Nonce': settingsNonce,
				},
				data: {
					coblocks_custom_colors_controls_enabled: toggle,
				},
			} );
		},
		setGradients( ) {
			const toggle = ! settings.gradients;
			settings.gradients = toggle;
			storeChanged();
			apiFetch( {
				path: '/wp-json/wp/v2/settings/',
				method: 'POST',
				headers: {
					'X-WP-Nonce': settingsNonce,
				},
				data: {
					coblocks_gradient_presets_enabled: toggle,
				},
			} );
		},
		setTypography( ) {
			const toggle = ! settings.typography;
			settings.typography = toggle;
			storeChanged();
			apiFetch( {
				path: '/wp-json/wp/v2/settings/',
				method: 'POST',
				headers: {
					'X-WP-Nonce': settingsNonce,
				},
				data: {
					coblocks_typography_controls_enabled: toggle,
				},
			} );
		},
	};

	return {
		getSelectors() {
			return selectors;
		},
		getActions() {
			return actions;
		},
		subscribe( listener ) {
			storeChanged = listener;
		},
	};
}
