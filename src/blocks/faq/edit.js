/**
 * Internal dependencies.
 */
import CustomAppender from './appender';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';

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
	} = props;

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const currentCount = innerBlocks.length;
	const prevCount = usePrevious( innerBlocks.length );

	useEffect( () => {
		if ( currentCount === 0 && prevCount > 0 ) {
			removeBlock( clientId, false );
		}
	}, [ currentCount, prevCount ] );

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
		<div className={ className }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				renderAppender={ () =>
					<CustomAppender
						onAddNewHeading={ insertNewHeading }
						onAddNewItem={ insertNewItem }
					/>
				}
				template={ TEMPLATE }
				templateInsertUpdatesSelection={ false }
			/>
		</div>
	);
};

export default Edit;
