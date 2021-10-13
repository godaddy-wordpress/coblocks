/**
 * WordPress dependencies
 */
import {
	createSlotFill,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseSlot as useSlot,
} from '@wordpress/components';

const slotName = 'CoBlocksSettingsModalControl';

const { Fill, Slot: CoBlocksSettingsModalControlSlot } = createSlotFill( slotName );

function Slot( { children } ) {
	const slot = useSlot( slotName );
	const hasFills = Boolean( slot.fills && slot.fills.length );

	if ( ! hasFills ) {
		return children;
	}

	return <CoBlocksSettingsModalControlSlot bubblesVirtually />;
}

const CoBlocksSettingsModalControl = Fill;
CoBlocksSettingsModalControl.Slot = Slot;

export default CoBlocksSettingsModalControl;
