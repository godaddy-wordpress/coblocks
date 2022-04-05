/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { getPlugin, registerPlugin } from '@wordpress/plugins';
import { MenuItem, Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksLabsModalControl from './coblocks-labs-slot';

import { category as categoryIcon } from '@wordpress/icons';

export function CoBlocksLabs() {
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
			<PluginMoreMenuItem as={ MenuItem } icon={ categoryIcon } onClick={ openModal }>
				{ __( 'CoBlocks Labs', 'coblocks' ) }
			</PluginMoreMenuItem>
			{ isOpen && (
				<Modal
					className="coblocks-labs-modal"
					closeLabel={ __( 'Close', 'coblocks' ) }
					onRequestClose={ closeModal }
					shouldCloseOnClickOutside={ false }
					title={ __( 'CoBlocks Labs', 'coblocks' ) }
				>
					<section className="coblocks-labs-modal-controls">
						<CoBlocksLabsModalControl.Slot>
							{
								/**
								 * Override with your implementation:
								 *
								 * import { registerPlugin } from '@wordpress/plugins';
								 * import { CoBlocksLabsModalControl } from './coblocks-labs-slot';
								 * import { CoBlocksLabsToggleControl } from './coblocks-labs-toggle-control';
								 *
								 * registerPlugin( 'your-labs-modal-control', {
								 *     render: () => (
								 *         <CoBlocksLabsModalControl>
								 *             <CoBlocksLabsToggleControl
								 *                 settingsKey="name_of_wordpress_setting"
								 *                 label={ __( 'The toggle control label', 'coblocks' ) }
								 *                 help={ __( 'The toggle control help text', 'coblocks' ) }
								 *             />
								 *         </CoBlocksLabsModalControl>
								 *     ),
								 * } );
								 */
							}
							<div>{ CoBlocksLabsModalControl }</div>
						</CoBlocksLabsModalControl.Slot>
					</section>
				</Modal>
			) }
		</>
	);
}

if ( ! getPlugin( 'coblocks-labs' ) ) {
	registerPlugin( 'coblocks-labs', {
		icon: '',
		render: CoBlocksLabs,
	} );
}
