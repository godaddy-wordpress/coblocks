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
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
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
					<PanelBody title={ __( 'Hero settings', 'coblocks' ) }>
						<DimensionsControl { ...this.props }
							type={ 'padding' }
							label={ __( 'Padding', 'coblocks' ) }
							help={ __( 'Space inside of the container.', 'coblocks' ) }
							valueTop={ paddingTop }
							valueRight={ paddingRight }
							valueBottom={ paddingBottom }
							valueLeft={ paddingLeft }
							valueTopTablet={ paddingTopTablet }
							valueRightTablet={ paddingRightTablet }
							valueBottomTablet={ paddingBottomTablet }
							valueLeftTablet={ paddingLeftTablet }
							valueTopMobile={ paddingTopMobile }
							valueRightMobile={ paddingRightMobile }
							valueBottomMobile={ paddingBottomMobile }
							valueLeftMobile={ paddingLeftMobile }
							unit={ paddingUnit }
							syncUnits={ paddingSyncUnits }
							syncUnitsTablet={ paddingSyncUnitsTablet }
							syncUnitsMobile={ paddingSyncUnitsMobile }
							dimensionSize={ paddingSize }
							saveCoBlocksMeta={ saveCoBlocksMeta }
						/>
						<CSSGridControl { ...this.props } />
						{ ! fullscreen && (
							<ResponsiveBaseControl { ...this.props }
								label={ __( 'Height in pixels', 'coblocks' ) }
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
							label={ __( 'Content width in pixels', 'coblocks' ) }
							value={ parseInt( maxWidth ) }
							onChange={ ( nextMaxWidth ) => setAttributes( { maxWidth: parseInt( nextMaxWidth ) } ) }
							min={ 400 }
							max={ 1000 }
							step={ 10 }
							initialPosition={ 560 }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
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
								label: __( 'Background color', 'coblocks' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text color', 'coblocks' ),
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
