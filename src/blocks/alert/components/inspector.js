/**
 * Internal dependencies
 */
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ColorPalette, PanelColor, PanelColorSettings } = wp.editor;
const { PanelBody, FormToggle, RangeControl, SelectControl, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		textColor,
		titleColor,
		backgroundColor,
		borderColor
	} = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackTitleColor: titleColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackBorderColor: borderColor || ! computedStyles ? undefined : computedStyles.borderColor,
	};
} );

/**
 * Inspector controls
 */
export default compose( Colors, FallbackStyles ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			backgroundColor,
			borderColor,
			textColor,
			titleColor,
			fallbackBackgroundColor,
			fallbackBorderColor,
			fallbackTextColor,
			fallbackTitleColor,
			setBackgroundColor,
			setBorderColor,
			setTextColor,
			setTitleColor,
		} = this.props;

		return (
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ true }
					colorSettings={ [
						{
							value: backgroundColor.value,
							onChange: setBackgroundColor,
							label: __( 'Background Color' ),
						},
						{
							value: titleColor.value,
							onChange: setTitleColor,
							label: __( 'Heading Color' ),
						},
						{
							value: textColor.value,
							onChange: setTextColor,
							label: __( 'Text Color' ),
						},
						{
							value: borderColor.value,
							onChange: setBorderColor,
							label: __( 'Border Color' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
} );