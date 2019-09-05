/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings, FontSizePicker } = wp.blockEditor;
const { PanelBody } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setFontSize,
			fallbackFontSize,
			fontSize,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Text Settings' ) } className="blocks-font-size">
						<FontSizePicker
							fallbackFontSize={ fallbackFontSize }
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackBackgroundColor,
								fallbackTextColor,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Inspector );
