/**
 * WordPress dependencies
 */
import {
	createSlotFill,
} from '@wordpress/components';

const slotName = 'CoBlocksSettingsModalControl';

const { Fill, Slot } = createSlotFill( slotName );

const CoBlocksSettingsModalControl = Fill;
CoBlocksSettingsModalControl.Slot = Slot;

export default CoBlocksSettingsModalControl;
