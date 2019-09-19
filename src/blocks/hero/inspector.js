/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control/';
import CSSGridControl from '../../components/grid-control/';
import ResponsiveBaseControl from '../../components/responsive-base-control/';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { PanelBody, RangeControl, withFallbackStyles } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			attributes,
			backgroundColor,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			fullscreen,
			maxWidth,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSyncUnits,
			paddingSize,
			saveCoBlocksMeta,
			height,
			heightTablet,
			heightMobile,
			syncHeight,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Hero Settings' ) }>
						<DimensionsControl { ...this.props }
							type={ 'padding' }
							label={ __( 'Padding' ) }
							help={ __( 'Space inside of the container.' ) }
							valueTop={ paddingTop }
							valueRight={ paddingRight }
							valueBottom={ paddingBottom }
							valueLeft={ paddingLeft }
							unit={ paddingUnit }
							syncUnits={ paddingSyncUnits }
							dimensionSize={ paddingSize }
							saveCoBlocksMeta={ saveCoBlocksMeta }
						/>
						<CSSGridControl { ...this.props } />
						{ ! fullscreen && (
							<ResponsiveBaseControl { ...this.props }
								label={ __( 'Height in pixels' ) }
								height={ height }
								heightTablet={ heightTablet }
								heightMobile={ heightMobile }
								onChange={ ( event ) => {
									setAttributes( { height: parseInt( event.target.value, 10 ) } );
								} }
								onChangeTablet={ ( event ) => {
									setAttributes( { heightTablet: parseInt( event.target.value, 10 ) } );
								} }
								onChangeMobile={ ( event ) => {
									setAttributes( { heightMobile: parseInt( event.target.value, 10 ) } );
								} }
								sync={ syncHeight }
								type="height"
								min="500"
							/>
						) }
						<RangeControl
							label={ __( 'Content width in pixels' ) }
							value={ parseInt( maxWidth ) }
							onChange={ ( nextMaxWidth ) => setAttributes( { maxWidth: parseInt( nextMaxWidth ) } ) }
							min={ 400 }
							max={ 1000 }
							step={ 10 }
							initialPosition={ 560 }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: ( nextBackgroundColor ) => {
									setBackgroundColor( nextBackgroundColor );

									// Add padding if there's none.
									if ( ! paddingSize || paddingSize === 'no' ) {
										setAttributes( { paddingSize: 'huge' } );
									}
								},
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>
					</PanelColorSettings>
					<BackgroundPanel { ...this.props }
						hasOverlay={ true }
					/>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
