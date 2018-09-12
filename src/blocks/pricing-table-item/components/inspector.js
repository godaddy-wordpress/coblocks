/**
 * Internal dependencies
 */
import Colors from './colors';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColor, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, Toolbar, RangeControl, SelectControl } = wp.components;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		buttonBackground,
		buttonColor,
		tableBackground,
		tableColor,
	} = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackButtonBackground: buttonBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackTableBackground: tableBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTableColor: tableColor || ! computedStyles ? undefined : computedStyles.color,
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
			attributes,
			buttonBackground,
			buttonColor,
			fallbackButtonBackground,
			fallbackButtonColor,
			fallbackTableBackground,
			fallbackTableColor,
			setAttributes,
			setButtonBackground,
			setButtonColor,
			setTableBackground,
			setTableColor,
			tableBackground,
			tableColor,
		} = this.props;

		const {
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: tableBackground.color,
								onChange: setTableBackground,
								label: __( 'Background Color' ),
							},
							{
								value: tableColor.color,
								onChange: setTableColor,
								label: __( 'Text Color' ),
								initialOpen: false,
							},
							{
								value: buttonBackground.color,
								onChange: setButtonBackground,
								label: __( 'Button Background Color' ),
							},
							{
								value: buttonColor.color,
								onChange: setButtonColor,
								label: __( 'Button Text Color' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: tableColor.color,
								backgroundColor: tableBackground.color,
								fallbackTableColor,
								fallbackTableBackground,
							} }
						/>
						<ContrastChecker
							{ ...{
								textColor: buttonColor.color,
								backgroundColor: buttonBackground.color,
								fallbackButtonColor,
								fallbackButtonBackground,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
} );
