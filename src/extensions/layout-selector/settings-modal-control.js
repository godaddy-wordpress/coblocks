/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksSettingsToggleControl from '../coblocks-settings/coblocks-settings-toggle-control';
import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-layout-selector-control', {
	render: () => applyFilters( 'coblocks-show-layout-selector', true ) && (
		<CoBlocksSettingsToggleControl
			settingsKey={ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY }
			label={ __( 'Layout selector', 'coblocks' ) }
			help={ __( 'Allow layout selection on new pages', 'coblocks' ) }
		/>
	),
} );
