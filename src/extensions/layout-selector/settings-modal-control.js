/* eslint camelcase: ["error", {allow: ["coblocks_layout_selector_controls_enabled"]}] */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControls from '../coblocks-settings/coblocks-settings-slot';

const SETTINGS_KEY = 'coblocks_layout_selector_controls_enabled';

const LayoutSelectorControl = () => {
	const {
		coblocks_layout_selector_controls_enabled,
	} = useSelect( ( select ) => {
		return {
			[ SETTINGS_KEY ]: select( 'core' ).getEntityRecord( 'root', 'site' )?.[ SETTINGS_KEY ],
		};
	}, [] );

	const saveSetting = ( value ) => {
		dispatch( 'core' ).saveEntityRecord( 'root', 'site', { [ SETTINGS_KEY ]: value } );
	};

	return (
		<CoBlocksSettingsModalControls>
			<CheckboxControl
				label={ __( 'Layout selector', 'coblocks' ) }
				help={ __( 'Allow layout selection on new pages.', 'coblocks' ) }
				onChange={ ( value ) => saveSetting( value ) }
				checked={ !! coblocks_layout_selector_controls_enabled }
			/>
		</CoBlocksSettingsModalControls>
	);
};
export default LayoutSelectorControl;
