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
import { update } from 'lodash';

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

	const saveToStorage = ( key, value ) => {
		localStorage.setItem( key, JSON.stringify( value ) );
	};

	const retrieveFromStorage = ( key ) => {
		const foundKey = localStorage.getItem( key );

		if ( ! foundKey ) {
			return null;
		}

		return JSON.parse( foundKey );
	};

	useEffect( () => {
		const savedColors = retrieveFromStorage( 'colors' );
		const savedGradients = retrieveFromStorage( 'gradients' );
		const savedExperimentalPalette = retrieveFromStorage( '__experimentalFeatures.color.palette' );
		const savedExperimentalGradients = retrieveFromStorage( '__experimentalFeatures.color.gradients' );

		const initialSettings = {
			...settings,
			colors: savedColors,
			disableCustomColors: savedColors.length === 0,
			disableCustomGradients: savedGradients.length === 0,
			gradients: savedGradients,

			/* eslint-disable sort-keys */
			__experimentalFeatures: {
				...settings?.__experimentalFeatures,
				color: {
					...settings?.__experimentalFeatures?.color,
					gradients: savedExperimentalGradients ? savedExperimentalGradients : { default: [], theme: [] },
					palette: savedExperimentalPalette ? savedExperimentalPalette : { default: [], theme: [] },
				},
			},
			/* eslint-enable sort-keys */
		};

		// setColorPanelEnabled( savedColors.length > 0 );
		// setCustomColorsEnabled( savedColors.length > 0 );
		// setGradientPresetsEnabled( savedGradients.length > 0 );

		console.log( 'initialSettings', initialSettings );

		updateSettings( initialSettings );
	}, [ updateSettings ] );

	// useEffect( () => {
	// 	// Skip if the settings have not loaded yet.
	// 	const hasSettings = [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ].every( ( value ) => value !== undefined );
	// 	if ( ! hasSettings || ! settings ) {
	// 		return;
	// 	}

	// 	let newSettings = {};

	// 	if ( prevColorSettings.current === null ) {
	// 		console.log( 'MOUNT' );
	// 		const savedColors = retrieveFromStorage( 'colors' );
	// 		const savedGradients = retrieveFromStorage( 'gradients' );
	// 		const savedExperimentalPalette = retrieveFromStorage( '__experimentalFeatures.color.palette' );
	// 		const savedExperimentalGradients = retrieveFromStorage( '__experimentalFeatures.color.gradients' );

	// 		prevColorSettings.current = {
	// 			colors: savedColors,
	// 			disableCustomColors: savedColors.length > 0,
	// 			disableCustomGradients: savedGradients.length > 0,
	// 			gradients: savedGradients,

	// 			/* eslint-disable sort-keys */
	// 			__experimentalFeatures: {
	// 				...settings?.__experimentalFeatures,
	// 				color: {
	// 					...settings?.__experimentalFeatures?.color,
	// 					gradients: savedExperimentalGradients ? savedExperimentalGradients : { default: [], theme: [] },
	// 					palette: savedExperimentalPalette ? savedExperimentalPalette : { default: [], theme: [] },
	// 				},
	// 			},
	// 			/* eslint-enable sort-keys */
	// 		};

	// 		newSettings = {
	// 			...settings,
	// 			colors: savedColors,
	// 			disableCustomColors: savedColors.length === 0,
	// 			disableCustomGradients: savedGradients.length === 0,
	// 			gradients: savedGradients,

	// 			__experimentalFeatures: {
	// 				...settings?.__experimentalFeatures,
	// 				color: {
	// 					...settings?.__experimentalFeatures?.color,
	// 					gradients: savedExperimentalGradients ? savedExperimentalGradients : { default: [], theme: [] },
	// 					palette: savedExperimentalPalette ? savedExperimentalPalette : { default: [], theme: [] },
	// 				},
	// 			},

	// 		};

	// 		setColorPanelEnabled( savedColors.length > 0 );
	// 		setCustomColorsEnabled( savedColors.length > 0 );
	// 		setGradientPresetsEnabled( savedGradients.length > 0 );
	// 	} else if ( ! colorPanelEnabled ) {
	// 		console.log( 'DISABLE' );
	// 		saveToStorage( 'colors', [] );
	// 		saveToStorage( 'gradients', [] );
	// 		saveToStorage( '__experimentalFeatures.color.palette', { default: [], theme: [] } );
	// 		saveToStorage( '__experimentalFeatures.color.gradients', { default: [], theme: [] } );

	// 		prevColorSettings.current = {
	// 			colors: [],
	// 			disableCustomColors: true,
	// 			disableCustomGradients: true,
	// 			gradients: [],

	// 			/* eslint-disable sort-keys */
	// 			__experimentalFeatures: {
	// 				...settings?.__experimentalFeatures,
	// 				color: {
	// 					...settings?.__experimentalFeatures?.color,
	// 					palette: {
	// 						default: [],
	// 						theme: [],
	// 					},
	// 					gradients: {
	// 						default: [],
	// 						theme: [],
	// 					},
	// 				},
	// 			},
	// 			/* eslint-enable sort-keys */
	// 		};

	// 		newSettings = {
	// 			...newSettings,
	// 			colors: [],
	// 			disableCustomColors: true,
	// 			disableCustomGradients: true,
	// 			gradients: [],

	// 			/* eslint-disable sort-keys */
	// 			__experimentalFeatures: {
	// 				...settings?.__experimentalFeatures,
	// 				color: {
	// 					...settings?.__experimentalFeatures?.color,
	// 					palette: {
	// 						default: [],
	// 						theme: [],
	// 					},
	// 					gradients: {
	// 						default: [],
	// 						theme: [],
	// 					},
	// 				},
	// 			},
	// 			/* eslint-enable sort-keys */
	// 		};
	// 	} else if ( colorPanelEnabled && prevColorSettings.current?.colors ) {
	// 		console.log( 'ENABLE' );
	// 		saveToStorage( 'colors', prevColorSettings.current.colors );
	// 		saveToStorage( 'gradients', prevColorSettings.current.gradients );
	// 		saveToStorage( '__experimentalFeatures.color.palette', { ...prevColorSettings.current.__experimentalFeatures.color.palette } );
	// 		saveToStorage( '__experimentalFeatures.color.gradients', { ...prevColorSettings.current.__experimentalFeatures.color.gradients } );

	// 		newSettings = {
	// 			...newSettings,
	// 			colors: prevColorSettings.current.colors,
	// 			disableCustomColors: false,
	// 			disableCustomGradients: false,
	// 			gradients: prevColorSettings.current.gradients,

	// 			/* eslint-disable sort-keys */
	// 			__experimentalFeatures: {
	// 				...settings?.__experimentalFeatures,
	// 				color: {
	// 					...settings?.__experimentalFeatures?.color,
	// 					palette: {
	// 						...prevColorSettings.current.__experimentalFeatures.color.palette,
	// 					},
	// 					gradients: {
	// 						...prevColorSettings.current.__experimentalFeatures.color.gradients,
	// 					},
	// 				},
	// 			},
	// 			/* eslint-enable sort-keys */
	// 		};
	// 	}

	// 	// console.log( 'DIRECTLY BEFORE UPDATE SETTINGS', newSettings );

	// 	updateSettings( newSettings );
	// }, [ colorPanelEnabled, customColorsEnabled, gradientPresetsEnabled ] );

	console.log( 'settings directly before render', settings.colors );

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
