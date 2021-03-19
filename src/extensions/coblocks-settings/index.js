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
import { registerPlugin, getPlugin, unregisterPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksSettingsModal from './coblocks-settings-modal';
import registerCoBlocksSettingsStore from './coblocks-settings-store';

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

	registerCoBlocksSettingsStore();
} else if ( getPlugin( 'coblocks-settings' ) ) {
	unregisterPlugin( 'coblocks-settings' );
}
