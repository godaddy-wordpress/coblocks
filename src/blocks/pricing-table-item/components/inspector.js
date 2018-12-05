/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, Toolbar, RangeControl, SelectControl } = wp.components;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const { tableBackground, tableColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackTableBackground: tableBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTableColor: tableColor || ! computedStyles ? undefined : computedStyles.color,
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
			fallbackTableBackground,
			fallbackTableColor,
			setAttributes,
			setTableBackground,
			setTableColor,
			tableBackground,
			tableColor,
			isSelected,
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
