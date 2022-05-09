/*global coblocksSettings*/
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { getPlugin, registerPlugin, unregisterPlugin } from '@wordpress/plugins';
import { MenuItem, Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModalControl from './coblocks-settings-slot';

export default function CoBlocksSettings() {
	const [ isOpen, setOpen ] = useState( false );

	// Detect and save settings when closing the modal (make the API POST request).
	const { saveEditedEntityRecord } = useDispatch( 'core' );

	const openModal = () => setOpen( true );
	const closeModal = () => {
		setOpen( false );
		// Save settings entities when closing the modal.
		saveEditedEntityRecord( 'root', 'site' );
	};

	return (
		<>
			<PluginMoreMenuItem as={ MenuItem } onClick={ openModal }>
				{ __( 'Editor settings', 'coblocks' ) }
			</PluginMoreMenuItem>

			{ isOpen && (
				<Modal
					className="coblocks-settings-modal"
					closeLabel={ __( 'Close', 'coblocks' ) }
					onRequestClose={ closeModal }
					shouldCloseOnClickOutside={ false }
					title={ __( 'Editor settings', 'coblocks' ) }
				>
					<section className="edit-post-preferences-modal__section">
						<h2 className="edit-post-preferences-modal__section-title">
							{ __( 'General', 'coblocks' ) }
						</h2>

						<CoBlocksSettingsModalControl.Slot>
							{
								/**
								 * Override with your implementation:
								 *
								 * import { registerPlugin } from '@wordpress/plugins';
								 * import { CoBlocksSettingsModalControl } from './coblocks-settings-slot';
								 * import { CoBlocksSettingsToggleControl } from './coblocks-settings-toggle-control';
								 *
								 * registerPlugin( 'your-settings-modal-control', {
								 *     render: () => (
								 *         <CoBlocksSettingsModalControl>
								 *             <CoBlocksSettingsToggleControl
								 *                 settingsKey="name_of_wordpress_setting"
								 *                 label={ __( 'The toggle control label', 'coblocks' ) }
								 *                 help={ __( 'The toggle control help text', 'coblocks' ) }
								 *             />
								 *         </CoBlocksSettingsModalControl>
								 *     ),
								 * } );
								 */
							}
							<div>CoBlocksSettingsModalControl</div>
						</CoBlocksSettingsModalControl.Slot>
					</section>
				</Modal>
			) }
		</>
	);
}

if ( typeof coblocksSettings !== 'undefined' && !! parseInt( coblocksSettings.coblocksSettingsEnabled ) ) {
	registerPlugin( 'coblocks-settings', {
		icon: '',
		render: CoBlocksSettings,
	} );
} else if ( getPlugin( 'coblocks-settings' ) ) {
	unregisterPlugin( 'coblocks-settings' );
}
