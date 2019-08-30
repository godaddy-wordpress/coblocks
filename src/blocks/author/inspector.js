/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings, withColors, FontSizePicker, withFontSizes } = wp.blockEditor;
const { PanelBody } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			backgroundColor,
			setBackgroundColor,
			setTextColor,
			textColor,
			setFontSize,
			fallbackFontSize,
			fontSize,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Author Settings' ) } className="blocks-font-size">
						<FontSizePicker
							label={ 'test' }
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
							} }
							fontSize={ fontSize.size }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
