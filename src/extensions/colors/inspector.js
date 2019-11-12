/**
 * Internal dependencies
 */
import ColorSettings, { ColorSettingsAttributes } from './index';

/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Inspector.
 *
 * @param {Object} props Block props.
 * @return {Object} Settings for the Settings Sidebar.
 */
const Inspector = props => {
	const allowedBlocks = [ 'core/cover', 'core/button', 'core/list', 'core/quote' ];

	// Display on the allowedBlocks only.
	if ( ! allowedBlocks.includes( props.name ) ) {
		props.attributes.textPanelHideSize = true;
	} else {
		props.attributes.textPanelHeadingFontSizes = true;
	}

	// Show line height on appropriate blocks.
	if ( ! [ 'core/paragraph', 'core/cover', 'core/button' ].includes( props.name ) ) {
		props.attributes.textPanelLineHeight = true;
	}

	props.attributes.textPanelHideColor = true;
	props.attributes.textPanelShowSpacingControls = true;

	return (
		<InspectorControls>
			<ColorSettings { ...props } />
		</InspectorControls>
	);
};

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
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
 * @param {function|Component} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const allowedBlocks = [ 'core/list', 'core/quote' ];
		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ props.isSelected && allowedBlocks.includes( props.name ) && <Inspector { ... { ...props } } /> }
			</Fragment>
		);
	};
}, 'withInspectorControl' );

addFilter(
	'blocks.registerBlockType',
	'coblocks/colors/attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'coblocks/colors',
	withInspectorControl
);
