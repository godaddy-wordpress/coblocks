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
const { Component } = wp.element;
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
class ColorSettings extends Component {
	render() {
		const {
			name,
			attributes,
			setAttributes,
		} = this.props;

		const {
			customTextColor,
			customBackgroundColor,
		} = attributes;

		const colorSettings = [];

		if ( ! [ 'core/heading', 'core/list', 'core/quote' ].includes( name ) ) {
			colorSettings.push( {
				value: customBackgroundColor,
				onChange: ( nextcustomBackgroundColor ) => setAttributes( { customBackgroundColor: nextcustomBackgroundColor } ),
				label: __( 'Background Color' ),
			} );
		}

		colorSettings.push( {
			value: customTextColor,
			onChange: ( nextcustomTextColor ) => setAttributes( { customTextColor: nextcustomTextColor } ),
			label: __( 'Text Color' ),
		} );

		return (
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ colorSettings }
			>
			</PanelColorSettings>
		);
	}
}

export default compose( [
	withColors( { textColor: 'color' } ),
] )( ColorSettings );
