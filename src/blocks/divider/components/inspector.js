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
const { PanelBody, BaseControl, withFallbackStyles, ToggleControl} = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { color } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackColor: color || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateHeight = this.updateHeight.bind( this );
	}

	updateHeight( newHeight ) {
		this.props.setAttributes( { height: newHeight } );
	}

	render() {

		const {
			attributes,
			setAttributes,
			setColor,
			color,
			fallbackColor,
			isSelected,
		} = this.props;

		const {
			horizontalFlip,
			verticalFlip,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Divider Settings' ) }>
						<ToggleControl
							label={ __( 'Horizontal Flip' ) }
							checked={ !! horizontalFlip }
							onChange={ () => setAttributes( {  horizontalFlip: ! horizontalFlip } ) }
						/>
						<ToggleControl
							label={ __( 'Vertical Flip' ) }
							checked={ !! verticalFlip }
							onChange={ () => setAttributes( {  verticalFlip: ! verticalFlip } ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: color.color,
								onChange: setColor,
								label: __( 'Divider Color' ),
							},
						] }
					>
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
