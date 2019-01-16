/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './../../../utils/icons';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, ToggleControl, TextControl, TextareaControl, RangeControl } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, buttonBackground, buttonColor, cardBackgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackButtonBackground: buttonBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackCardBackgroundColor: cardBackgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
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
			backgroundColor,
			buttonColor,
			buttonBackground,
			cardBackgroundColor,
			fallbackBackgroundColor,
			fallbackCardBackgroundColor,
			fallbackButtonBackground,
			fallbackButtonColor,
			fallbackHeadingColor,
			fallbackTextColor,
			setAttributes,
			setBackgroundColor,
			setButtonBackground,
			setButtonColor,
			setCardBackgroundColor,
		} = this.props;

		const {
			alt,
			padding,
			button,
			buttonUrl,
			buttonTitle,
			hasImgShadow,
			hasCardShadow,
			imgUrl,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Image Card Settings' ) } className='block-coblocks__inspector-block-settings-panel-body'>
						<RangeControl
							label={ __( 'Padding as a percentage' ) }
							aria-label={ __( 'Padding for the main element as a percentage.' ) }
							value={ padding }
							onChange={ ( nextPadding ) => {
								setAttributes( {
									padding: nextPadding,
								} );
							} }
							min={ 0 }
							max={ 25 }
							step={ 1 }
						/>
						<ToggleControl
							label={ __( 'Image Shadow' ) }
							checked={ !! hasImgShadow }
							onChange={ () => setAttributes( {  hasImgShadow: ! hasImgShadow } ) }
						/>
						<ToggleControl
							label={ __( 'Card Shadow' ) }
							checked={ !! hasCardShadow }
							onChange={ () => setAttributes( {  hasCardShadow: ! hasCardShadow } ) }
						/>
						{ imgUrl && (
							<TextareaControl
								label={ __( 'Image Textual Alternative' ) }
								value={ alt }
								onChange={ ( nextAlt ) => setAttributes( { alt: nextAlt } ) }
							/>
						) }
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background' ),
							},
							{
								value: cardBackgroundColor.color,
								onChange: setCardBackgroundColor,
								label: __( 'Card Background' ),
							},
						] }
					>
					</PanelColorSettings>
					{ BackgroundImagePanel( this.props, { overlay: true } ) }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
