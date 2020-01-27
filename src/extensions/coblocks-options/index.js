// Using ESNext syntax
import { PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CoBlocksOptionsMenuItem from './coblocks-options-menu-item';
import MyModal from './coblocks-options-modal';

const CoBlocksOptions = () => (
	<Fragment>
		<PluginSidebarMoreMenuItem
		>
			CoBlocks Options
		</PluginSidebarMoreMenuItem>
		<MyModal />
	</Fragment>
);

registerPlugin( 'coblocks-options', {
	// icon: 'coblocks',
	render: CoBlocksOptions,
} );
