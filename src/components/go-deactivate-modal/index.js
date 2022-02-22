/* global goThemeDeactivateData */

/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import './styles/style.scss';
import DeactivateModal from '../common-action-modal';

const API_BASE_URL = 'https://wpnux.godaddy.com/v3/api';

const GoDeactivateModal = () => {
	const apiUrl = `${ API_BASE_URL }/feedback/go-theme-optout`;

	const isEvent = ( e ) => e.target.classList.contains( 'activate' );

	if ( ! goThemeDeactivateData ) {
		return null;
	}

	return (
		<DeactivateModal
			apiUrl={ apiUrl }
			isEvent={ isEvent }
			pageData={ goThemeDeactivateData }
		/>
	);
};

function initializeGoThemeDeactivateModal() {
	render(
		<GoDeactivateModal />,
		document.getElementById( goThemeDeactivateData.containerClass )
	);
}

domReady( initializeGoThemeDeactivateModal );
