/**
 * External dependencies
 */
import classnames from 'classnames';
import memoize from 'memize';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/feature' ];

const TEMPLATE = [
	[ 'coblocks/feature' ],
	[ 'coblocks/feature' ],
];

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.updateInnerAttributes = this.updateInnerAttributes.bind( this );
		this.onChangeHeadingLevel = this.onChangeHeadingLevel.bind( this );
	}

	updateInnerAttributes( blockName, newAttributes ) {
		const { updateBlockAttributes, getBlocksByClientId, clientId } = this.props;
		const innerItems = getBlocksByClientId(	clientId )[ 0 ].innerBlocks;

		innerItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	}

	onChangeHeadingLevel( headingLevel ) {
		const { setAttributes } = this.props;

		setAttributes( { headingLevel } );
		this.updateInnerAttributes( 'coblocks/feature', { headingLevel } );
	}

	render() {
		const {
			attributes,
			textColor,
			className,
			isSelected,
			backgroundColor,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			columns,
			contentAlign,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			paddingUnit,
			marginUnit,
			marginSize,
			paddingSize,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add as background', 'coblocks' ) }
			/>
		);

		let classes = className;

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-features-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			...BackgroundClasses( attributes ), {
				'has-columns': columns > 1,
				[ `has-${ columns }-columns` ]: columns,
				'has-responsive-columns': columns > 1,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'no' && paddingSize !== 'advanced' ),
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'no' && marginSize !== 'advanced' ),
				[ `has-${ contentAlign }-content` ]: contentAlign,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes, backgroundColor ),
			color: textColor.color,
			textAlign: contentAlign,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
			marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
			marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
			marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
		};

		return (
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
						onChangeHeadingLevel={ this.onChangeHeadingLevel }
					/>
				) }
				{ isSelected && (
					<Inspector { ...this.props } />
				) }
				<div
					className={ classes }
				>
					<GutterWrapper { ...attributes }>
						<div className={ innerClasses } style={ innerStyles }>
							{ isBlobURL( backgroundImg ) && <Spinner /> }
							{ BackgroundVideo( attributes ) }
							<InnerBlocks
								template={ TEMPLATE }
								allowedBlocks={ ALLOWED_BLOCKS }
								templateInsertUpdatesSelection={ true }
								__experimentalCaptureToolbars={ true }
							/>
						</div>
					</GutterWrapper>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	withDispatch( ( dispatch ) => {
		const {
			insertBlock,
			updateBlockAttributes,
			selectBlock,
		} = dispatch( 'core/block-editor' );

		return {
			insertBlock,
			updateBlockAttributes,
			selectBlock,

		};
	} ),
	withSelect( ( select, props ) => {
		const {
			getBlockRootClientId,
			getBlockSelectionStart,
			getBlocks,
			getBlocksByClientId,
		} = select( 'core/block-editor' );

		// Get clientId of the parent block.
		const parentClientId = getBlockRootClientId( getBlockSelectionStart() );

		return {
			getBlocksByClientId,
			isSelected: props.isSelected || props.clientId === parentClientId,
			innerBlocks: getBlocks( props.clientId ),
		};
	} ),
	// Ensure there is a minimum of one coblocks/feature innerBlock per column set.
	( WrappedComponent ) => ( ownProps ) => {
		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( ownProps.innerBlocks.length > 0 ) {
			const featureBlocksCount = ownProps.innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/feature' ), 0 );
			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).
			if ( featureBlocksCount < ownProps.attributes.columns ) {
				ownProps.insertBlock(
					createBlock( 'coblocks/feature' ),
					ownProps.innerBlocks.length,
					ownProps.clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},
] )( Edit );
