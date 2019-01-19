/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './../../../utils/icons';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses } from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, ToggleControl, TextControl, TextareaControl, RangeControl } = wp.components;

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

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			fallbackBackgroundColor,
			setAttributes,
			setBackgroundColor,
		} = this.props;

		const {
			hasImgShadow,
			hasCardShadow,
			mediaUrl,
			mediaAlt,
			isStackedOnMobile,
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

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Media Card Settings' ) } className='block-coblocks__inspector-block-settings-panel-body'>
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
						<ToggleControl
							label={ __( 'Stack on mobile' ) }
							checked={ !! isStackedOnMobile }
							onChange={ () => setAttributes( {  isStackedOnMobile: ! isStackedOnMobile } ) }
							help={ !! isStackedOnMobile ? __( 'Responsiveness is enabled.' ) : __( 'Toggle to enable responsiveness.' ) }
						/>
						<ToggleControl
							label={ __( 'Card Shadow' ) }
							checked={ !! hasCardShadow }
							onChange={ () => setAttributes( {  hasCardShadow: ! hasCardShadow } ) }
						/>
						<ToggleControl
							label={ __( 'Image Shadow' ) }
							checked={ !! hasImgShadow }
							onChange={ () => setAttributes( {  hasImgShadow: ! hasImgShadow } ) }
						/>
						{ mediaUrl && (
							<TextareaControl
								label={ __( 'Alt Text (Alternative Text)' ) }
								value={ mediaAlt }
								onChange={ ( nextMediaAlt ) => setAttributes( { mediaAlt: nextMediaAlt } ) }
								help={ __( 'Alternative text describes your image to people who can’t see it. Add a short description with its key details.' ) }
							/>
						) }
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: ( nextBg ) => {
									setBackgroundColor( nextBg );
									if( !paddingSize || paddingSize == 'no' ){
										setAttributes( { paddingSize: 'medium' } );
									}
									if( !nextBg ){
										setAttributes( { paddingSize: 'no' } );
									}
								},
								label: __( 'Background Color' ),
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
	applyFallbackStyles,
] )( Inspector );
