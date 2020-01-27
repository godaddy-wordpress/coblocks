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

