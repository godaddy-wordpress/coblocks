/**
 * Internal dependencies
 */
import {
	LINK_DESTINATION_ATTACHMENT,
	LINK_DESTINATION_MEDIA,
	LINK_DESTINATION_NONE,
} from './constants';
import {
	LINK_DESTINATION_ATTACHMENT as IMAGE_LINK_DESTINATION_ATTACHMENT,
	LINK_DESTINATION_MEDIA as IMAGE_LINK_DESTINATION_MEDIA,
	LINK_DESTINATION_NONE as IMAGE_LINK_DESTINATION_NONE,
	NEW_TAB_REL,
} from './image-constants';

/**
 * External dependencies
 */
import { isEmpty, each, get } from 'lodash';

/**
 * Internal dependencies
 */

/**
 * Determines new href and linkDestination values for an image block from the
 * supplied Gallery link destination.
 *
 * @param {Object} image       Gallery image.
 * @param {string} destination Gallery's selected link destination.
 * @return {Object}            New attributes to assign to image block.
 */
export function getHrefAndDestination( image, destination ) {
	// Need to determine the URL that the selected destination maps to.
	// Gutenberg and WordPress use different constants so the new link
	// destination also needs to be tweaked.
	switch ( destination ) {
		case LINK_DESTINATION_MEDIA:
			return {
				href: image?.source_url || image?.url, // eslint-disable-line camelcase
				linkDestination: IMAGE_LINK_DESTINATION_MEDIA,
			};
		case LINK_DESTINATION_ATTACHMENT:
			return {
				href: image?.link,
				linkDestination: IMAGE_LINK_DESTINATION_ATTACHMENT,
			};
		case LINK_DESTINATION_NONE:
			return {
				href: undefined,
				linkDestination: IMAGE_LINK_DESTINATION_NONE,
			};
	}

	return {};
}

export function removeNewTabRel( currentRel ) {
	let newRel = currentRel;

	if ( currentRel !== undefined && ! isEmpty( newRel ) ) {
		if ( ! isEmpty( newRel ) ) {
			each( NEW_TAB_REL, ( relVal ) => {
				const regExp = new RegExp( '\\b' + relVal + '\\b', 'gi' );
				newRel = newRel.replace( regExp, '' );
			} );

			// Only trim if NEW_TAB_REL values was replaced.
			if ( newRel !== currentRel ) {
				newRel = newRel.trim();
			}

			if ( isEmpty( newRel ) ) {
				newRel = undefined;
			}
		}
	}

	return newRel;
}

/**
 * Helper to get the link target settings to be stored.
 *
 * @param {boolean} value          The new link target value.
 * @param {Object}  attributes     Block attributes.
 * @param {Object}  attributes.rel Image block's rel attribute.
 * @return {Object} Updated link target settings.
 */
export function getUpdatedLinkTargetSettings( value, { rel } ) {
	const linkTarget = value ? '_blank' : undefined;

	let updatedRel;
	if ( ! linkTarget && ! rel ) {
		updatedRel = undefined;
	} else {
		updatedRel = removeNewTabRel( rel );
	}

	return {
		linkTarget,
		rel: updatedRel,
	};
}

/**
 * Determines new Image block attributes size selection.
 *
 * @param {Object} image Media file object for gallery image.
 * @param {string} size  Selected size slug to apply.
 */
export function getImageSizeAttributes( image, size ) {
	const url = get( image, [ 'media_details', 'sizes', size, 'source_url' ] );

	if ( url ) {
		return { url, width: undefined, height: undefined, sizeSlug: size };
	}

	return {};
}
