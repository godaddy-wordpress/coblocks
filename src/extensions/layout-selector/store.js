/* global coblocksLayoutSelector */
/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
import { controls, select } from '@wordpress/data-controls';

const DEFAULT_STATE = {
	templateSelector: false,
	layouts: coblocksLayoutSelector.layouts || [],
	categories: coblocksLayoutSelector.categories || [],
};

const actions = {
	openTemplateSelector: () => ( { type: 'OPEN_TEMPLATE_SELECTOR' } ),
	closeTemplateSelector: () => ( { type: 'CLOSE_TEMPLATE_SELECTOR' } ),
	updateLayouts: ( layouts ) => ( { type: 'UPDATE_LAYOUTS', layouts } ),
	updateCategories: ( categories ) => ( { type: 'UPDATE_CATEGORIES', categories } ),
};

const store = registerStore( 'coblocks/template-selector', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'OPEN_TEMPLATE_SELECTOR':
				return {
					...state,
					templateSelector: true,
				};
			case 'CLOSE_TEMPLATE_SELECTOR':
				return {
					...state,
					templateSelector: false,
				};
			case 'UPDATE_LAYOUTS':
				return {
					...state,
					layouts: action.layouts,
				};
			case 'UPDATE_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
		}

		return state;
	},

	actions,

	selectors: {
		isTemplateSelectorActive: ( state ) => state.templateSelector,
		hasLayouts: ( state ) => !! state.layouts.length,
		getLayouts: ( state ) => state.layouts || [],
		getCategories: ( state ) => state.categories || [],
		hasCategories: ( state ) => !! state.categories.length,
	},

	controls,

	resolvers: {
		* isTemplateSelectorActive() {
			const getCurrentPostAttributeStatus = yield select( 'core/editor', 'getCurrentPostAttribute', 'status' );
			const hasEditorUndo = yield select( 'core/editor', 'hasEditorUndo' );
			const isCurrentPostPublished = yield select( 'core/editor', 'isCurrentPostPublished' );

			const isDraft = getCurrentPostAttributeStatus.includes( 'draft' );
			const isCleanUnpublishedPost = ! isCurrentPostPublished && ! hasEditorUndo && isDraft;

			return isCleanUnpublishedPost && actions.openTemplateSelector();
		},
	},
} );

export default store;
