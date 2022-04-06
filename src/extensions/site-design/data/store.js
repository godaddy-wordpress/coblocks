/**
 * WordPress dependencies
 */
import { controls } from '@wordpress/data-controls';
import { register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import STORE_KEY from './constants';
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

register(
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
