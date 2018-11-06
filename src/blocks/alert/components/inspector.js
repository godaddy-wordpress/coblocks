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
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		textColor,
		titleColor,
		backgroundColor,
	} = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackTitleColor: titleColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
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
			backgroundColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackTitleColor,
			setBackgroundColor,
			setBorderColor,
			setTextColor,
			setTitleColor,
			textColor,
			titleColor,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
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
								value: titleColor.color,
								onChange: setTitleColor,
								label: __( 'Heading Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
};

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );