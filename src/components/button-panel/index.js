/**
 * Internal dependencies
 */
import ButtonPanelAttributes from './attributes';
import ButtonPanelClasses from './classes';
import ButtonTransforms from './transforms';
import FontSizes from './../../utils/font-sizes';
import FontFamilyPicker from './../../components/font-family/index';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withColors, ColorPalette, withFontSizes, ContrastChecker, PanelColorSettings } = wp.editor;
const { TextControl, RangeControl, ToggleControl, PanelBody, withFallbackStyles, FontSizePicker } = wp.components;

/**
 * Export
 */
export {
	ButtonPanelAttributes,
	ButtonPanelClasses,
	ButtonTransforms,
};

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { buttonColor, buttonFontSize, customButtonFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackButtonFontSize: buttonFontSize || customButtonFontSize || ! computedStyles ? undefined : parseInt( computedStyles.buttonFontSize ) || undefined,
		fallbackButtonBackground: buttonBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

/**
 * Paragraph Text Component
 */
function TypographyPanel( props, options ) {

	const {
		attributes,
		fallbackButtonFontSize,
		fallbackButtonColor,
		fallbackButtonBackground,
		buttonFontSize,
		setAttributes,
		setButtonFontSize,
		setButtonColor,
		setButtonBackground,
		buttonColor,
		buttonBackground,
		setBackgroundColor,
		buttonColor_2,
		buttonBackground_2,
		setButtonColor_2,
		setButtonBackground_2,
	} = props;

	const {
		button,
		buttonUrl,
		buttonTitle,
		buttonFontFamily,
		buttonLineHeight,
		openTab,
		button_2,
		buttonUrl_2,
		buttonTitle_2,
		openTab_2,
		buttonBorderRadius,
	} = attributes;
	return [
		<Fragment>
			<PanelBody title={ __( 'Button Settings' ) } className="blocks-font-size components-coblocks__inspector--button-panel" initialOpen={ false }>
				{ ( button && button.length ) ? (
					<TextControl
						label={ __( 'Button Link' ) }
						value={ buttonUrl }
						onChange={ ( nextButtonUrl ) => setAttributes( { buttonUrl: nextButtonUrl } ) }
					/>
				) : null }
				{ ( buttonUrl && buttonUrl.length ) ? (
					<TextControl
						label={ __( 'Button Textual Alternative' ) }
						value={ buttonTitle }
						onChange={ ( nextButtonTitle ) => setAttributes( { buttonTitle: nextButtonTitle } ) }
					/>
				) : null }
				<ToggleControl
					label={ __( 'Open New Tab' ) }
					checked={ !! openTab }
					onChange={ () => setAttributes( {  openTab: ! openTab } ) }
				/>
				<FontSizePicker
					fontSizes={ FontSizes }
					value={ buttonFontSize.size }
					fallbackFontSize={ fallbackButtonFontSize }
					onChange={ setButtonFontSize }
				/>
				<RangeControl
					className="components-coblocks__inspector-control--line-height"
					label={ __( 'Line Height' ) }
					value={ buttonLineHeight || null }
					onChange={ ( nextLineHeight ) => setAttributes( {  buttonLineHeight: nextLineHeight } ) }
					min={ 0 }
					max={ 3 }
					step={ .1 }
					beforeIcon={ 'minus' }
					afterIcon={ 'plus' }
				/>
				<RangeControl
					className="components-coblocks__inspector-control--border-radius"
					label={ __( 'Border Radius' ) }
					value={ buttonBorderRadius || null }
					onChange={ ( nextBorderRadius ) => setAttributes( {  buttonBorderRadius: nextBorderRadius } ) }
					min={ 0 }
					max={ 100 }
					step={ 1 }
					beforeIcon={ 'minus' }
					afterIcon={ 'plus' }
				/>
				<FontFamilyPicker
					label={ __( 'Font Family' ) }
					value={ buttonFontFamily }
					onChange={ ( nextFontFamily ) => setAttributes( { buttonFontFamily: nextFontFamily } ) }
				/>
				<p className="components-coblocks__inspector-control--custom-colorpalette-label">{ __( 'Text Color' ) }</p>
				<ColorPalette
					className="components-coblocks__inspector-custom-control--colorpalette"
					label={ __( 'Text Color' ) }
					value={ buttonColor.color }
					onChange={ setButtonColor }
				/>
				<p className="components-coblocks__inspector-control--custom-colorpalette-label">{ __( 'Background Color' ) }</p>
				<ColorPalette
					className="components-coblocks__inspector-custom-control--colorpalette"
					label={ __( 'Background Color' ) }
					value={ buttonBackground.color }
					onChange={ setButtonBackground }
				/>
				{ ( ( props.secondButton !== undefined ) && props.secondButton && ( button_2 && button_2.length ) ) ?
					[<br />,<h3>{ __( 'Second Button Settings' ) }</h3>,
					<TextControl
						label={ __( 'Button Link' ) }
						value={ buttonUrl_2 }
						onChange={ ( nextButtonUrl ) => setAttributes( { buttonUrl_2: nextButtonUrl } ) }
					/>,
					<TextControl
						label={ __( 'Button Textual Alternative' ) }
						value={ buttonTitle_2 }
						onChange={ ( nextButtonTitle ) => setAttributes( { buttonTitle_2: nextButtonTitle } ) }
					/>,
					<ToggleControl
						label={ __( 'Open New Tab' ) }
						checked={ !! openTab_2 }
						onChange={ () => setAttributes( {  openTab_2: ! openTab_2 } ) }
					/>,
					<p className="components-coblocks__inspector-control--custom-colorpalette-label">{ __( 'Text Color' ) }</p>,
					<ColorPalette
						className="components-coblocks__inspector-custom-control--colorpalette"
						label={ __( 'Text Color' ) }
						value={ buttonColor_2.color }
						onChange={ setButtonColor_2 }
					/>,
					<p className="components-coblocks__inspector-control--custom-colorpalette-label">{ __( 'Background Color' ) }</p>,
					<ColorPalette
						className="components-coblocks__inspector-custom-control--colorpalette"
						label={ __( 'Background Color' ) }
						value={ buttonBackground_2.color }
						onChange={ setButtonBackground_2 }
					/>,]
					: null }
			</PanelBody>
		</Fragment>
	];
}

export default compose( [
	withColors( { buttonColor: 'color', buttonBackground : 'background-color', buttonColor_2: 'color', buttonBackground_2 : 'background-color' } ),
	withFontSizes( 'buttonFontSize' ),
	// applyFallbackStyles,
] )( TypographyPanel );
