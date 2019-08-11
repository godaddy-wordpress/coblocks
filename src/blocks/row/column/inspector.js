
/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { BackgroundPanel } from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, RangeControl, withFallbackStyles } = wp.components;

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
			clientId,
			attributes,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			width,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			paddingUnit,
			paddingSyncUnits,
			marginSyncUnits,
			marginSize,
			paddingSize,
		} = attributes;

		const parentId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( clientId );
		const parentBlocks = wp.data.select( 'core/block-editor' ).getBlocksByClientId( parentId );
		const nextBlockClientId = wp.data.select( 'core/block-editor' ).getNextBlockClientId( clientId );
		const nextBlockClient = wp.data.select( 'core/block-editor' ).getBlock( nextBlockClientId );
		const lastId = ( parentBlocks[ 0 ].innerBlocks !== 'undefined' ) ? parentBlocks[ 0 ].innerBlocks[ parentBlocks[ 0 ].innerBlocks.length - 1 ].clientId : clientId;

		const onChangeWidth = ( newWidth ) => {
			const diff = parseFloat( width ) - newWidth;
			const nextBlockWidth = parseFloat( nextBlockClient.attributes.width ) + diff;

			if ( nextBlockWidth > 9 ) {
				setAttributes( { width: parseFloat( newWidth ).toFixed( 2 ) } );
				wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( nextBlockClientId, { width: parseFloat( nextBlockWidth ).toFixed( 2 ) } );
			}
		};

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
							unit={ marginUnit }
							syncUnits={ marginSyncUnits }
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
							unit={ paddingUnit }
							syncUnits={ paddingSyncUnits }
							dimensionSize={ paddingSize }
						/>
						{ ( lastId !== clientId ) ?
							<RangeControl
								label={ __( 'Width' ) }
								value={ parseFloat( width ) }
								onChange={ ( newWidth ) => onChangeWidth( newWidth ) }
								min={ 10.00 }
								max={ 100.00 }
								step={ 0.01 }
							/> :
							null }
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
