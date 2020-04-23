/*global coblocksSettings*/

/**
 * Styles
 */
import './styles/style.scss';

/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Fragment, useState } from '@wordpress/element';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { registerGenericStore } from '@wordpress/data';
import { registerPlugin, getPlugin, unregisterPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModal from './coblocks-settings-modal';
import createCoBlocksStore from './coblocks-settings-store.js';

if ( typeof coblocksSettings !== 'undefined' && coblocksSettings.coblocksSettingsEnabled ) {
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
						applyFilters( 'coblocks-settings-title', __( 'Editor settings', 'coblocks' ) )
					}
				</PluginMoreMenuItem>
				<CoBlocksSettingsModal { ...props } />
			</Fragment>

		);
	};

	registerPlugin( 'coblocks-settings', {
		icon: '',
		render: CoBlocksSettingsMenuItem,
	} );

	registerGenericStore( 'coblocks-settings', createCoBlocksStore() );
} else if ( getPlugin( 'coblocks-settings' ) ) {
	unregisterPlugin( 'coblocks-settings' );
}
