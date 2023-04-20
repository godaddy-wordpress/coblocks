/**
 * Internal dependencies
 */
import ColorSettings, { ColorSettingsAttributes } from './index';
import {
	COLORS_FEATURE_ENABLED_KEY,
} from './constants';
import './settings-modal-control';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Inspector.
 *
 * @param {Object} props Block props.
 * @return {Object} Settings for the Settings Sidebar.
 */
const Inspector = ( props ) => {
	const [ colorPanelEnabled ] = useEntityProp( 'root', 'site', COLORS_FEATURE_ENABLED_KEY );

	const allowedBlocks = [ 'core/cover', 'core/button', 'core/list', 'core/quote' ];

	const { name: blockName } = props;

	const extendedProps = { ...props };

	// Display on the allowedBlocks only.
	if ( ! allowedBlocks.includes( blockName ) ) {
		extendedProps.attributes.textPanelHideSize = true;
	} else {
		extendedProps.attributes.textPanelHeadingFontSizes = true;
	}

	// Show line height on appropriate blocks.
	if ( ! [ 'core/paragraph', 'core/cover', 'core/button' ].includes( blockName ) ) {
		extendedProps.attributes.textPanelLineHeight = true;
	}

	extendedProps.attributes.textPanelHideColor = true;
	extendedProps.attributes.textPanelShowSpacingControls = true;

	// if ( ! colorPanelEnabled && [ 'core/cover' ].includes( blockName ) ) {
	// 	const colorSettingsPanel = document.querySelector( '.color-block-support-panel' );

	// 	console.log( 'colorSettingsPanel', colorSettingsPanel );

	// 	if ( colorSettingsPanel ) {
	// 		colorSettingsPanel.style.display = 'none';
	// 	}
	// }

	return (
		<InspectorControls>
			<ColorSettings { ...extendedProps } />
		</InspectorControls>
	);
};

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function applyAttributes( settings ) {
	const allowedBlocks = [ 'core/list', 'core/quote' ];
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, ColorSettingsAttributes );
	}

	return settings;
}

/**
 * Override the default edit UI to include a new block inspector control
 *
 * @param {Object} props Selected block props.
 */
const useColorControls = ( props ) => {
	const allowedBlocks = [ 'core/cover', 'core/list', 'core/quote' ];

	return props.isSelected && allowedBlocks.includes( props.name )
		? ( <Inspector { ... { ...props } } /> )
		: null;
};

export { useColorControls, applyAttributes };

