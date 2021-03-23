/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import { Icon, plus } from '@wordpress/icons';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'coblocks/service' ];

const Edit = ( props ) => {
	const { attributes, clientId } = props;
	const { count } = attributes;
	const serviceBlockAppender = ( ) => {
		const label = __( 'Add service section', 'coblocks' );
		return (
			<div className="coblocks-block-appender">
				<Tooltip text={ label }>
					<Button
						label={ label }
						className="block-editor-button-block-appender"
						onClick={ () => {
							props.setAttributes( { count: count + 1 } );
						} }
					>
						<Icon icon={ plus } />
					</Button>
				</Tooltip>
			</div>
		);
	};

	const { updateBlockAttributes, insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const { getBlocksByClientId, innerBlocks, isSelected, parentServicesBlock } = useSelect(
		( select ) => {
			const {
				getBlockHierarchyRootClientId,
				getSelectedBlockClientId,
			} = select( 'core/block-editor' );

			// Get clientID of the parent block.
			const rootClientId = getBlockHierarchyRootClientId( clientId );
			const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

			return {
				getBlocksByClientId: select( 'core/block-editor' ).getBlocksByClientId,
				innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
				parentServicesBlock: select( 'core/block-editor' ).getBlock( rootClientId ),
				isSelected: isSelected || rootClientId === selectedRootClientId,
			};
		} );

	// const [ previousInnerBlocksLength, setPreviousInnerBlocksLength ] = useState( innerBlocks.length );

	// Track the previous count of blocks to allow decrement of count attribute
	// When service block has been removed by user, decrement count.
	// const prevBlockCount = useRef();
	useEffect( () => {
		if ( innerBlocks.length < count ) {
			console.log( 'innerblocks.length is changing' );
			// console.log( previousInnerBlocksLength, innerBlocks.length );
			console.log( innerBlocks.length, count );
			console.log( innerBlocks.length < count );
		}
	// 	prevBlockCount.current = innerBlocks.length;
	}, [ innerBlocks.length, count ] );

	/* istanbul ignore next */
	useEffect( () => {
		// console.log( prevBlockCount.current, innerBlocks.length );
		// if ( prevBlockCount.current <= innerBlocks.length ) {
		// 	props.setAttributes( { count: count - 1 } );
		// 	return;
		// }

		if ( innerBlocks.length < count ) {
		// Add a new block if the count is less than the count set.
			const { buttons, headingLevel, alignment } = parentServicesBlock.attributes;

			insertBlock(
				createBlock( 'coblocks/service', {
					showCta: buttons,
					headingLevel,
					alignment,
				} ),
				innerBlocks.length + 1,
				clientId,
				false,
			);
		}
	}, [ count ] );

	return (
		<>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ [] }
				templateLock={ false }
				templateInsertUpdatesSelection={ false }
			/>
			{ serviceBlockAppender() }
		</>

	);
};

export default Edit;

