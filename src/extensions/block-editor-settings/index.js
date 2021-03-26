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

export const COLOR_PANEL_SETTINGS_KEY = 'coblocks_color_panel_controls_enabled';
export const CUSTOM_COLORS_SETTINGS_KEY = 'coblocks_custom_colors_controls_enabled';
export const GRADIENT_PRESETS_SETTINGS_KEY = 'coblocks_gradient_presets_enabled';

function CoBlocksEditorSettingsControls() {
	const [ colorPanelEnabled, setColorPanelEnabled ] = useEntityProp( 'root', 'site', COLOR_PANEL_SETTINGS_KEY );
	const [ customColorsEnabled, setCustomColorsEnabled ] = useEntityProp( 'root', 'site', CUSTOM_COLORS_SETTINGS_KEY );
	const [ gradientPresetsEnabled, setGradientPresetsEnabled ] = useEntityProp( 'root', 'site', GRADIENT_PRESETS_SETTINGS_KEY );

	// Backup current settings so that we can reload when toggling settings.
	const { settings } = useSelect( ( select ) => {
		return { settings: select( 'core/block-editor' ).getSettings() };
	}, [] );

	const { updateSettings } = useDispatch( 'core/block-editor' );

	/**
	 * Toggles an editor setting while maintaining the original setting in localStorage.
	 *
	 * @param {string} key The local storage key of the toggled option.
	 * @param {boolean} isEnabled The enabled state of the option.
	 * @return {Array} The restored value or an empty array (if disabled).
	 */
	const setEditorSetting = ( key, isEnabled ) => {
		if ( ! isEnabled ) {
			localStorage.setItem( key, JSON.stringify( settings[ key ] ) );
		}

		return isEnabled
			? ( JSON.parse( localStorage.getItem( key ) ) || settings[ key ] )
			: [];
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
			disableCustomColors: ! customColorsEnabled,
			colors: customColorsEnabled ? enableEditorSetting( 'colors' ) : disableEditorSetting( 'colors' ),
			disableCustomGradients: ! gradientPresetsEnabled,
			gradients: gradientPresetsEnabled ? enableEditorSetting( 'gradients' ) : disableEditorSetting( 'gradients' ),
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
