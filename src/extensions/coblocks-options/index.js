// Using ESNext syntax
import { PluginSidebarMoreMenuItem, PluginMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin, getPlugins, getPlugin } from '@wordpress/plugins';
import { Fragment, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import MyModal from './coblocks-options-modal';

import { Button, Modal } from '@wordpress/components';

// console.log( CoBlocksOptionsMenuItem() );

const CoBlocksOptionsMenuItem = () => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<Fragment>
			<PluginMoreMenuItem onClick={ openModal }>
            CoBlocks Options
			</PluginMoreMenuItem>
			{ /* { isOpen && (
				<Modal
					title="This is my modal"
					onRequestClose={ closeModal }>
					<Button onClick={ closeModal }>
						My custom close button
					</Button>
				</Modal>
            ) } */ }
			<Button onClick={ openModal }>Open Modal</Button>
			{ isOpen && (
				<Modal
					title="This is my modal"
					onRequestClose={ closeModal }>
					<Button onClick={ closeModal }>
						My custom close button
					</Button>
				</Modal>
			) }
		</Fragment>

	);
}
;

// const CoBlocksOptions = () => (
// 	<Fragment>
// 		<PluginSidebarMoreMenuItem
// 		>
// 			CoBlocks Options
// 		</PluginSidebarMoreMenuItem>
// 		<MyModal />
// 	</Fragment>
// );

registerPlugin( 'coblocks-options', {
	// icon: 'coblocks',
	render: CoBlocksOptionsMenuItem,
} );
