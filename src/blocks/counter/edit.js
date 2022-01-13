/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

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

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<Inspector { ...props } />
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

