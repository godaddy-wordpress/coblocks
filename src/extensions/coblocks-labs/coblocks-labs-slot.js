/**
 * WordPress dependencies
 */
import {
	createSlotFill,
	// Disable reason: We choose to use unsafe APIs in our codebase.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseSlot as useSlot,
} from '@wordpress/components';

const slotName = 'CoBlocksLabsModalControl';

const { Fill, Slot: CoBlocksLabsModalControlsSlot } = createSlotFill( slotName );

const Slot = ( { children } ) => {
	const slot = useSlot( slotName );
	const hasFills = Boolean( slot.fills && slot.fills.length );

	if ( ! hasFills ) {
		return children;
	}

	return <CoBlocksLabsModalControlsSlot bubblesVirtually />;
};

const CoBlocksLabsModalControl = Fill;
CoBlocksLabsModalControl.Slot = Slot;

export default CoBlocksLabsModalControl;
