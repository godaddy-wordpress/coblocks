/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { store, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
// Backward compatibility for 5.6
const blockEditorStore = !! store ? store : 'core/block-editor';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Counter from './counter';
import Inspector from './inspector';

function CounterEdit( props ) {
	const {
		attributes,
		className,
		clientId,
		isSelected,
	} = props;

	const {
		startingCount,
		endingCount,
		counterDescription,
		counterSpeed,
		counterText,
		align,
	} = attributes;

	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );

	const { insertBlock, removeBlock, updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { hasIconShowing, processIcon, processIconAlignment } = useSelect( ( select ) => {
		const { getAdjacentBlockClientId, getBlock, getBlockIndex, getBlockParents } = select( blockEditorStore );
		const precedingBlock = getBlock( getAdjacentBlockClientId( clientId, -1 ) );
		const hasPrecedingShowing = precedingBlock?.name === 'coblocks/icon';
		// Get clientID of the direct parent.
		const parentClientId = getBlockParents( clientId )?.at( -1 );

		/**
		 * We pass in align attribute to use in the function. This is because this function
		 * is memoized and its execution context does not have access to the live props.attributes object.
		 *
		 * @function updateIconAlignment Change preceding icon alignment if present.
		 * @param {string} alignString Same as props.attributes.align.
		 */
		const updateIconAlignment = async ( alignString ) => {
			await updateBlockAttributes( precedingBlock?.clientId, { contentAlign: alignString } );
		};

		/**
		 * We pass in align attribute to use in the function. This is because this function
		 * is memoized and its execution context does not have access to the live props.attributes object.
		 *
		 * @function handleIconPresence Insert or remove icon block.
		 * @param {boolean} insert      Whether to insert the icon block or to remove it.
		 * @param {string}  alignString Same as props.attributes.align.
		 */
		const handleIconPresence = async ( insert, alignString ) => {
			if ( insert ) {
				const created = await createBlock( 'coblocks/icon', { contentAlign: alignString }, [] );
				await insertBlock( created, getBlockIndex( clientId ), parentClientId, false );
			}

			if ( ! insert ) {
				await removeBlock( precedingBlock?.clientId );
			}
		};

		return {
			hasIconShowing: hasPrecedingShowing,
			processIcon: handleIconPresence,
			processIconAlignment: updateIconAlignment,
		};
	}, [] );

	useEffect( () => {
		if ( hasIconShowing ) {
			processIconAlignment( align );
		}
	}, [ align ] );

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<Inspector { ...props } { ...{ hasIconShowing, processIcon } } />
				</>
			) }
			<Counter
				{ ...{
					blockProps,
					counterDescription,
					counterSpeed,
					counterText,
					endingCount,
					startingCount,
					...props,
				} }
			/>
		</>
	);
}
export default CounterEdit;

