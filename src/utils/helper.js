/**
 * External dependencies
 */
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import pick from 'lodash/pick';

// Categories Helper
import { supportsCollections } from './block-helpers';

/**
 * WordPress dependencies
 */
import { isBlobURL } from '@wordpress/blob';
import { registerBlockType } from '@wordpress/blocks';
import TokenList from '@wordpress/token-list';

// Set dim ratio.
export function overlayToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 )
		? null
		: 'has-background-overlay-' + ( 10 * Math.round( ratio / 10 ) );
}

/**
 * The `blockProps` will indicate in the editor what is the block root
 * by applying block classnames and DOM attributes. By default `blockProps`
 * will contain the block styles set through block supports.
 *
 * We can descend those styles into sub components and thereby
 * eliminate superfluous style bleed.
 *
 * @param {Object} blockProps Object from `useBlockProps`
 * @function blockStylesToDescend
 * @return {Object} The block styles coming from blockProps.
 */
export const blockStylesToDescend = ( ( blockProps ) => {
	const blockStyle = { ...blockProps?.style ?? {} };
	delete blockProps.style;
	return blockStyle;
} );

// Pick image media attributes.
export const pickRelevantMediaFiles = ( image, images ) => {
	const imageProps = pick( image, [ 'alt', 'id', 'link', 'caption', 'imgLink' ] );
	imageProps.url = get( image, [ 'sizes', 'large', 'url' ] ) || get( image, [ 'media_details', 'sizes', 'large', 'source_url' ] ) || image.url;
	const imgKey = findIndex( images, function( img ) {
		return img.url === imageProps.url;
	} );
	imageProps.imgLink = imgKey >= 0 ? images[ imgKey ].imgLink : '';
	return imageProps;
};

/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily
 * while the image is being uploaded and will not have an id yet allocated.
 *
 * @param {number=} id  The id of the image.
 * @param {string=} url The url of the image.
 * @return {boolean} Is the URL a Blob URL
 */
export const isTemporaryImage = ( id, url ) => ! id && isBlobURL( url );

// Define accepted media for gallery blocks.
export const ALLOWED_GALLERY_MEDIA_TYPES = [ 'image' ];

export const hexToRGB = ( h ) => {
	let b = 0,
		g = 0,
		r = 0;

	switch ( h.length ) {
		case 4: {
			r = '0x' + h[ 1 ] + h[ 1 ];
			g = '0x' + h[ 2 ] + h[ 2 ];
			b = '0x' + h[ 3 ] + h[ 3 ];
			break;
		}
		case 7: {
			r = '0x' + h[ 1 ] + h[ 2 ];
			g = '0x' + h[ 3 ] + h[ 4 ];
			b = '0x' + h[ 5 ] + h[ 6 ];
			break;
		}
	}

	return `${ +r }, ${ +g }, ${ +b }`;
};

/**
 * computeFontSize will return numeric fontSize value with appropriate css string suffix
 * `em, px, or rem`.
 *
 * @param {Object|string} fontSize Object passed from withFontSizes HOC props or fontsize value.
 * @return {string} fontSize string value that is ready for inline CSS.
 */
export const computeFontSize = ( fontSize ) => {
	const size = fontSize?.size ?? fontSize;
	return RegExp( /([a-z])/ ).test( size ) ? size : size + 'px';
};

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
export const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}

	let { category } = block;
	const { name, settings } = block;

	if ( ! supportsCollections() && ! name.includes( 'gallery' ) ) {
		category = 'coblocks';
	}

	let icon = '';
	if ( !! settings?.icon ) {
		icon = {
			foreground: getBlockIconColor(),
			src: settings.icon,
		};
	}

	const isV2 = block?.metadata?.apiVersion === 2;
	const v2Settings = isV2 ? block?.metadata : {};
	if ( !! settings?.attributes && isV2 ) {
		v2Settings.attributes = { ...v2Settings.attributes, ...settings?.attributes };
	}

	registerBlockType( name, {
		category,
		...settings,
		icon,

		// V2 Block API Upgrades
		...v2Settings,
	} );
};

/**
 * Returns the color used for Icon Color in the block editor.
 */
export function getBlockIconColor() {
	return '#09757A';
}

/**
 * Parse V2 `blockProps.className` and return color related classes. Keep all others within `blockProps`.
 *
 * This function will overwrite `blockProps.classNames` to remove color related properties.
 *
 * @param {Object} blockProps The V2 blockProps.
 * @return {Object?} The active style.name.
 */
export const getColorClassnames = ( blockProps ) => {
	const descendingClasses = new TokenList();
	const originalClasses = new TokenList( blockProps.className );

	for ( const classToken of originalClasses.values() ) {
		if ( classToken.indexOf( '-color' ) === -1 && classToken.indexOf( '-background' ) === -1 ) {
			continue;
		}
		originalClasses.remove( classToken );
		descendingClasses.add( classToken );
	}
	blockProps.className = originalClasses.toString();
	return descendingClasses.toString();
};

/**
 * Parse V2 `blockProps.style` and return color related styles. Keep all others within `blockProps`.
 *
 * This function will overwrite `blockProps.style` to remove color related properties.
 *
 * @param {Object} blockProps The V2 blockProps.
 * @return {Object?} The active style.name.
 */
export const getColorStyles = ( blockProps ) => {
	const { backgroundColor, color } = blockProps.style;
	const originalStyles = { ...blockProps.style };

	const descendingStyles = { backgroundColor, color };

	[ 'backgroundColor', 'color' ].forEach( ( key ) => {
		delete originalStyles[ key ];
	} );

	blockProps.style = originalStyles;
	return descendingStyles;
};

