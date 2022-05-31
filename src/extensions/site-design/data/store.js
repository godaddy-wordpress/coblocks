/**
 * WordPress dependencies
 */
import { controls } from '@wordpress/data-controls';
import { registerStore } from '@wordpress/data';

/**
 * Internal dependencies
 */
import STORE_KEY from './constants';
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

registerStore(
	STORE_KEY,
	{
		reducer,
		actions,
		selectors,
		controls,
		resolvers,
		persist: [
			'fontsPanelOpen',
			'colorsPanelOpen',
			'designsPanelOpen',
		],
	}
);
