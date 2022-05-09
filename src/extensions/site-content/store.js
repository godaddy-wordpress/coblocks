/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
	isInRenameMode: null,
};

export const actions = {
	setRenameMode: ( postId ) => ( { type: 'SET_RENAME_MODE', postId } ),
	cancelRenameMode: () => ( { type: 'CANCEL_RENAME_MODE' } ),
};

export const reducer = ( state = DEFAULT_STATE, action ) => {
	if ( action.type === 'SET_RENAME_MODE' ) {
		return {
			...state,
			isInRenameMode: action.postId,
		};
	}

	if ( action.type === 'CANCEL_RENAME_MODE' ) {
		return {
			...state,
			isInRenameMode: null,
		};
	}

	return state;
};

export const selectors = {
	isInRenameMode: ( state ) => state.isInRenameMode,
};

const store = registerStore( 'coblocks/site-content', {
	reducer,
	actions,
	selectors,
} );

export default store;
