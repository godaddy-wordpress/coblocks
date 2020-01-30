/**
 * Styles
 */
import './styles/style.scss';

/**
 * External dependencies
 */
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { Fragment, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { registerGenericStore } from '@wordpress/data';
import {
	__,
	sprintf,
} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CoBlocksOptionsModal from './coblocks-options-modal';
import createCoBlocksStore from './coblocks-settings-store.js';

const CoBlocksOptionsMenuItem = () => {
	const [
		isOpen,
		setOpen,
	] = useState( false );

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
				{
					sprintf(
						/* translators: %s: Plugin name */
						__( '%s settings', 'coblocks' ),
						'CoBlocks'
					)
				}
			</PluginMoreMenuItem>
			<CoBlocksOptionsModal { ...props } />
		</Fragment>

	);
};

registerPlugin( 'coblocks-options', {
	icon: '',
	render: CoBlocksOptionsMenuItem,
} );

registerGenericStore( 'coblocks-settings', createCoBlocksStore() );
