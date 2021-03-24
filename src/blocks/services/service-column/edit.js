/**
 * Internal dependencies.
 */
import { SERVICE_COLUMN_ALLOWED_BLOCKS as ALLOWED_BLOCKS } from './utilities';

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
							setBlocksPropagated( false );
						} }
					>
						<Icon icon={ plus } />
					</Button>
				</Tooltip>
			</div>
		);
	};

	const { insertBlock } = useDispatch( 'core/block-editor' );

	const { innerBlocks, parentServicesBlock, isSelected } = useSelect(
		( select ) => {
			const {
				getBlockHierarchyRootClientId,
				getSelectedBlockClientId,
			} = select( 'core/block-editor' );

			// Get clientID of the parent block.
			const rootClientId = getBlockHierarchyRootClientId( clientId );
			const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

			return {
				innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
				parentServicesBlock: select( 'core/block-editor' ).getBlock( rootClientId ),
				isSelected: isSelected || rootClientId === selectedRootClientId,
			};
		} );

	const [ blocksPropagated, setBlocksPropagated ] = useState( false );

	/* istanbul ignore next */
	useEffect( () => {
		if ( innerBlocks.length < count ) {
			// Block has been removed by user, decrement block count.
			if ( blocksPropagated ) {
				props.setAttributes( { count: count - 1 } );
				return;
			}

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

		// useEffect logic should now have all blocks in place.
		if ( innerBlocks.length === count ) {
			setBlocksPropagated( true );
		}
	}, [ count, innerBlocks.length ] );

	return (
		<>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ [] }
				templateLock={ false }
				templateInsertUpdatesSelection={ false }
			/>
			{ isSelected && serviceBlockAppender() }
		</>

	);
};

export default Edit;

