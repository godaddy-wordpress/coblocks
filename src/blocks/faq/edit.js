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
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

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

	const innerFAQItems = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks( clientId ), [] );

	const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );
	const prevCountRef = useRef();

	useEffect( () => {
		prevCountRef.current = innerFAQItems.length;

		if ( prevCountRef.current === 0 && prevCount > 0 ) {
			removeBlock( clientId, false );
		}
	}, [ innerFAQItems ] );

	const prevCount = prevCountRef.current;

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
		</>
	);
};

export default Edit;
