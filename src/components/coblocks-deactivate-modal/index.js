/**
 * WordPress Dependencies
 */

import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import PluginDeactivateModal from './modal';

import './styles/style.scss';

const COBLOCKS_DEACTIVATE_MODAL_ID = 'coblocks-plugin-deactivate-modal';

function initializeCoBlocksDeactivateModal() {
	render(
		<PluginDeactivateModal />,
		document.getElementById( COBLOCKS_DEACTIVATE_MODAL_ID )
	);
}

domReady( initializeCoBlocksDeactivateModal );
