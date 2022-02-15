/* global coblocksDeactivateData */

/**
 * WordPress Dependencies
 */

import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

import PluginDeactivateModal from './modal';

import './styles/style.scss';

function initializeCoBlocksDeactivateModal() {
	render(
		<PluginDeactivateModal />,
		document.getElementById( coblocksDeactivateData.containerClass )
	);
}

domReady( initializeCoBlocksDeactivateModal );
