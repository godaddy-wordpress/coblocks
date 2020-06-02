/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import ResponsiveBaseControl from '../../components/responsive-base-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

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
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Divider settings', 'coblocks' ) }>
						<ResponsiveBaseControl { ...this.props }
							label={ __( 'Shape height in pixels', 'coblocks' ) }
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
							label={ __( 'Background height in pixels', 'coblocks' ) }
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
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: color.color,
								onChange: setColor,
								label: __( 'Shape color', 'coblocks' ),
							},
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background color', 'coblocks' ),
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
