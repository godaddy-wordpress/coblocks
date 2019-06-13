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
const { withColors, PanelColorSettings } = wp.blockEditor;

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
		name,
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

	let colorSettings = [];

	if( ![ 'core/heading', 'core/list', 'core/quote' ].includes( name ) ){
		colorSettings.push({
			value: customBackgroundColor,
			onChange: ( nextcustomBackgroundColor ) => setAttributes( {  customBackgroundColor: nextcustomBackgroundColor } ),
			label: __( 'Background Color' ),
		});
	}

	colorSettings.push({
		value: customTextColor,
		onChange: ( nextcustomTextColor ) => setAttributes( {  customTextColor: nextcustomTextColor } ),
		label: __( 'Text Color' ),
	});

	return [
		<Fragment>
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ colorSettings }
			>
			</PanelColorSettings>
		</Fragment>
	];
}

export default compose( [
	withColors( { textColor: 'color' } ),
] )( ColorSettings );
