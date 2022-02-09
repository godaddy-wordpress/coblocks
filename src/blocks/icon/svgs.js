/* global coblocksBlockData */

/**
 * External dependencies
 */
import _ from 'lodash';

/**
 * WordPress dependencies
 */
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import allSvgs from './svgs-generated';

const svgs = {
	filled: {},
	outlined: {},
};

const bundledIconsEnabled = ( typeof coblocksBlockData === 'undefined' || coblocksBlockData.bundledIconsEnabled );

let icons = bundledIconsEnabled ? allSvgs : {};

if ( typeof coblocksBlockData !== 'undefined' && Object.keys( coblocksBlockData.customIcons ).length ) {
	const customIcons = _.cloneDeep( coblocksBlockData.customIcons );
	Object.keys( customIcons ).forEach( function( key ) {
		const customIcon = ( customIcons[ key ].icon );
		customIcons[ key ].icon = parse( customIcon );
		if ( 'icon_outlined' in customIcons[ key ] ) {
			const outlinedIcon = ( customIcons[ key ].icon_outlined );
			customIcons[ key ].icon_outlined = parse( outlinedIcon );
		}
	} );
	icons = { ...icons, ...customIcons };
}

// Disable reason: Mutation within execution context - no return value.
// eslint-disable-next-line array-callback-return
Object.entries( icons ).filter( function( item ) {
	svgs.outlined[ item[ 0 ] ] = {
		icon: ( icons[ item[ 0 ] ] && icons[ item[ 0 ] ].icon_outlined ) ? icons[ item[ 0 ] ].icon_outlined : icons[ item[ 0 ] ].icon,
		keywords: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].keywords : null,
		label: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].label : null,
	};

	svgs.filled[ item[ 0 ] ] = {
		icon: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].icon : null,
		keywords: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].keywords : null,
		label: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].label : null,
	};
} );

export default svgs;
