/**
 * External dependencies
 */
import classnames from 'classnames';
import findKey from 'lodash/findKey';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import FONT_SIZES from './font-sizes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component} = wp.element;
const { InspectorControls, BlockAlignmentToolbar, ColorPalette, ContrastChecker } = wp.editor;
const { PanelBody, PanelColor, ToggleControl, RangeControl, FontSizePicker } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

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
			setAttributes,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackFontSize,
		} = this.props;

		const {
			buttonColor,
			textColor,
		} = attributes;

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
				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						value={ textColor }
						onChange={ ( colorValue ) => setAttributes( { textColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Color' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						value={ buttonColor }
						onChange={ ( colorValue ) => setAttributes( { buttonColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
