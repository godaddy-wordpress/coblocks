/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
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
const { PanelBody, RangeControl, ToggleControl, SelectControl, withFallbackStyles  } = wp.components;

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
			// { value: 'top-left', label: __( 'Top Left' ) },
			// { value: 'top-center', label: __( 'Top Center' ) },
			// { value: 'top-right', label: __( 'Top Right' ) },
			{ value: 'center-left', label: __( 'Center Left' ) },
			{ value: 'center-center', label: __( 'Center Center' ) },
			{ value: 'center-right', label: __( 'Center Right' ) },
			// { value: 'bottom-left', label: __( 'Bottom Left' ) },
			// { value: 'bottom-center', label: __( 'Bottom Center' ) },
			// { value: 'bottom-right', label: __( 'Bottom Right' ) },
		];

		let layoutAttributes = {};

		layoutAttributes[ 'center-left' ] = {
			wrapper: {
				paddingTop: 8, 
				paddingRight: 40, 
				paddingBottom: 8, 
				paddingLeft: 8,
			},
			inner:{
				contentAlign: 'left',
				align: 'left',
			}
		};

		layoutAttributes[ 'center-center' ] = {
			wrapper: {
				paddingTop: 8, 
				paddingRight: 20, 
				paddingBottom: 8, 
				paddingLeft: 20,
			},
			inner:{
				contentAlign: 'center',
				align: 'center',
			}
		};

		layoutAttributes[ 'center-right' ] = {
			wrapper: {
				paddingTop: 8, 
				paddingRight: 8, 
				paddingBottom: 8, 
				paddingLeft: 40,
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
