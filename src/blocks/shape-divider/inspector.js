/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import OrientationControl from '../../components/orientation';
import ResponsiveBaseControl from '../../components/responsive-base-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.setSizeControl = this.setSizeControl.bind( this );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { horizontalFlip: value } );
	}

	render() {
		const {
			attributes,
			setAttributes,
			setColor,
			color,
			backgroundColor,
			setBackgroundColor,
		} = this.props;

		const {
			shapeHeight,
			shapeHeightTablet,
			shapeHeightMobile,
			backgroundHeight,
			backgroundHeightMobile,
			backgroundHeightTablet,
			syncHeight,
			horizontalFlip,
			verticalFlip,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Divider Settings' ) }>
						<ResponsiveBaseControl { ...this.props }
							label={ __( 'Shape Height in pixels' ) }
							height={ shapeHeight }
							heightTablet={ shapeHeightTablet }
							heightMobile={ shapeHeightMobile }
							onChange={ ( event ) => {
								setAttributes( { shapeHeight: parseInt( event.target.value, 10 ) } );
							} }
							onChangeTablet={ ( event ) => {
								setAttributes( { shapeHeightTablet: parseInt( event.target.value, 10 ) } );
							} }
							onChangeMobile={ ( event ) => {
								setAttributes( { shapeHeightMobile: parseInt( event.target.value, 10 ) } );
							} }
							sync={ syncHeight }
							type="shapeHeight"
							min="40"
						/>
						<ResponsiveBaseControl { ...this.props }
							label={ __( 'Background Height in pixels' ) }
							height={ backgroundHeight }
							heightTablet={ backgroundHeightTablet }
							heightMobile={ backgroundHeightMobile }
							onChange={ ( event ) => {
								setAttributes( { backgroundHeight: parseInt( event.target.value, 10 ) } );
							} }
							onChangeTablet={ ( event ) => {
								setAttributes( { backgroundHeightTablet: parseInt( event.target.value, 10 ) } );
							} }
							onChangeMobile={ ( event ) => {
								setAttributes( { backgroundHeightMobile: parseInt( event.target.value, 10 ) } );
							} }
							sync={ syncHeight }
							type="backgroundHeight"
							min="20"
						/>
						<OrientationControl { ...this.props }
							label={ __( 'Orientation' ) }
							horizontalFlip={ horizontalFlip }
							verticalFlip={ verticalFlip }
							onHorizontalFlip={ () => setAttributes( { horizontalFlip: ! horizontalFlip } ) }
							onVerticalFlip={ () => setAttributes( { verticalFlip: ! verticalFlip } ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: color.color,
								onChange: setColor,
								label: __( 'Shape Color' ),
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
