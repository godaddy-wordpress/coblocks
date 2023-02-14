/**
 * WordPress dependencies
 */
import {
	createSlotFill,
	// Disable reason: We choose to use unsafe APIs in our codebase.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseSlot as useSlot,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseSlotFills as useSlotFills,
} from '@wordpress/components';

const slotName = 'CoBlocksLabsModalControl';

const { Fill, Slot: CoBlocksLabsModalControlsSlot } = createSlotFill( slotName );

const Slot = ( { children } ) => {
	let fills;

	// The checking order matters here, because for Gutenberg >=14.3.0 both
	// useSlot and useSlotFills are available while only the useSlotFill should
	// be used. The breaking change has been introduced in this PR:
	// https://github.com/WordPress/gutenberg/pull/44642
	if ( typeof useSlotFills === 'function' ) {
		// Use the useSlotFills for Gutenberg >=14.3.0 compatibility
		// eslint-disable-next-line react-hooks/rules-of-hooks
		fills = useSlotFills( slotName );
	} else if ( typeof useSlot === 'function' ) {
		// Use the useSlot for Gutenberg <14.3.0 compatibility
		// eslint-disable-next-line react-hooks/rules-of-hooks
		fills = useSlot( slotName ).fills;
	} else {
		return;
	}

	const hasFills = Boolean( fills && fills.length );

	if ( ! hasFills ) {
		return children;
	}

	return <CoBlocksLabsModalControlsSlot bubblesVirtually />;
};

const CoBlocksLabsModalControl = Fill;
CoBlocksLabsModalControl.Slot = Slot;

export default CoBlocksLabsModalControl;
