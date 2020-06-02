/**
 * Internal dependencies
 */
import rowIcons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const layoutOptions = {
	2: [
		{ key: '50-50', name: __( 'Equal split', 'coblocks' ), icon: rowIcons.layout5050, smallIcon: rowIcons.smallLayout5050 },
		{ key: '66-33', name: __( 'Two thirds / one third', 'coblocks' ), icon: rowIcons.layout6633, smallIcon: rowIcons.smallLayout6633 },
		{ key: '33-66', name: __( 'One third / two thirds', 'coblocks' ), icon: rowIcons.layout3366, smallIcon: rowIcons.smallLayout3366 },
		{ key: '75-25', name: __( 'Three quarters / quarter', 'coblocks' ), icon: rowIcons.layout7525, smallIcon: rowIcons.smallLayout7525 },
		{ key: '25-75', name: __( 'Quarter / three quarters', 'coblocks' ), icon: rowIcons.layout2575, smallIcon: rowIcons.smallLayout2575 },
	],
	3: [
		{ key: '33-33-33', name: __( 'Thirds', 'coblocks' ), icon: rowIcons.layout333333, smallIcon: rowIcons.smallLayout333333 },
		{ key: '50-25-25', name: __( 'Half / quarter / quarter', 'coblocks' ), icon: rowIcons.layout502525, smallIcon: rowIcons.smallLayout502525 },
		{ key: '25-25-50', name: __( 'Quarter / quarter/ half', 'coblocks' ), icon: rowIcons.layout252550, smallIcon: rowIcons.smallLayout252550 },
		{ key: '25-50-25', name: __( 'Quarter / half / quarter', 'coblocks' ), icon: rowIcons.layout255025, smallIcon: rowIcons.smallLayout255025 },
		{ key: '20-60-20', name: __( 'One fifth/ three fifths / one fifth', 'coblocks' ), icon: rowIcons.layout206020, smallIcon: rowIcons.smallLayout206020 },
	],
	4: [
		{ key: '25-25-25-25', name: __( 'Quarters', 'coblocks' ), icon: rowIcons.layout25252525, smallIcon: rowIcons.smallLayout25252525 },
		{ key: '40-20-20-20', name: __( 'Two fifths / fifth / fifth / fifth', 'coblocks' ), icon: rowIcons.layout40202020, smallIcon: rowIcons.smallLayout40202020 },
		{ key: '20-20-20-40', name: __( 'Fifth / fifth / fifth / two fifths', 'coblocks' ), icon: rowIcons.layout20202040, smallIcon: rowIcons.smallLayout20202040 },
	],
};

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
export const allowedBlocks = [ 'coblocks/column' ];

export const template = {
	100: [
		[ 'coblocks/column', { width: '100' } ],
	],
	'50-50': [
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '50' } ],
	],
	'25-75': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '75' } ],
	],
	'75-25': [
		[ 'coblocks/column', { width: '75' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'66-33': [
		[ 'coblocks/column', { width: '66' } ],
		[ 'coblocks/column', { width: '33' } ],
	],
	'33-66': [
		[ 'coblocks/column', { width: '33' } ],
		[ 'coblocks/column', { width: '66' } ],
	],
	'33-33-33': [
		[ 'coblocks/column', { width: '33.33' } ],
		[ 'coblocks/column', { width: '33.33' } ],
		[ 'coblocks/column', { width: '33.33' } ],
	],
	'50-25-25': [
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'25-25-50': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '50' } ],
	],
	'25-50-25': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '50' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'20-60-20': [
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '60' } ],
		[ 'coblocks/column', { width: '20' } ],
	],
	'25-25-25-25': [
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
		[ 'coblocks/column', { width: '25' } ],
	],
	'40-20-20-20': [
		[ 'coblocks/column', { width: '40' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
	],
	'20-20-20-40': [
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '20' } ],
		[ 'coblocks/column', { width: '40' } ],
	],
};

export const getEditWrapperProps = ( attributes ) => {
	const { id, layout, columns, hasAlignmentControls } = attributes;

	// If no layout is seleted, return the following.
	if ( ! layout ) {
		return { 'data-id': id, 'data-columns': columns, 'data-layout': 'none' };
	}

	if ( hasAlignmentControls === false ) {
		return { 'data-align': '' };
	}

	return { 'data-id': id, 'data-columns': columns, 'data-layout': layout };
};

