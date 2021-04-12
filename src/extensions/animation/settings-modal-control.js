/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal Dependencies
 */
import CoBlocksSettingsToggleControl from '../coblocks-settings/coblocks-settings-toggle-control';
import { ANIMATION_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-animation-control', {
	render: () => (
		<CoBlocksSettingsToggleControl
			settingsKey={ ANIMATION_FEATURE_ENABLED_KEY }
			label={ __( 'Animation controls', 'coblocks' ) }
			help={ __( 'Allow animations to be used on blocks.', 'coblocks' ) }
		/>
	),
} );
