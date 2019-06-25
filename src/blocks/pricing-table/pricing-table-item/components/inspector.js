/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './../../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.blockEditor;
const { PanelBody, withFallbackStyles, Toolbar, RangeControl, SelectControl } = wp.components;

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

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			fallbackBackgroundColor,
			fallbackTextColor,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			backgroundColor,
			textColor,
			isSelected,
		} = this.props;

		const {
		} = attributes;

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
};

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
