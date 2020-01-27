// // Using ESNext syntax
import { PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { MenuGroup, MenuItem } from '@wordpress/components';
// import { registerPlugin } from '@wordpress/plugins';
// import { Fragment } from '@wordpress/element';

// /**
//  * Internal dependencies
//  */
// import CoBlocksOptionsModal from './coblocks-options-modal';

// const CoBlocksOptions = () => (
// 	<Fragment>
// 		<PluginSidebarMoreMenuItem
// 		>
// 			CoBlocks Options
// 		</PluginSidebarMoreMenuItem>
// 		<CoBlocksOptionsModal />
// 	</Fragment>
// );

/**
 * WordPress dependencies
 */
// import { MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export function CoBlocksOptionsMenuItem( { openModal } ) {
	return (
		<MenuGroup label="CoBlocks">
			<MenuItem
				onClick={ () => {
					openModal( 'coblocks-options' );
				} }
			>
				{ __( 'CoBlocks Options' ) }
			</MenuItem>
		</MenuGroup>
	);
}

export default withDispatch( ( dispatch ) => {
	const {
		openModal,
	} = dispatch( 'core/edit-post' );

	return {
		openModal,
	};
} )( CoBlocksOptionsMenuItem );
