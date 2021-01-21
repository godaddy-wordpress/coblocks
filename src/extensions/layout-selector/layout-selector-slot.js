/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'CoBlocksLayoutSelectorFill' );

function CoBlocksLayoutSelectorFill( { children } ) {
	return <Fill>{ children }</Fill>;
}

export {
	CoBlocksLayoutSelectorFill as default,
	Slot,
};
