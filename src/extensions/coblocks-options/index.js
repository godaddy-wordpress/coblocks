// Using ESNext syntax
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { Fragment, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { registerGenericStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { icon } from './icon';
import CoBlocksOptionsModal from './coblocks-options-modal';
import createCoBlocksStore from './coblocks-settings-store.js';

const CoBlocksOptionsMenuItem = () => {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const props = {
		isOpen,
		openModal,
		closeModal,
	};

	return (
		<Fragment>
			<PluginMoreMenuItem onClick={ openModal }>
            CoBlocks Settings
			</PluginMoreMenuItem>
			<CoBlocksOptionsModal { ...props } />

		</Fragment>

	);
};

registerPlugin( 'coblocks-options', {
	icon,
	render: CoBlocksOptionsMenuItem,
} );

registerGenericStore( 'coblocks-settings', createCoBlocksStore() );
