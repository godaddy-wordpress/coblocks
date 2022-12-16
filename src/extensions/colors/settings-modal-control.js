/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import CoBlocksSettingsModalControl from '../coblocks-settings/coblocks-settings-slot';
import {
	COLORS_CUSTOM_FEATURE_ENABLED_KEY,
	COLORS_FEATURE_ENABLED_KEY,
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

	const prevColorSettings = useRef( null );

	const { updateSettings } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		// Skip if the settings have not loaded yet.
		const hasSettings = [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ].every( ( value ) => value !== undefined );
		if ( ! hasSettings || ! settings ) {
			return;
		}

		let newSettings = {};

		if ( ! colorPanelEnabled ) {
			prevColorSettings.current = {
				colors: settings.colors,
				gradients: settings.gradients,

				/* eslint-disable sort-keys */
				__experimentalFeatures: settings?.__experimentalFeatures,
				/* eslint-enable sort-keys */
			};

			newSettings = {
				...newSettings,
				colors: [],
				disableCustomColors: true,
				disableCustomGradients: true,
				gradients: [],

				/* eslint-disable sort-keys */
				__experimentalFeatures: {
					...settings?.__experimentalFeatures,
					color: {
						...settings?.__experimentalFeatures?.color,
						palette: {
							default: [],
							theme: [],
						},
						gradients: {
							default: [],
							theme: [],
						},
					},
				},
				/* eslint-enable sort-keys */
			};
		}

		if ( colorPanelEnabled && prevColorSettings.current?.colors ) {
			newSettings = {
				...newSettings,
				colors: prevColorSettings.current.colors,
				disableCustomColors: false,
				disableCustomGradients: false,
				gradients: prevColorSettings.current.gradients,

				/* eslint-disable sort-keys */
				__experimentalFeatures: {
					...settings?.__experimentalFeatures,
					color: {
						...settings?.__experimentalFeatures?.color,
						palette: {
							...prevColorSettings.current.__experimentalFeatures.color.palette,
						},
						gradients: {
							...prevColorSettings.current.__experimentalFeatures.color.gradients,
						},
					},
				},
				/* eslint-enable sort-keys */
			};
		}

		updateSettings( newSettings );
	}, [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ] );

	return (
		<CoBlocksSettingsModalControl>
			<CheckboxControl
				checked={ !! colorPanelEnabled }
				help={ __( 'Allow color settings throughout the editor.', 'coblocks' ) }
				label={ __( 'Color settings', 'coblocks' ) }
				onChange={ ( isEnabled ) => {
					setColorPanelEnabled( isEnabled );
					setCustomColorsEnabled( isEnabled );
					setGradientPresetsEnabled( isEnabled );
				} }
			/>

			{ colorPanelEnabled && (
				<CheckboxControl
					checked={ !! customColorsEnabled }
					help={ __( 'Allow styling with custom colors.', 'coblocks' ) }
					label={ __( 'Custom color pickers', 'coblocks' ) }
					onChange={ ( isEnabled ) => {
						setCustomColorsEnabled( isEnabled );
						setGradientPresetsEnabled( isEnabled );
					} }
				/>
			) }

			{ customColorsEnabled && (
				<CheckboxControl
					checked={ !! gradientPresetsEnabled }
					help={ __( 'Allow styling with gradient fills.', 'coblocks' ) }
					label={ __( 'Gradient styles', 'coblocks' ) }
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
