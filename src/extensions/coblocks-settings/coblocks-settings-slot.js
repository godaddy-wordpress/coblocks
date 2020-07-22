/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'CoBlocksSettingsModalControls' );

function CoBlocksSettingsModalControls( { children } ) {
	return <Fill>{ children }</Fill>;
}

CoBlocksSettingsModalControls.Slot = Slot;
export default CoBlocksSettingsModalControls;
