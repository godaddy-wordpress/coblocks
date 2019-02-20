/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import icons from './icons';
import applyWithColors from './colors';
import BackgroundImagePanel from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { compose } = wp.compose;
const { dispatch, select } = wp.data;
const { PanelBody, RangeControl, ToggleControl, SelectControl, withFallbackStyles, Button, ButtonGroup, Tooltip  } = wp.components;

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
			layout,
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
		} = attributes;

		/**
		 * Set layout options and padding controls for Row Blocks
		 * This will make us of existing block instead of creating new one 
		 */
		const layoutOptions = [
			{ value: 'top-left', label: __( 'Top Left' ), icon: icons.colOne },
			{ value: 'top-center', label: __( 'Top Center' ), icon: icons.colTwo },
			{ value: 'top-right', label: __( 'Top Right' ), icon: icons.colThree },
			{ value: 'center-left', label: __( 'Center Left' ), icon: icons.colFour },
			{ value: 'center-center', label: __( 'Center Center' ), icon: icons.colOne },
			{ value: 'center-right', label: __( 'Center Right' ), icon: icons.colTwo },
			{ value: 'bottom-left', label: __( 'Bottom Left' ), icon: icons.colThree },
			{ value: 'bottom-center', label: __( 'Bottom Center' ), icon: icons.colFour },
			{ value: 'bottom-right', label: __( 'Bottom Right' ), icon: icons.colOne },
		];

		let layoutAttributes = {};
		//top
		layoutAttributes[ 'top-left' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'left',
				align: 'left',
			}
		};

		layoutAttributes[ 'top-center' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'center',
				align: 'center',
			}
		};

		layoutAttributes[ 'top-right' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'right',
				align: 'right',
			}
		};

		//center
		layoutAttributes[ 'center-left' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'left',
				align: 'left',
			}
		};

		layoutAttributes[ 'center-center' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'center',
				align: 'center',
			}
		};

		layoutAttributes[ 'center-right' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'right',
				align: 'right',
			}
		};

		//bottom
		layoutAttributes[ 'bottom-left' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'left',
				align: 'left',
			}
		};

		layoutAttributes[ 'bottom-center' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'center',
				align: 'center',
			}
		};

		layoutAttributes[ 'bottom-right' ] = {
			wrapper: {
			},
			inner:{
				contentAlign: 'right',
				align: 'right',
			}
		};

		let getBlockContents = select( 'core/editor' ).getBlock( clientId );
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Layout' ) } initialOpen={ false }>
						<div className="components-coblocks-visual-dropdown components-coblocks-visual-dropdown__hero">
							<ButtonGroup aria-label={ __( 'Select Row Layout' ) }>
							{ map( layoutOptions, ( { label, value, icon } ) => (
								<Tooltip text={ label }>
									<div className={ ( value == layout ) ? 'components-coblocks-visual-dropdown__button-wrapper is-selected' : 'components-coblocks-visual-dropdown__button-wrapper' }>
										<Button
											className={ ( value == layout ) ? 'components-coblocks-visual-dropdown__button components-coblocks-visual-dropdown__button--selected' : 'components-coblocks-visual-dropdown__button' }
											isSmall
											onClick={ () => {
												setAttributes( { layout: value } );
												if( layoutAttributes[ value ].wrapper ){
													dispatch( 'core/editor' ).updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
												}

												//content alignment changes
												if( getBlockContents.innerBlocks ){
													map( getBlockContents.innerBlocks, ( innerBlock ) => {
														if( innerBlock.clientId ){
															dispatch( 'core/editor' ).updateBlockAttributes( innerBlock.clientId, layoutAttributes[ value ].inner );
														}
													} );
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
					<PanelBody title={ __( 'Hero Settings' ) } className='components-coblocks-block-sidebar--buttons'>
						<SelectControl
							label={ __( 'Layout' ) }
							value={ layout }
							options={ layoutOptions }
							help={ __( 'Hero section layout.' ) }
							onChange={ ( value ) => {
								setAttributes( { layout: value } );

								dispatch( 'core/editor' ).updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );

								//content alignment changes
								if( getBlockContents.innerBlocks ){
									map( getBlockContents.innerBlocks, ( innerBlock ) => {
										if( innerBlock.clientId ){
											dispatch( 'core/editor' ).updateBlockAttributes( innerBlock.clientId, layoutAttributes[ value ].inner );
										}
									} );
								}
							} }
						/>

						<RangeControl
								label={ __( 'Content Width in Pixels' ) }
								className="components-block-coblocks-hero-maxwidth-range"
								value={ parseInt( maxWidth ) }
								onChange={ ( nextMaxWidth ) => setAttributes( {  maxWidth: parseInt(nextMaxWidth) } ) }
								min={ 100 }
								max={ 1500 }
								step={ 10 }
							/>

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

						<ToggleControl
							label={ !! fullscreen ? __( 'Displaying as fullscreen' ) : __( 'Display as fullscreen' ) }
							checked={ !! fullscreen }
							onChange={ () => setAttributes( {  fullscreen: ! fullscreen } ) }
							help={ !! fullscreen ? __( 'Displaying as full height of the viewport.' ) : __( 'Toggle to display as full height of the viewport.' ) }  />
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: ( nextBackgroundColor ) => {

									setBackgroundColor( nextBackgroundColor );

									//add padding if there's none
									if( !paddingSize || paddingSize == 'no' ){
										setAttributes({ paddingSize: 'medium' });
									}

									//reset when cleared
									if( !nextBackgroundColor ){
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
					{ BackgroundImagePanel( this.props, { overlay: true } ) }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
