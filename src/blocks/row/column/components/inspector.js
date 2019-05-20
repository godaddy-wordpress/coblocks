/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { BackgroundPanel } from '../../../../components/background';
import DimensionsControl from '../../../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, withFallbackStyles } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		headingColor,
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
			clientId,
			attributes,
			setAttributes,
			backgroundColor,
			customBackgroundColor,
			fallbackBackgroundColor,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			width,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			marginSyncUnits,
			marginSyncUnitsTablet,
			marginSyncUnitsMobile,
			marginSize,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
			paddingSize,
		} = attributes;

		const parentId 	 	 		= wp.data.select( 'core/editor' ).getBlockRootClientId( clientId );
		const parentBlocks 	 		= wp.data.select( 'core/editor' ).getBlocksByClientId( parentId );
		const nextBlockClientId 	= wp.data.select( 'core/editor' ).getNextBlockClientId( clientId );
		const nextBlockClient 	    = wp.data.select( 'core/editor' ).getBlock( nextBlockClientId );
		const lastId 	 	 		= ( parentBlocks[0].innerBlocks !== 'undefined' ) ? parentBlocks[0].innerBlocks[ parentBlocks[0].innerBlocks.length - 1 ].clientId : clientId;

		const onChangeWidth = ( newWidth ) => {
			let diff =  parseFloat( width ) - newWidth;
			let nextBlockWidth = parseFloat( nextBlockClient.attributes.width ) + diff;

			if( nextBlockWidth > 9 ){
				setAttributes( {  width: parseFloat( newWidth ).toFixed(2) } );
				wp.data.dispatch( 'core/editor' ).updateBlockAttributes( nextBlockClientId, { width : parseFloat( nextBlockWidth ).toFixed(2) } );
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Column Settings' ) } className="components-panel__body--column-settings">
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
						{ ( lastId != clientId ) ?
							<RangeControl
	 							label={ __( 'Width' ) }
	 							value={ parseFloat( width ) }
	 							onChange={ ( newWidth ) => onChangeWidth( newWidth ) }
	 							min={ 10.00 }
	 							max={ 100.00 }
	 							step={ 0.01 }
	 						/>
						: null }
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