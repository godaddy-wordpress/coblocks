/* global coblocksLayoutSelector */
/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
	templateSelector: false,
	layouts: coblocksLayoutSelector.layouts || [],
	categories: coblocksLayoutSelector.categories || [],
	imageCategories: coblocksLayoutSelector.imageCategories || [],
};

const actions = {
	openTemplateSelector: () => ( { type: 'OPEN_TEMPLATE_SELECTOR' } ),
	closeTemplateSelector: () => ( { type: 'CLOSE_TEMPLATE_SELECTOR' } ),
	updateLayouts: ( layouts ) => ( { type: 'UPDATE_LAYOUTS', layouts } ),
	updateCategories: ( categories ) => ( { type: 'UPDATE_CATEGORIES', categories } ),
	updateImageCategories: ( imageCategories ) => ( { type: 'UPDATE_IMAGE_CATEGORIES', imageCategories } ),
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
			case 'UPDATE_IMAGE_CATEGORIES':
				return {
					...state,
					imageCategories: action.imageCategories,
				};
		}

		return state;
	},

	actions,

	selectors: {
		isTemplateSelectorActive: ( state ) => state.templateSelector || false,
		hasLayouts: ( state ) => !! state.layouts.length,
		getLayouts: ( state ) => state.layouts || [],
		getCategories: ( state ) => state.categories || [],
		hasCategories: ( state ) => !! state.categories.length,
		getImageCategories: ( state ) => state.imageCategories || [],
		hasImageCategories: ( state ) => !! state.imageCategories.length,
	},
} );

export default store;
