/*global coblocksBlockData*/

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

export default function createCoBlocksStore() {
	const settingsNonce = coblocksBlockData.coblocksSettingsNonce;
	apiFetch.use( apiFetch.createNonceMiddleware( settingsNonce ) );

	let storeChanged = () => {};
	const settings = {
		customColors: apiFetch( {
			path: '/wp-json/wp/v2/settings/',
			method: 'GET',
			headers: {
				'X-WP-Nonce': settingsNonce,
			} } ).then( ( res ) => {
			return res.coblocks_custom_colors_controls_enabled;
		} ),

		gradient: true,
		typography: apiFetch( {
			path: '/wp-json/wp/v2/settings/',
			method: 'GET',
			headers: {
				'X-WP-Nonce': settingsNonce,
			} } ).then( ( res ) => {
			return res.coblocks_typography_controls_enabled;
		} ),
	};

	const selectors = {
		getTypography( ) {
			return settings.typography;
		},
		getCustomColors( ) {
			return settings.customColors;
		},
	};

	const actions = {
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
