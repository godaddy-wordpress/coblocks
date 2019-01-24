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
const { PanelBody, BaseControl, ToggleControl, RangeControl } = wp.components;

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
			backgroundColor,
			fallbackBackgroundColor,
			setBackgroundColor,
		} = this.props;

		const {
			heightAlt,
			height,
			horizontalFlip,
			verticalFlip,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Divider Settings' ) }>
						<BaseControl label={ __( 'Shape Height in pixels' ) }>
							<input
								type="number"
								onChange={ ( event ) => {
									setAttributes( {
										height: parseInt( event.target.value, 10 ),
									} );
								} }
								value={ height }
								min="40"
								step="1"
							/>
						</BaseControl>
						<BaseControl label={ __( 'Divide Height in pixels' ) }>
							<input
								type="number"
								onChange={ ( event ) => {
									setAttributes( {
										heightAlt: parseInt( event.target.value, 10 ),
									} );
								} }
								value={ heightAlt }
								min="10"
								step="1"
							/>
						</BaseControl>
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
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
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
] )( Inspector );
