/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundDropZone, BackgroundStyles, BackgroundVideo } from '../../components/background';
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';
import { useDispatch, useSelect, withDispatch, withSelect } from '@wordpress/data';
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
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		textColor,
		className,
		backgroundColor,
		setAttributes,
		clientId,
		isSelected: isSelectedProps,
	} = props;

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

	const {
		updateBlockAttributes,
		selectBlock,
	} = useDispatch( 'core/block-editor' );

	const {
		isSelected,
		innerBlocks,
	} = useSelect( ( select ) => {
		const {
			getBlockRootClientId,
			getBlockSelectionStart,
			getBlocks,
		} = select( 'core/block-editor' );

		// Get clientId of the parent block.
		const parentClientId = getBlockRootClientId( getBlockSelectionStart() );

		return {
			isSelected: isSelectedProps || clientId === parentClientId,
			innerBlocks: getBlocks( clientId ),
		};
	} );

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		innerBlocks.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/feature', { headingLevel } );
	};

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
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
		<>
			{ dropZone }
			{ isSelected && (
				<Controls
					{ ...props }
					onChangeHeadingLevel={ onChangeHeadingLevel }
				/>
			) }
			{ isSelected && (
				<Inspector selectBlock={ selectBlock } { ...props } />
			) }
			<div
				className={ classes }
			>
				<GutterWrapper { ...attributes }>
					<div className={ innerClasses } style={ innerStyles }>
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<InnerBlocks
							__experimentalCaptureToolbars={ true }
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</GutterWrapper>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
	withSelect( ( select, blockData ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		insertBlock: dispatch( 'core/block-editor' ).insertBlock,
	} ) ),
	// Ensure there is a minimum of one coblocks/feature innerBlock per column set.
	( WrappedComponent ) => ( ownProps ) => {
		const {
			attributes,
			clientId,
			innerBlocks,
			insertBlock,
		} = ownProps;

		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( innerBlocks.length > 0 ) {
			const featureBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/feature' ), 0 );
			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).
			if ( featureBlocksCount < attributes.columns ) {
				insertBlock(
					createBlock( 'coblocks/feature' ),
					innerBlocks.length,
					clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},
] )( Edit );
