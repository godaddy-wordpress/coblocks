/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import OrientationControl from '../../../components/orientation/';
import ResponsiveBaseControl from '../../../components/responsive-base-control/';

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
			fallbackColor,
			isSelected,
			backgroundColor,
			fallbackBackgroundColor,
			setBackgroundColor,
		} = this.props;

		const {
			height,
			heightTablet,
			heightMobile,
			heightAlt,
			heightAltMobile,
			heightAltTablet,
			syncHeight,
			horizontalFlip,
			verticalFlip,
			syncHeightAlt,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Divider Settings' ) }>
						<ResponsiveBaseControl { ...this.props }
							label={ __( 'Shape Height' ) }
							height={ height }
							heightTablet={ heightTablet }
							heightMobile={ heightMobile }
							onChange={ ( event ) => { setAttributes( { height: parseInt( event.target.value, 10 ) } ) } }
							onChangeTablet={ ( event ) => { setAttributes( { heightTablet: parseInt( event.target.value, 10 ) } ) } }
							onChangeMobile={ ( event ) => { setAttributes( { heightMobile: parseInt( event.target.value, 10 ) } ) } }
							sync={ syncHeight }
							min="40"
						/>
						<ResponsiveBaseControl { ...this.props }
							label={ __( 'Background Height' ) }
							height={ heightAlt }
							heightTablet={ heightAltTablet }
							heightMobile={ heightAltMobile }
							onChange={ ( event ) => { setAttributes( { heightAlt: parseInt( event.target.value, 10 ) } ) } }
							onChangeTablet={ ( event ) => { setAttributes( { heightAltTablet: parseInt( event.target.value, 10 ) } ) } }
							onChangeMobile={ ( event ) => { setAttributes( { heightAltMobile: parseInt( event.target.value, 10 ) } ) } }
							sync={ syncHeight }
							min="10"
						/>
						<BaseControl label={ __( 'Background Height in pixels' ) }>
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
						<OrientationControl { ...this.props }
							label={ __( 'Orientation' ) }
							help={ __( 'Flip vertically and horizontally.' ) }
							horizontalFlip={ horizontalFlip }
							verticalFlip={ verticalFlip }
							onHorizontalFlip={ () => setAttributes( {  horizontalFlip: ! horizontalFlip } ) }
							onVerticalFlip={ () => setAttributes( {  verticalFlip: ! verticalFlip } ) }
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
