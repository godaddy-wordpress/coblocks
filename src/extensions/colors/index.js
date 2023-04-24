/**
 * Internal dependencies
 */
import ColorSettingsAttributes from './attributes';
import ColorSettingsClasses from './classes';
import ColorTransforms from './transform';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withColors, PanelColorSettings } from '@wordpress/block-editor';

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

		if ( ! [ 'core/list', 'core/quote' ].includes( name ) ) {
			colorSettings.push( {
				value: customBackgroundColor,
				onChange: ( nextcustomBackgroundColor ) => setAttributes( { customBackgroundColor: nextcustomBackgroundColor } ),
				label: __( 'Background color', 'coblocks' ),
			} );
		}

		colorSettings.push( {
			value: customTextColor,
			onChange: ( nextcustomTextColor ) => setAttributes( { customTextColor: nextcustomTextColor } ),
			label: __( 'Text color', 'coblocks' ),
		} );

		return (
			<PanelColorSettings
				title={ __( 'Color settings', 'coblocks' ) }
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
