// /**
//  * WordPress dependencies
//  */
// import { Modal } from '@wordpress/components';
// import { __ } from '@wordpress/i18n';
// import { withSelect, withDispatch } from '@wordpress/data';
// import { compose } from '@wordpress/compose';

// /**
//  * Unique identifier for Manage Blocks modal.
//  *
//  * @type {string}
//  */
// const MODAL_NAME = 'coblocks-options';

// export function CoBlocksOptionsModal( { isActive, closeModal } ) {
// 	if ( ! isActive ) {
// 		return null;
// 	}

// 	return (
// 		<Modal
// 			className="edit-post-manage-blocks-modal"
// 			title={ __( 'CoBlocks Options' ) }
// 			closeLabel={ __( 'Close' ) }
// 			onRequestClose={ closeModal }
// 		>
//             Here is some sample content.
// 		</Modal>
// 	);
// }

// export default compose( [
// 	withSelect( ( select ) => {
// 		const { isModalActive } = select( 'core/edit-post' );

// 		return {
// 			isActive: isModalActive( MODAL_NAME ),
// 		};
// 	} ),
// 	withDispatch( ( dispatch ) => {
// 		const { closeModal } = dispatch( 'core/edit-post' );

// 		return {
// 			closeModal,
// 		};
// 	} ),
// ] )( CoBlocksOptionsModal );

import { Button, Modal, Fragment } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { PluginSidebarMoreMenuItem } from '@wordpress/edit-post';

export const MyModal = () => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<PluginSidebarMoreMenuItem onClick={ openModal }>
			{ isOpen && (
				<Modal
					title="This is my modal"
					onRequestClose={ closeModal }>
					<Button isSecondary onClick={ closeModal }>
						My custom close button
					</Button>
				</Modal>
			) }

            CoBlocks Options

		</PluginSidebarMoreMenuItem>
	);
}
;
