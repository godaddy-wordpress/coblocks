/**
 * Internal dependencies
 */
import ColorSettingsAttributes from './attributes';
import ColorSettingsClasses from './classes';
import ColorTransforms from './transform';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withColors, ColorPalette, PanelColorSettings, } = wp.editor;
const { PanelBody, withFallbackStyles, } = wp.components;

/**
 * Export
 */
export {
	ColorSettingsAttributes,
	ColorSettingsClasses,
	ColorTransforms,
};

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Color Settings
 */
function ColorSettings( props, options ) {

	const {
		attributes,
		fallbackTextColor,
		setAttributes,
		setTextColor,
		textColor,
	} = props;

	const {
		customTextColor,
		customCoBlocksBackgroundColor,
	} = attributes;

	return [
		<Fragment>
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				className="blocks-font-size"
				initialOpen={ false }
				colorSettings={ [
					{
						value: customCoBlocksBackgroundColor,
						onChange: ( nextcustomBackgroundColor ) => setAttributes( {  customCoBlocksBackgroundColor: nextcustomBackgroundColor } ),
						label: __( 'Background Color' ),
					},
					{
						value: customTextColor,
						onChange: ( nextcustomTextColor ) => setAttributes( {  customTextColor: nextcustomTextColor } ),
						label: __( 'Text Color' ),
					},
				] }
			>
			</PanelColorSettings>
		</Fragment>
	];
}

export default compose( [
	withColors( { textColor: 'color' } ),
	// withFontSizes( 'fontSize' ),
	// applyFallbackStyles,
] )( ColorSettings );
