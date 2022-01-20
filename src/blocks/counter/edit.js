/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { store as blockEditorStore, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

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
		counterSpeed,
		counterText,
		align,
	} = attributes;

	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );

	const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const { hasIconShowing, processIcon } = useSelect( ( select ) => {
		const { getAdjacentBlockClientId, getBlock, getBlockIndex } = select( blockEditorStore );
		const precedingBlock = getBlock( getAdjacentBlockClientId( clientId, -1 ) );
		const hasPrecedingShowing = precedingBlock?.name === 'coblocks/icon';

		/**
		 * @function handleIconPresence Process counterText into formatting string.
		 * @param {boolean} insert Whether to insert the icon block or to remove it.
		 */
		const handleIconPresence = async ( insert ) => {
			if ( insert ) {
				const created = await createBlock( 'coblocks/icon', {}, [] );
				await insertBlock( created, getBlockIndex( clientId ), '', false );
			}

			if ( ! insert ) {
				await removeBlock( precedingBlock?.clientId );
			}
		};

		return {
			hasIconShowing: hasPrecedingShowing,
			processIcon: handleIconPresence,
		};
	}, [] );

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

