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
const { InspectorControls, ContrastChecker, PanelColorSettings, FontSizePicker, withFontSizes } = wp.blockEditor;
const { PanelBody, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, buttonColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.buttonColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			buttonColor,
			fallbackButtonColor,
			fallbackFontSize,
			fallbackTextColor,
			fontSize,
			isSelected,
			setAttributes,
			setButtonColor,
			setFontSize,
			setTextColor,
			textColor,
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
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
							{
								value: buttonColor.color,
								onChange: setButtonColor,
								label: __( 'Button Color' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: '#ffffff',
								backgroundColor: buttonColor.color,
								fallbackButtonColor,
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
	applyFallbackStyles,
	withFontSizes( 'fontSize' ),
] )( Inspector );
