/**
 * External dependencies
 */
import classnames from 'classnames';
import findKey from 'lodash/findKey';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import FONT_SIZES from './font-sizes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, BlockAlignmentToolbar, PanelColor, ContrastChecker, PanelColorSettings, } = wp.editor;
const { PanelBody, ToggleControl, RangeControl, FontSizePicker, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
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
export default compose( applyWithColors, FallbackStyles ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.getFontSize = this.getFontSize.bind( this );
		this.setFontSize = this.setFontSize.bind( this );
	}

	getFontSize() {
		const { customFontSize, fontSize } = this.props.attributes;

		if ( fontSize ) {
			const fontSizeObj = find( FONT_SIZES, { name: fontSize } );
			if ( fontSizeObj ) {
				return fontSizeObj.size;
			}
		}

		if ( customFontSize ) {
			return customFontSize;
		}
	}

	setFontSize( fontSizeValue ) {

		const { setAttributes } = this.props;

		const thresholdFontSize = find( FONT_SIZES, { size: fontSizeValue } );

		if ( thresholdFontSize ) {
			setAttributes( {
				fontSize: thresholdFontSize,
				customFontSize: undefined,
			} );
			return;
		}
		setAttributes( {
			fontSize: undefined,
			customFontSize: fontSizeValue,
		} );
	}

	render() {

		const {
			attributes,
			buttonColor,
			textColor,
			setAttributes,
			setTextColor,
			setButtonColor,
			fallbackButtonColor,
			fallbackTextColor,
			fallbackFontSize,
		} = this.props;

		const fontSize = this.getFontSize();

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Text Settings' ) } className="blocks-font-size">
					<FontSizePicker
						fontSizes={ FONT_SIZES }
						fallbackFontSize={ fallbackFontSize }
						value={ fontSize }
						onChange={ this.setFontSize }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: textColor.value,
							onChange: setTextColor,
							label: __( 'Text Color' ),
						},
						{
							value: buttonColor.value,
							onChange: setButtonColor,
							label: __( 'Button Color' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: '#ffffff',
							backgroundColor: buttonColor.value,
							fallbackButtonColor,
							fallbackTextColor,
						} }
					/>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
} );
