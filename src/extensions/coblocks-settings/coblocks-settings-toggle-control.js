/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControl from './coblocks-settings-slot';

function CoBlocksSettingsToggleControl( { label, help, settingsKey } ) {
	const [ setting, saveSetting ] = useEntityProp( 'root', 'site', settingsKey );

	return (
		<CoBlocksSettingsModalControl>
			<CheckboxControl
				label={ label }
				help={ help }
				checked={ !! setting }
				onChange={ saveSetting }
			/>
		</CoBlocksSettingsModalControl>
	);
}

export default CoBlocksSettingsToggleControl;
