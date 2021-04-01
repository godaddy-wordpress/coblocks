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
import { TYPOGRAPHY_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-typography-control', {
	render: () => applyFilters( 'coblocks-show-layout-selector', true ) && (
		<CoBlocksSettingsToggleControl
			settingsKey={ TYPOGRAPHY_FEATURE_ENABLED_KEY }
			label={ __( 'Typography controls', 'coblocks' ) }
			help={ __( 'Allow block-level typography controls.', 'coblocks' ) }
		/>
	),
} );
