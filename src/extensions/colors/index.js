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
const { withColors, PanelColorSettings } = wp.editor;

/**
 * Export
 */
export {
	ColorSettingsAttributes,
	ColorSettingsClasses,
	ColorTransforms,
};

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
		customBackgroundColor,
	} = attributes;

	return [
		<Fragment>
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: customBackgroundColor,
						onChange: ( nextcustomBackgroundColor ) => setAttributes( {  customBackgroundColor: nextcustomBackgroundColor } ),
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
] )( ColorSettings );
