/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control/';
import OptionSelectorControl from '../../components/option-selector-control';
import gutterOptions from '../../utils/gutter-options';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
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
			clientId,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			columns,
			gutter,
			marginBottom,
			marginBottomMobile,
			marginBottomTablet,
			marginLeft,
			marginLeftMobile,
			marginLeftTablet,
			marginRight,
			marginRightMobile,
			marginRightTablet,
			marginSize,
			marginSyncUnits,
			marginSyncUnitsMobile,
			marginSyncUnitsTablet,
			marginTop,
			marginTopMobile,
			marginTopTablet,
			marginUnit,
			paddingBottom,
			paddingBottomMobile,
			paddingBottomTablet,
			paddingLeft,
			paddingLeftMobile,
			paddingLeftTablet,
			paddingRight,
			paddingRightMobile,
			paddingRightTablet,
			paddingSize,
			paddingSyncUnits,
			paddingSyncUnitsMobile,
			paddingSyncUnitsTablet,
			paddingTop,
			paddingTopMobile,
			paddingTopTablet,
			paddingUnit,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Features settings', 'coblocks' ) }>
						<RangeControl
							label={ __( 'Columns', 'coblocks' ) }
							value={ columns }
							onChange={ ( nextCount ) => {
								setAttributes( {
									columns: parseInt( nextCount ),
								} );

								if ( parseInt( nextCount ) < 2 ) {
									setAttributes( {
										gutter: 'no',
									} );
								} else if ( gutter === 'no' ) {
									setAttributes( {
										gutter: 'large',
									} );
								}

								wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId );
							} }
							min={ 1 }
							max={ 4 }
						/>
						{ columns >= 2 && <OptionSelectorControl
							label={ __( 'Gutter', 'coblocks' ) }
							currentOption={ gutter }
							options={ gutterOptions }
							onChange={ ( newGutter ) => setAttributes( { gutter: newGutter } ) }
						/> }
						<DimensionsControl { ...this.props }
							type={ 'padding' }
							label={ __( 'Padding', 'coblocks' ) }
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
						/>
						<DimensionsControl { ...this.props }
							type={ 'margin' }
							label={ __( 'Margin', 'coblocks' ) }
							valueTop={ marginTop }
							valueRight={ marginRight }
							valueBottom={ marginBottom }
							valueLeft={ marginLeft }
							valueTopTablet={ marginTopTablet }
							valueRightTablet={ marginRightTablet }
							valueBottomTablet={ marginBottomTablet }
							valueLeftTablet={ marginLeftTablet }
							valueTopMobile={ marginTopMobile }
							valueRightMobile={ marginRightMobile }
							valueBottomMobile={ marginBottomMobile }
							valueLeftMobile={ marginLeftMobile }
							unit={ marginUnit }
							syncUnits={ marginSyncUnits }
							syncUnitsTablet={ marginSyncUnitsTablet }
							syncUnitsMobile={ marginSyncUnitsMobile }
							dimensionSize={ marginSize }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: ( nextBackground ) => {
									setBackgroundColor( nextBackground );

									//add padding if there's none
									if ( ! paddingSize || paddingSize === 'no' ) {
										setAttributes( { paddingSize: 'medium' } );
									}

									//reset when cleared
									if ( ! nextBackground ) {
										setAttributes( { paddingSize: 'no' } );
									}
								},
								label: __( 'Background color', 'coblocks' ),
							}, {
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text color', 'coblocks' ),
							},
						] }
					>
					</PanelColorSettings>
					<BackgroundPanel { ...this.props }
						hasCaption={ false }
						hasOverlay={ true }
						hasGalleryControls={ false }
					/>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
