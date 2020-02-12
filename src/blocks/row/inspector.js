/**
 * External dependencies
 */
import map from 'lodash/map';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { layoutOptions } from './utilities';
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, SelectControl, withFallbackStyles } from '@wordpress/components';

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
			clientId,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			columns,
			gutter,
			layout,
			marginBottom,
			marginLeft,
			marginRight,
			marginSize,
			marginTop,
			marginBottomTablet,
			marginLeftTablet,
			marginRightTablet,
			marginTopTablet,
			marginBottomMobile,
			marginLeftMobile,
			marginRightMobile,
			marginTopMobile,
			marginSyncUnits,
			marginSyncUnitsTablet,
			marginSyncUnitsMobile,
			marginUnit,
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
			hasMarginControl,
		} = attributes;

		const gutterOptions = [
			{
				value: 'small',
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
			},
			{
				value: 'medium',
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
			},
			{
				value: 'large',
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
			},
			{
				value: 'huge',
				/* translators: abbreviation for largest size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Huge', 'coblocks' ),
			},
		];

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split( '-' ) );
		}

		return (
			<Fragment>
				<InspectorControls>
					{ ( columns && selectedRows >= 1 ) &&
					<Fragment>
						{ layout &&
						<Fragment>
							{ selectedRows > 1 &&
								<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
									<div className={ classnames(
										'block-editor-block-styles',
										'coblocks-editor-block-styles',
									) } >
										{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
											<div
												key={ `style-${ name }` }
												className={ classnames(
													'block-editor-block-styles__item',
													{ 'is-active': layout === key },
												) }
												onClick={ () => {
													const selectedWidth = key.toString().split( '-' );
													const children = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId );
													setAttributes( {
														layout: key,
													} );

													if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
														map( children[ 0 ].innerBlocks, ( { clientId }, index ) => (
															wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { width: selectedWidth[ index ] } )
														) );
													}
												} }
												role="button"
												tabIndex="0"
												aria-label={ name }
											>
												<div className="block-editor-block-styles__item-preview">
													{ icon }
												</div>
											</div>
										) ) }
									</div>
								</PanelBody>
							}
							{ layout &&
								<Fragment>
									<PanelBody title={ __( 'Row Settings', 'coblocks' ) }>
										{ selectedRows >= 2 && <OptionSelectorControl
											label={ __( 'Gutter', 'coblocks' ) }
											currentOption={ gutter }
											options={ gutterOptions }
											onChange={ ( gutter ) => setAttributes( { gutter } ) }
										/> }
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
										{ hasMarginControl &&
											<DimensionsControl { ...this.props }
												type={ 'margin' }
												label={ __( 'Margin', 'coblocks' ) }
												help={ __( 'Space around the container.', 'coblocks' ) }
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
										}
									</PanelBody>
									<PanelColorSettings
										title={ __( 'Color Settings', 'coblocks' ) }
										initialOpen={ false }
										colorSettings={ [
											{
												value: backgroundColor.color,
												onChange: ( nextBackgroundColor ) => {
													setBackgroundColor( nextBackgroundColor );

													if ( ! paddingSize || paddingSize === 'no' ) {
														setAttributes( { paddingSize: 'medium' } );
													}

													if ( ! nextBackgroundColor ) {
														setAttributes( { paddingSize: 'no' } );
													}
												},
												label: __( 'Background Color', 'coblocks' ),
											},
											{
												value: textColor.color,
												onChange: setTextColor,
												label: __( 'Text Color', 'coblocks' ),
											},
										] }
									>
									</PanelColorSettings>
									<BackgroundPanel { ...this.props }
										hasOverlay={ true }
									/>
								</Fragment>
							}
						</Fragment>
						}
					</Fragment>
					}
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
