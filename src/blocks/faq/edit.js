/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import GutterWrapper from './../../components/gutter-control/gutter-wrapper';
import Inspector from './inspector';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { useDispatch, useSelect, withDispatch, withSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = [ 
	'coblocks/faq-item',
	'core/heading',
];

const TEMPLATE = [
	[ 'core/heading', {
		align: 'center',
		level: 3,
		placeholder: __( 'FAQ title', 'coblocks' ),
	} ],
	[ 'coblocks/faq-item' ],
];

const Edit = ( props ) => {
	const {
		attributes,
		className,
		clientId,
		insertBlock,
		isSelected,
		setAttributes,
	} = props;

	const {
		columns,
		gutter,
	} = attributes;

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const {
		selectBlock,
	} = useDispatch( 'core/block-editor' );

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	const setGutter = ( value ) => {
		setAttributes( { gutter: value } );
	};

	const insertNewItem = () => {
		const newItem = createBlock( 'coblocks/faq-item' );
		insertBlock( newItem, innerBlocks.length, clientId );
	};

	const insertNewHeading = () => {
		const newHeading = createBlock( 'core/heading', {
			className: 'wp-block-coblocks-faq__heading',
			level: 4,
			placeholder: __( 'Category name', 'coblocks' ),
		} );
		insertBlock( newHeading, innerBlocks.length, clientId );
	};

	const innerClasses = classnames(
		'wp-block-coblocks-faq__inner', 
		{
			'has-columns': columns > 1,
			[ `has-${ columns }-columns` ]: columns,
			'has-responsive-columns': columns > 1,
		}
	);

	return (
		<>
			{ isSelected && (
				<Inspector selectBlock={ selectBlock } { ...props } />
			) }
			<div className={ className }>
				<div className={ innerClasses }>
					<GutterWrapper { ...attributes }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							renderAppender={ () => <CustomAppender onAddNewItem={ insertNewItem } onAddNewHeading={ insertNewHeading } /> }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
						/>
					</GutterWrapper>
				</div>
			</div>
		</>
	);
};

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getBlockOrder,
			getBlockRootClientId,
			getBlockSelectionStart,
			getBlocks,
			getBlocksByClientId,
		} = select( 'core/block-editor' );

		// Get clientId of the parent block.
		const parentClientId = getBlockRootClientId( getBlockSelectionStart() );

		return {
			getBlockOrder,
			getBlocksByClientId,
			innerBlocks: getBlocks( props.clientId ),
			isSelected: props.isSelected || props.clientId === parentClientId,
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			insertBlock,
			insertBlocks,
			updateBlockAttributes,
		} = dispatch( 'core/block-editor' );

		return {
			insertBlock,
			insertBlocks,
			updateBlockAttributes,
		};
	} ),

	// Ensure there is a minimum of one coblocks/food-item innerBlock per column set.
	/*( WrappedComponent ) => ( ownProps ) => {
		// This is a newly added block if we have zero innerBlocks. We want the TEMPLATE definition to be used in this case.
		if ( ownProps.innerBlocks.length > 0 ) {
			const foodItemBlocksCount = ownProps.innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/food-item' ), 0 );

			// Add a new block if the count is less than the columns set.
			// We don't need a loop here because this will trigger a component update as soon as we insert a block (triggering this HOC again).
			if ( foodItemBlocksCount < ownProps.attributes.columns ) {
				ownProps.insertBlock(
					createBlock( 'coblocks/food-item', {
						showImage: ownProps.attributes.showImages,
						showPrice: ownProps.attributes.showPrices,
					} ),
					ownProps.innerBlocks.length,
					ownProps.clientId,
					false
				);
			}
		}

		return <WrappedComponent { ...ownProps } />;
	},*/

] )( Edit );
