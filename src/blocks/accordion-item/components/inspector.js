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
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, ToggleControl } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, titleBackgroundColor, titleColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTitleBackgroundColor: titleBackgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTitleColor: titleColor || ! computedStyles ? undefined : computedStyles.color,
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
			setAttributes,
			backgroundColor,
			textColor,
			titleBackgroundColor,
			titleColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackTitleBackgroundColor,
			fallbackBorderColor,
			fallbackTitleColor,
			setBackgroundColor,
			setTextColor,
			setTitleBackgroundColor,
			setTitleColor,
		} = this.props;

		const {
			open,
		} = attributes;

		//add checker to hide heading level
		this.props.hideLevel = true;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Item Settings' ) }>
						<ToggleControl
							label={ __( 'Display Open' ) }
							checked={ !! open }
							onChange={ () => setAttributes( {  open: ! open } ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: titleBackgroundColor.color,
								onChange: setTitleBackgroundColor,
								label: __( 'Title Background' ),
							},
							{
								value: titleColor.color,
								onChange: setTitleColor,
								label: __( 'Title Color' ),
							},
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>
					<ContrastChecker
						{ ...{
							textColor: titleColor.color,
							backgroundColor: titleBackgroundColor.color,
							fallbackTitleColor,
							fallbackTitleBackgroundColor,
						} }
					/>
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
