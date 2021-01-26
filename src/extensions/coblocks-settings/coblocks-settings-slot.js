/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';
const createSettings = createSlotFill( 'CoBlocksSettingsModalControls' );
const createPreferences = createSlotFill( 'CoBlocksSettingsEditorPreference' );

const SettingsFill = createSettings.Fill,
	SettingsSlot = createSettings.Slot,
	PreferenceFill = createPreferences.Fill,
	PreferenceSlot = createPreferences.Slot;

function CoBlocksSettingsModalControls( { children } ) {
	return <SettingsFill>{ children }</SettingsFill>;
}

function CoBlocksSettingsEditorPreference( { children } ) {
	return <PreferenceFill>{ children }</PreferenceFill>;
}

export {
	CoBlocksSettingsModalControls,
	CoBlocksSettingsEditorPreference,
	SettingsSlot,
	PreferenceSlot,
};
