/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
// import { useEffect } from '@wordpress/element';
import {
	// store as blockEditorStore,
	useBlockProps } from '@wordpress/block-editor';
// import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Counter from './counter';

function CounterEdit( props ) {
	const {
		// setAttributes,
		attributes,
		className,
		// clientId,
		isSelected,
	} = props;

	const {
		startingCount,
		endingCount,
		counterSpeed,
		counterText,
		align,
	} = attributes;

	// const {
	// 	__unstableMarkNextChangeAsNotPersistent,
	// } = useDispatch( blockEditorStore );

	// const { getBlock } = useSelect( ( select ) => {
	// 	return {
	// 		getBlock: select( blockEditorStore ).getBlock,
	// 	};
	// }, [] );

	// useEffect( () => {

	// }, [] );

	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					{ /* <Inspector { ...props } /> */ }
				</>
			) }
			<Counter
				{
					...{
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

