/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal Dependencies
 */
import CoBlocksSettingsModalControl from '../coblocks-settings/coblocks-settings-slot';
import {
	COLORS_FEATURE_ENABLED_KEY,
	COLORS_CUSTOM_FEATURE_ENABLED_KEY,
	COLORS_GRADIENT_FEATURE_ENABLED_KEY,
} from './constants';

function CoBlocksEditorSettingsControls() {
	const [ colorPanelEnabled, setColorPanelEnabled ] = useEntityProp( 'root', 'site', COLORS_FEATURE_ENABLED_KEY );
	const [ customColorsEnabled, setCustomColorsEnabled ] = useEntityProp( 'root', 'site', COLORS_CUSTOM_FEATURE_ENABLED_KEY );
	const [ gradientPresetsEnabled, setGradientPresetsEnabled ] = useEntityProp( 'root', 'site', COLORS_GRADIENT_FEATURE_ENABLED_KEY );

	// Backup current settings so that we can reload when toggling settings.
	const { settings } = useSelect( ( select ) => {
		return { settings: select( 'core/block-editor' ).getSettings() };
	}, [] );

	const { updateSettings } = useDispatch( 'core/block-editor' );

	/**
	 * Toggles an editor setting while maintaining the original setting in localStorage.
	 *
	 * @param {string}  key       The local storage key of the toggled option.
	 * @param {boolean} isEnabled The enabled state of the option.
	 * @return {Array} The restored value or an empty array (if disabled).
	 */
	const setEditorSetting = ( key, isEnabled ) => {
		// Identify if experimental keys are passed and fetch those values directly
		let settingValue;
		switch ( key ) {
			case '__experimentalFeatures.color.palette':
				settingValue = settings?.__experimentalFeatures?.color?.palette ?? { core: [] };
				break;
			case '__experimentalFeatures.color.gradients':
				settingValue = settings?.__experimentalFeatures?.color?.gradients ?? { core: [] };
				break;
			default:
				settingValue = settings[ key ];
				break;
		}

		const localStorageValue = localStorage.getItem( key );
		/**
		 * Check whether the localStorage value is valid and should be used or discard to use original setting.
		 *
		 * @return {boolean} Whether or not the parsed localStorage is valid.
		 */
		const localStorageValueIsValid = () => {
			if ( Array.isArray( localStorageValue ) && ! localStorageValue.length ) {
				return false;
			}

			if ( localStorageValue?.constructor === Object && Object.keys( localStorageValue )?.length === 0 ) {
				return false;
			}

			return true;
		};

		// Backup settings if no key exists or if invalid value saved.
		if ( ! isEnabled && ! localStorageValueIsValid() ) {
			localStorage.setItem( key, JSON.stringify( settingValue ) );
		}

		// Feature is enabled so parse the stored value or return existing setting value.
		if ( isEnabled ) {
			// Check if stored value is empty array.
			return localStorageValue && localStorageValueIsValid()
				? JSON.parse( localStorageValue ) : settingValue;
		}

		// Feature is disabled return empty array to disable the setting.
		return [];
	};
	const enableEditorSetting = ( key ) => setEditorSetting( key, true );
	const disableEditorSetting = ( key ) => setEditorSetting( key, false );

	useEffect( () => {
		// Skip if the settings have not loaded yet.
		const hasSettings = [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ].every( ( value ) => value !== undefined );
		if ( ! hasSettings ) {
			return;
		}

		updateSettings( {
			colors: colorPanelEnabled ? enableEditorSetting( 'colors' ) : disableEditorSetting( 'colors' ),
			disableCustomColors: ! customColorsEnabled,
			disableCustomGradients: ! gradientPresetsEnabled,
			gradients: gradientPresetsEnabled ? enableEditorSetting( 'gradients' ) : disableEditorSetting( 'gradients' ),

			// Handle experimental features for WP 5.8
			__experimentalFeatures: {
				...settings?.__experimentalFeatures,
				color: {
					...settings?.__experimentalFeatures?.color,
					palette: colorPanelEnabled
						? enableEditorSetting( '__experimentalFeatures.color.palette' )
						: disableEditorSetting( '__experimentalFeatures.color.palette' ),
					gradients: gradientPresetsEnabled
						? enableEditorSetting( '__experimentalFeatures.color.gradients' )
						: disableEditorSetting( '__experimentalFeatures.color.gradients' ),
				},
			},
		} );
	}, [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ] );

	return (
		<CoBlocksSettingsModalControl>
			<CheckboxControl
				label={ __( 'Color settings', 'coblocks' ) }
				help={ __( 'Allow color settings throughout the editor.', 'coblocks' ) }
				checked={ !! colorPanelEnabled }
				onChange={ ( isEnabled ) => {
					setColorPanelEnabled( isEnabled );
					setCustomColorsEnabled( isEnabled );
					setGradientPresetsEnabled( isEnabled );
				} }
			/>

			{ colorPanelEnabled && (
				<CheckboxControl
					label={ __( 'Custom color pickers', 'coblocks' ) }
					help={ __( 'Allow styling with custom colors.', 'coblocks' ) }
					checked={ !! customColorsEnabled }
					onChange={ ( isEnabled ) => {
						setCustomColorsEnabled( isEnabled );
						setGradientPresetsEnabled( isEnabled );
					} }
				/>
			) }

			{ customColorsEnabled && (
				<CheckboxControl
					label={ __( 'Gradient styles', 'coblocks' ) }
					help={ __( 'Allow styling with gradient fills.', 'coblocks' ) }
					checked={ !! gradientPresetsEnabled }
					onChange={ ( isEnabled ) => {
						setGradientPresetsEnabled( isEnabled );
					} }
				/>
			) }
		</CoBlocksSettingsModalControl>
	);
}

registerPlugin( 'coblocks-editor-settings-controls', {
	render: () => ( <CoBlocksEditorSettingsControls /> ),
} );
