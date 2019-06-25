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
import { BackgroundPanel } from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control/';
import CSSGridControl from '../../../components/grid-control/';
import ResponsiveBaseControl from '../../../components/responsive-base-control/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
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
			height,
			heightTablet,
			heightMobile,
			syncHeight,
		} = attributes;

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
						<CSSGridControl { ...this.props } />
						{ ! fullscreen && (
							<ResponsiveBaseControl { ...this.props }
								label={ __( 'Height in pixels' ) }
								height={ height }
								heightTablet={ heightTablet }
								heightMobile={ heightMobile }
								onChange={ ( event ) => { setAttributes( { height: parseInt( event.target.value, 10 ) } ) } }
								onChangeTablet={ ( event ) => { setAttributes( { heightTablet: parseInt( event.target.value, 10 ) } ) } }
								onChangeMobile={ ( event ) => { setAttributes( { heightMobile: parseInt( event.target.value, 10 ) } ) } }
								sync={ syncHeight }
								type="height"
								min="500"
							/>
						) }
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
									if ( ! paddingSize || paddingSize == 'no' ) {
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
