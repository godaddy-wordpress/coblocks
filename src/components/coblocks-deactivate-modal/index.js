/* global coblocksDeactivateData */

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import DeactivateModal from '../common-action-modal';
import './styles/style.scss';

const API_BASE_URL = 'https://wpnux.godaddy.com/v3/api';

const PluginDeactivateModal = () => {
	const apiUrl = `${ API_BASE_URL }/feedback/coblocks-optout`;
	const domain = coblocksDeactivateData.domain;

	const isEvent = ( e ) => e.target.id === 'deactivate-coblocks';

	if ( ! coblocksDeactivateData || ! domain ) {
		return null;
	}

	const getParams = { domain };

	return (
		<DeactivateModal
			apiUrl={ apiUrl }
			getParams={ getParams }
			isEvent={ isEvent }
			pageData={ coblocksDeactivateData }
		/>
	);
};

function initializeCoBlocksDeactivateModal() {
	render(
		<PluginDeactivateModal />,
		document.getElementById( coblocksDeactivateData.containerClass )
	);
}

domReady( initializeCoBlocksDeactivateModal );
