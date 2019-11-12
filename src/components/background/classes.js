/**
 * Internal dependencies
 */
import * as ratio from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Background Classes.
 *
 * @param {Object} attributes The attributes.
 * @returns {Array} The background classes.
 */
function BackgroundClasses( attributes ) {
	const backgroundClass = getColorClassName( 'background-color', attributes.backgroundColor );
	const backgroundSize = attributes.backgroundSize ? attributes.backgroundSize : 'cover';

	const classes = [
		{ [ backgroundClass ]: backgroundClass },
		{ 'has-background': attributes.backgroundColor || attributes.customBackgroundColor },
		{ 'has-parallax': attributes.backgroundImg && attributes.backgroundType === 'image' && attributes.hasParallax },
		{ 'is-transient': attributes.backgroundImg && 0 === attributes.backgroundImg.indexOf( 'blob:' ) },
		{ 'has-background-overlay': attributes.backgroundImg && attributes.backgroundOverlay !== 0 },
		{ [ `bg-${ backgroundSize }` ]: attributes.backgroundImg && attributes.backgroundType === 'image' },
	];

	if ( attributes.backgroundType ) {
		classes.push(
			{ [ `has-background-${ attributes.backgroundType }` ]: attributes.backgroundImg }
		);
	}

	if ( attributes.backgroundRepeat ) {
		classes.push(
			{ [ `bg-${ attributes.backgroundRepeat }` ]: attributes.backgroundImg && attributes.backgroundType === 'image' }
		);
	}

	if ( attributes.backgroundPosition ) {
		classes.push(
			{ [ `bg-${ attributes.backgroundPosition.split( ' ' ).join( '-' ) }` ]: attributes.backgroundImg && attributes.backgroundType === 'image' }
		);
	}

	if ( attributes.backgroundOverlay ) {
		classes.push(
			{ [ ratio.overlayToClass( attributes.backgroundOverlay ) ]: attributes.backgroundImg && attributes.backgroundOverlay !== 0 && attributes.backgroundOverlay !== 50 }
		);
	}

	return classes;
}

export default BackgroundClasses;
