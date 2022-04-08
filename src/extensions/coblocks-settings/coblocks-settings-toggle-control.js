/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControl from './coblocks-settings-slot';

function CoBlocksSettingsToggleControl( { label, help, settingsKey, shouldDisable = false } ) {
	const [ setting, saveSetting ] = useEntityProp( 'root', 'site', settingsKey );

	return (
		<CoBlocksSettingsModalControl>
			<CheckboxControl
				checked={ !! setting }
				// With the introduction of CoBlocks labs we now disable the Layout Selector when Go theme is not active.
				disabled={ shouldDisable ? true : false }
				help={ help }
				label={ label }
				onChange={ saveSetting }
			/>
		</CoBlocksSettingsModalControl>
	);
}

export default CoBlocksSettingsToggleControl;
