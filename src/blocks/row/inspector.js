/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './layouts';
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, SelectControl, ButtonGroup, Button, Tooltip, withFallbackStyles } = wp.components;

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
			{ value: 'no', label: __( 'None' ) },
			{ value: 'small', label: __( 'Small' ) },
			{ value: 'medium', label: __( 'Medium' ) },
			{ value: 'large', label: __( 'Large' ) },
			{ value: 'huge', label: __( 'Huge' ) },
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
								<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
									<div className="components-coblocks-visual-dropdown">
										<ButtonGroup aria-label={ __( 'Select Row Layout' ) }>
											{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
												<Tooltip text={ name }>
													<div className={ ( key === layout ) ? 'components-coblocks-visual-dropdown__button-wrapper is-selected' : 'components-coblocks-visual-dropdown__button-wrapper' }>
														<Button
															className={ ( key === layout ) ? 'components-coblocks-visual-dropdown__button components-coblocks-visual-dropdown__button--selected' : 'components-coblocks-visual-dropdown__button' }
															isSmall
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
														>
															{ icon }
														</Button>
													</div>
												</Tooltip>
											) ) }
										</ButtonGroup>
									</div>
								</PanelBody>
							}
							{ layout &&
								<Fragment>
									<PanelBody title={ __( 'Row Settings' ) }>
										{ hasMarginControl &&
											<DimensionsControl { ...this.props }
												type={ 'margin' }
												label={ __( 'Margin' ) }
												help={ __( 'Space around the container.' ) }
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
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding' ) }
											help={ __( 'Space inside of the container.' ) }
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
										{ selectedRows >= 2 &&
											<SelectControl
												label={ __( 'Gutter' ) }
												value={ gutter }
												options={ gutterOptions }
												help={ __( 'Space between each column.' ) }
												onChange={ ( value ) => setAttributes( { gutter: value } ) }
											/>
										}
									</PanelBody>
									<PanelColorSettings
										title={ __( 'Color Settings' ) }
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
