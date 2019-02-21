/**
 * External dependencies
 */
import map from 'lodash/map';
import classnames from 'classnames';

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
		let layoutOptions = [
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

		if( !fullscreen ){
			layoutOptions = [
				{ value: 'center-left', label: __( 'Center Left' ), icon: icons.colFour },
				{ value: 'center-center', label: __( 'Center Center' ), icon: icons.colOne },
				{ value: 'center-right', label: __( 'Center Right' ), icon: icons.colTwo },
			];
		}

		let layoutAttributes = {};
		//top
		layoutAttributes[ 'top-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'top-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'top-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		//center
		layoutAttributes[ 'center-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'center-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'center-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		//bottom
		layoutAttributes[ 'bottom-left' ] = {
			wrapper: {
				contentAlign: 'left',
			},
		};

		layoutAttributes[ 'bottom-center' ] = {
			wrapper: {
				contentAlign: 'center',
			},
		};

		layoutAttributes[ 'bottom-right' ] = {
			wrapper: {
				contentAlign: 'right',
			},
		};

		let getBlockContents = select( 'core/editor' ).getBlock( clientId );

		const classes = classnames(
			'components-base-control',
			'components-coblocks-css-grid-selector', {
				'is-fullscreen': fullscreen,
			}
		);

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

						<div className={ classes }>
							<label className="components-base-control__label" >{ __( 'Layout' ) }</label>
							<ButtonGroup aria-label={ __( 'Select Style' ) }>
							{ map( layoutOptions, ( { label, value, icon } ) => (
								<Tooltip text={ label }>
									<div className={ ( value == layout ) ? 'is-selected' : null }>
										<Button
											isSmall
											onClick={ () => {
												setAttributes( { layout: value } );
												if( layoutAttributes[ value ].wrapper ){
													dispatch( 'core/editor' ).updateBlockAttributes( clientId, layoutAttributes[ value ].wrapper );
												}
											} }
										>
										</Button>
									</div>
								</Tooltip>
							) ) }
							</ButtonGroup>
						</div>

						<ToggleControl
							label={ __( 'Fullscreen' ) }
							checked={ !! fullscreen }
							onChange={ () => {
								if( fullscreen ){
									if( [ 'bottom-left', 'top-left' ].includes( layout ) ){
										setAttributes( {  layout: 'center-left' } )
									}

									if( [ 'bottom-center', 'top-center' ].includes( layout ) ){
										setAttributes( {  layout: 'center-center' } )
									}

									if( [ 'bottom-right', 'top-right' ].includes( layout ) ){
										setAttributes( {  layout: 'center-right' } )
									}
								}
								setAttributes( {  fullscreen: ! fullscreen } )
							} }
							help={ !! fullscreen ? __( 'Displaying as the height of the viewport.' ) : __( 'Toggle to enable fullscreen mode.' ) }
						/>

						<RangeControl
							label={ __( 'Content width in pixels' ) }
							value={ parseInt( maxWidth ) }
							onChange={ ( nextMaxWidth ) => setAttributes( {  maxWidth: parseInt(nextMaxWidth) } ) }
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
									if ( !paddingSize || paddingSize == 'no' ) {
										setAttributes( { paddingSize: 'medium' } );
									}

									// Reset when cleared.
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
