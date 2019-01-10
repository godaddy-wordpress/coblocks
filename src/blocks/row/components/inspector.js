/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './layouts'
import rowIcons from './icons';
import applyWithColors from './colors';
import BackgroundImagePanel from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, RangeControl, SelectControl, ToggleControl, ButtonGroup, Button, Tooltip, Placeholder, withFallbackStyles } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		backgroundColor,
		textColor,
	} = ownProps.attributes;

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

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			clientId,
			customBackgroundColor,
			fallbackBackgroundColor,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			columns,
			gutter,
			layout,
			stacked,
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
		} = attributes;

		const gutterOptions = [
			{ value: 'no', label: __( 'None' ) },
			{ value: 'small', label: __( 'Small' ) },
			{ value: 'medium', label: __( 'Medium' ) },
			{ value: 'large', label: __( 'Large' ) },
		];

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split('-') );
		}

		return (
			<Fragment>
				<InspectorControls>
					{ ( columns && selectedRows >= 1 ) &&
						<Fragment>
							{ selectedRows > 1 &&
								<PanelBody title={ __( 'Layout' ) } className='block-coblocks__inspector-block-settings-panel-body' initialOpen={ false }>
									<div className="components-coblocks-layout-selector">
										<ButtonGroup aria-label={ __( 'Select Row Layout' ) }>
										{ map( layoutOptions[ selectedRows ], ( { name, key, icon, cols } ) => (
											<Tooltip text={ name }>
												<div className={ ( key == layout ) ? 'components-coblocks-layout-selector__button-wrapper is-selected' : 'components-coblocks-layout-selector__button-wrapper' }>
													<Button
														className={ ( key == layout ) ? 'components-coblocks-layout-selector__button components-coblocks-layout-selector__button--selected' : 'components-coblocks-layout-selector__button' }
														isSmall
														onClick={ () => {
															let selectedWidth = key.toString().split('-');
															let children = wp.data.select( 'core/editor' ).getBlocksByClientId( clientId );
															setAttributes( {
																layout: key,
															} );

															if ( typeof children[0].innerBlocks !== 'undefined' ) {
																map( children[0].innerBlocks, ( { clientId }, index ) => (
																	wp.data.dispatch( 'core/editor' ).updateBlockAttributes( clientId, { width : selectedWidth[ index ] } )
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
									<PanelBody title={ __( 'Row Settings' ) } className='block-coblocks__inspector-block-settings-panel-body'>
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

											<ToggleControl
												label={ __( 'Stack on mobile' ) }
												checked={ !! stacked }
												onChange={ () => setAttributes( {  stacked: ! stacked } ) }
											/>
									</PanelBody>
									<PanelColorSettings
										title={ __( 'Color Settings' ) }
										initialOpen={ false }
										colorSettings={ [
											{
												value: backgroundColor.color,
												onChange: setBackgroundColor,
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
									{ BackgroundImagePanel( this.props, { overlay: true } ) }
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