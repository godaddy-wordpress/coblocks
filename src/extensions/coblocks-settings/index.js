/*global coblocksSettings*/

/**
 * Styles
 */
import './styles/style.scss';

/**
 * External dependencies
 */
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { Fragment, useState } from '@wordpress/element';
import { registerPlugin, getPlugin, unregisterPlugin } from '@wordpress/plugins';
import { registerGenericStore } from '@wordpress/data';
import {
	__,
	sprintf,
} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CoBlocksOptionsModal from './coblocks-settings-modal';
import createCoBlocksStore from './coblocks-settings-store.js';

if ( typeof coblocksSettings === 'undefined' ) {
	coblocksSettings.coblocksSettings = '0';
}

if ( coblocksSettings.coblocksSettings === '1' ) {
	const CoBlocksSettingsMenuItem = () => {
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

	registerPlugin( 'coblocks-settings', {
		icon: '',
		render: CoBlocksSettingsMenuItem,
	} );

	registerGenericStore( 'coblocks-settings', createCoBlocksStore() );
} else {
	if ( getPlugin( 'coblocks-settings' ) ) {
		unregisterPlugin( 'coblocks-settings' );
	}
}

