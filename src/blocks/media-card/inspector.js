/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextareaControl, RangeControl, ExternalLink } from '@wordpress/components';

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
		} = this.props;

		const {
			hasImgShadow,
			hasCardShadow,
			mediaUrl,
			mediaAlt,
			paddingBottom,
			paddingLeft,
			paddingRight,
			paddingSize,
			paddingTop,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingRightTablet,
			paddingTopTablet,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingRightMobile,
			paddingTopMobile,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
			paddingUnit,
			maxWidth,
			align,
			mediaType,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Media Card Settings', 'coblocks' ) } className="block-coblocks__inspector-block-settings-panel-body">
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
						/>
						{ ( 'full' === align || 'wide' === align ) && (
							<RangeControl
								label={ __( 'Max Width', 'coblocks' ) }
								className="components-block-coblocks-media-card-maxwidth-range"
								value={ parseFloat( maxWidth ) }
								onChange={ ( nextMaxWidth ) => setAttributes( { maxWidth: nextMaxWidth } ) }
								min={ 400 }
								max={ 2000 }
								step={ 1 }
							/>
						) }
						{ mediaUrl && mediaType === 'image' && (
							<TextareaControl
								label={ __( 'Alt Text (Alternative Text)', 'coblocks' ) }
								value={ mediaAlt }
								onChange={ ( nextMediaAlt ) => setAttributes( { mediaAlt: nextMediaAlt } ) }
								help={
									<Fragment>
										<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
											{ __( 'Describe the purpose of the image', 'coblocks' ) }
										</ExternalLink>
										{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
									</Fragment>
								}
							/>
						) }
						<ToggleControl
							label={ __( 'Card Shadow', 'coblocks' ) }
							checked={ !! hasCardShadow }
							onChange={ () => setAttributes( { hasCardShadow: ! hasCardShadow } ) }
							help={ !! hasCardShadow ? __( 'Showing card shadow.', 'coblocks' ) : __( 'Toggle to add a card shadow.', 'coblocks' ) }
						/>
						{ mediaType && (
							<ToggleControl
								label={
									sprintf(
										/* translators: %s: Placeholder is either 'Card, or 'Image' */
										__( ' %s Shadow', 'coblocks' ),
										mediaType.charAt( 0 ).toUpperCase() + mediaType.slice( 1 )
									)
								}
								checked={ !! hasImgShadow }
								onChange={ () => setAttributes( { hasImgShadow: ! hasImgShadow } ) }
								help={ !! hasImgShadow ?
									sprintf(
										/* translators: %s: placeholder is either 'Card, or 'Image' */
										__( 'Showing %s shadow.', 'coblocks' ),
										mediaType
									) :
									sprintf(
										/* translators: %s: placeholder is either 'Card, or 'Image' */
										__( 'Toggle to add an %s shadow', 'coblocks' ),
										mediaType
									)
								}
							/>
						) }
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: ( nextBg ) => {
									setBackgroundColor( nextBg );
									if ( ! paddingSize || paddingSize === 'no' ) {
										setAttributes( { paddingSize: 'medium' } );
									}
									if ( ! nextBg ) {
										setAttributes( { paddingSize: 'no' } );
									}
								},
								label: __( 'Background Color', 'coblocks' ),
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
] )( Inspector );
