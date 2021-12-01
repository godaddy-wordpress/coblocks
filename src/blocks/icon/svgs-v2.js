/* global coblocksBlockData */

/**
 * WordPress dependencies
 */
import parse from 'html-react-parser';

/**
 * Internal dependencies
 */
import allSvgs from './svgs-generated';

const svgs = {
	outlined: {},
	filled: {},
};

const bundledIconsEnabled = ( typeof coblocksBlockData === 'undefined' || coblocksBlockData.bundledIconsEnabled );

let icons = bundledIconsEnabled ? allSvgs : {};

if ( typeof coblocksBlockData !== 'undefined' && Object.keys( coblocksBlockData.customIcons ).length ) {
	Object.keys( coblocksBlockData.customIcons ).forEach( function( key ) {
		const customIcon = ( coblocksBlockData.customIcons[ key ].icon ).replace( '<svg', '<svg data-coblocks-custom-icon="true" role="img" aria-hidden="true" focusable="false"' );
		coblocksBlockData.customIcons[ key ].icon = parse( customIcon );
		if ( 'icon_outlined' in coblocksBlockData.customIcons[ key ] ) {
			const outlinedIcon = ( coblocksBlockData.customIcons[ key ].icon_outlined ).replace( '<svg', '<svg data-coblocks-custom-icon="true" role="img" aria-hidden="true" focusable="false"' );
			coblocksBlockData.customIcons[ key ].icon_outlined = parse( outlinedIcon );
		}
	} );
	icons = { ...icons, ...coblocksBlockData.customIcons };
}

// Disable reason: Mutation within execution context - no return value.
// eslint-disable-next-line array-callback-return
Object.entries( icons ).filter( function( item ) {
	svgs.outlined[ item[ 0 ] ] = {
		icon: ( icons[ item[ 0 ] ] && icons[ item[ 0 ] ].icon_outlined ) ? icons[ item[ 0 ] ].icon_outlined : icons[ item[ 0 ] ].icon,
		label: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].label : null,
		keywords: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].keywords : null,
	};

	svgs.filled[ item[ 0 ] ] = {
		icon: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].icon : null,
		label: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].label : null,
		keywords: ( icons[ item[ 0 ] ] ) ? icons[ item[ 0 ] ].keywords : null,
	};
} );

export default svgs;
