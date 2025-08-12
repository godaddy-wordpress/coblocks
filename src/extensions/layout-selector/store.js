/* global coblocksLayoutSelector */
/**
 * External dependencies
 */
import { kebabCase } from 'lodash';

/**
 * WordPress dependencies
 */
import { controls } from '@wordpress/data-controls';
import memoize from 'memize';
import { createReduxStore, select as dataSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

const DEFAULT_STATE = {
	categories: coblocksLayoutSelector.categories || [],
	computedLayouts: [],
	layoutUsage: {},
	layouts: coblocksLayoutSelector.layouts || [],
	selectedCategory: 'most-used',
	templateSelector: false,
};

// Module constants
const MILLISECONDS_PER_HOUR = 3600 * 1000;
const MILLISECONDS_PER_DAY = 24 * 3600 * 1000;
const MILLISECONDS_PER_WEEK = 7 * 24 * 3600 * 1000;

// Taken from Core: https://github.com/WordPress/gutenberg/blob/e41e4f62074fac964d5c92e8836e826e90b289f7/packages/block-editor/src/store/selectors.js#L1434
const calculateFrequency = memoize( ( time, count ) => {
	if ( ! time ) {
		return count;
	}

	const duration = Date.now() - time;

	switch ( true ) {
		case duration < MILLISECONDS_PER_HOUR:
			return count * 4;
		case duration < MILLISECONDS_PER_DAY:
			return count * 2;
		case duration < MILLISECONDS_PER_WEEK:
			return count / 2;
		default:
			return count / 4;
	}
} );

const actions = {
	closeTemplateSelector: () => ( { type: 'CLOSE_TEMPLATE_SELECTOR' } ),
	incrementLayoutUsage: ( layout ) => ( { layout, time: Date.now(), type: 'INCREMENT_LAYOUT_USAGE' } ),
	openTemplateSelector: () => ( { type: 'OPEN_TEMPLATE_SELECTOR' } ),
	updateCategories: ( categories ) => ( { categories, type: 'UPDATE_CATEGORIES' } ),
	updateComputedLayouts: ( computedLayouts ) => ( { computedLayouts, type: 'UPDATE_COMPUTED_LAYOUTS' } ),
	updateLayouts: ( layouts ) => ( { layouts, type: 'UPDATE_LAYOUTS' } ),
	updateSelectedCategory: ( selectedCategory ) => ( { selectedCategory, type: 'UPDATE_CATEGORY' } ),
};

const store = createReduxStore( 'coblocks/template-selector', {
	actions,
	controls,
	persist: [ 'layoutUsage' ],
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
			case 'UPDATE_COMPUTED_LAYOUTS':
				return {
					...state,
					computedLayouts: action.computedLayouts,
				};
			case 'UPDATE_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
			case 'UPDATE_CATEGORY':
				return {
					...state,
					selectedCategory: action.selectedCategory,
				};
			case 'INCREMENT_LAYOUT_USAGE':
				const layoutSlug = kebabCase( action.layout.label );
				return {
					...state,
					layoutUsage: {
						...state.layoutUsage,
						[ layoutSlug ]: {
							count: state.layoutUsage[ layoutSlug ] ? state.layoutUsage[ layoutSlug ].count + 1 : 1,
							time: action.time,
						},
					},
				};
		}

		return state;
	},

	resolvers: {
		* isTemplateSelectorActive() {
			// Ensure the editor store is available in environments where it isn't auto-enqueued.
			const editorSelect = dataSelect( editorStore );
			const isCleanNewPost = editorSelect && typeof editorSelect.isCleanNewPost === 'function'
				? editorSelect.isCleanNewPost()
				: false;
			const isEditedPostEmpty = editorSelect && typeof editorSelect.isEditedPostEmpty === 'function'
				? editorSelect.isEditedPostEmpty()
				: false;
			const shouldShowTemplateSelector = isCleanNewPost || isEditedPostEmpty;

			return shouldShowTemplateSelector && actions.openTemplateSelector();
		},
	},
	selectors: {
		getCategories: ( state ) => state.categories || [],
		getComputedLayouts: ( state ) => state.computedLayouts,
		getLayoutUsage: ( state ) => state.layoutUsage,
		getLayouts: ( state ) => {
			const layouts = state.layouts || [];
			return layouts.map( ( layout ) => {
				const { time, count = 0 } = state.layoutUsage[ kebabCase( layout.label ) ] || {};
				return {
					...layout,
					frequency: calculateFrequency( time, count ),
				};
			} );
		},
		getSelectedCategory: ( state ) => state.selectedCategory,
		hasCategories: ( state ) => !! state.categories.length,
		hasLayouts: ( state ) => !! state.layouts.length,
		isTemplateSelectorActive: ( state ) => state.templateSelector,
	},
} );

export default store;
