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
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.blockEditor;
const { withFallbackStyles } = wp.components;
const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			fallbackBackgroundColor,
			fallbackTextColor,
			setBackgroundColor,
			setTextColor,
			backgroundColor,
			textColor,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
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
								initialOpen: false,
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackTextColor,
								fallbackBackgroundColor,
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
] )( Inspector );
