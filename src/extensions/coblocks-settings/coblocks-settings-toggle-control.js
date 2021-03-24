/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControl from './coblocks-settings-slot';

function CoBlocksSettingsToggleControl( { label, help, settingsKey } ) {
	const [ setting, saveSetting ] = useEntityProp( 'root', 'site', settingsKey );

	// Save the entity immediately.
	const { saveEntityRecord } = useDispatch( 'core' );
	useEffect( () => {
		if ( setting !== null ) {
			saveEntityRecord( 'root', 'site', { [ settingsKey ]: setting } );
		}
	}, [ setting ] );

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
