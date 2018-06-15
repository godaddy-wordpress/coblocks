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
const { Component, compose } = wp.element;
const { InspectorControls, BlockAlignmentToolbar, PanelColor, ContrastChecker } = wp.editor;
const { PanelBody, ToggleControl, RangeControl, FontSizePicker, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const ContrastCheckerWithFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, buttonColor } = ownProps;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColor && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackButtonColor: buttonColor || ! node ? undefined : getComputedStyle( node ).buttonColor,
		fallbackTextColor: textColor || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} )( ContrastChecker );

/**
 * Inspector controls
 */
export default compose( applyWithColors ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind( this );
		this.getFontSize = this.getFontSize.bind( this );
		this.setFontSize = this.setFontSize.bind( this );
	}

	bindRef( node ) {
		if ( ! node ) {
			return;
		}
		this.nodeRef = node;
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
				<PanelBody title={ __( 'Text Settings' ) }>
					<FontSizePicker
						fontSizes={ FONT_SIZES }
						fallbackFontSize={ fallbackFontSize }
						value={ fontSize }
						onChange={ this.setFontSize }
					/>
				</PanelBody>
				<PanelColor
					colorValue={ textColor.value }
					title={ __( 'Text Color' ) }
					onChange={ setTextColor }
					initialOpen={ true }
				/>
				<PanelColor
					colorValue={ buttonColor.value }
					title={ __( 'Button Color' ) }
					onChange={ setButtonColor }
					initialOpen={ true }
				/>
				{ <ContrastCheckerWithFallbackStyles
					node={ this.nodeRef }
					textColor={ '#ffffff' }
					backgroundColor={ buttonColor.value }
				/> }
			</InspectorControls>
		);
	}
} );
