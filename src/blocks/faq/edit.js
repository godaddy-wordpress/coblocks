/**
 * Internal dependencies.
 */
import CustomAppender from './appender';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect, withDispatch, withSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = [
	'coblocks/faq-item',
	'core/heading',
];

const TEMPLATE = [
	[ 'core/heading', {
		className: 'wp-block-coblocks-faq__title',
		level: 3,
		placeholder: __( 'FAQ title', 'coblocks' ),
	} ],
	[ 'coblocks/faq-item' ],
];

const Edit = ( props ) => {
	const {
		className,
		clientId,
		insertBlock,
	} = props;

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

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

	return (
		<>
			<div className={ className }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ () => <CustomAppender onAddNewItem={ insertNewItem } onAddNewHeading={ insertNewHeading } /> }
					template={ TEMPLATE }
					templateInsertUpdatesSelection={ false }
				/>
			</div>
		</>
	);
};

export default compose( [

	withSelect( ( select, props ) => {
		const { getBlocks } = select( 'core/block-editor' );

		return {
			innerBlocks: getBlocks( props.clientId ),
		};
	} ),

	withDispatch( ( dispatch ) => {
		const { insertBlock } = dispatch( 'core/block-editor' );

		return {
			insertBlock,
		};
	} ),

] )( Edit );
