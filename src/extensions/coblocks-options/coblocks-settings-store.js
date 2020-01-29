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
		colors: true,
		gradient: true,
		typography: true,
	};

	const selectors = {
		getTypography( ) {
			return settings.typography;
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
