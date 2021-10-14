/**
 * Internal dependencies
 */
import icons from './icons';
import { parseNavForClass } from './edit';

/**
 * External dependencies
 */
import get from 'lodash/get';
import memoize from 'memize';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// Disable reason: We choose to use unsafe APIs in our codebase.
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * When passed the Carousel Gallery block attributes will return
 * active variation title string or false if unset.
 *
 * @constant
 * @type {Function}
 * @param {Object} attributes Attributes object passed from Gallery Carousel
 * @return {string|boolean} Return the title of the matching variation or false otherwise.
 */
const hasVariationSet = memoize( ( attributes ) => {
	// Short circuit if images have been set by user.
	if ( Object.entries( attributes.images ).length > 0 ) {
		return false;
	}

	// Recurse array of variation attributes and compare with matching key of real attributes.
	const variationMatches = variations.map( ( variation ) => {
		const matchingValues = Object.entries( variation.attributes )
			.filter( ( [ key ] ) => attributes[ key ] === variation.attributes[ key ] );
		const isMatchingVariation = matchingValues.length === Object.entries( variation.attributes ).length;
		return isMatchingVariation ? variation.title : false;
	} );

	const hasMatchingVariation = variationMatches.filter( ( match ) => typeof match === 'string' );
	if ( hasMatchingVariation.length ) {
		return hasMatchingVariation[ 0 ];
	}

	// No variation detected. Finally check for skip variation.
	const matchesSkipValues = Object.entries( defaultVariation.attributes )
		.filter( ( [ key ] ) => attributes[ key ] === defaultVariation.attributes[ key ] );
	const isMatchingSkip = matchesSkipValues.length === Object.entries( defaultVariation.attributes ).length;

	if ( isMatchingSkip ) {
		return 'skip';
	}

	return false;
} );

/**
 * Default template variation which represents the un-configured Carousel experience.
 *
 * @constant
 * @type {Object}
 */
const defaultVariation = {
	attributes: {
		gridSize: 'xlrg',
		// The following attributes would default due to useEffect logic.
		radius: 0,
		gutter: 0,
		gutterMobile: 0,
	},
};

/**
 * Template option choices for predefined carousel layouts.
 *
 * @constant
 * @type {Array}
 */
const variations = [
	{
		name: 'full-thumbnails-xlrg',
		title: __( 'Thumbnails', 'coblocks' ),
		icon: icons.thumbnails,
		attributes: {
			thumbnails: true,
			alignCells: true,
			align: 'full',
			autoPlay: false,
			draggable: false,
			freeScroll: false,
			prevNextButtons: false,
			gridSize: 'xlrg',
			// The following attributes would default due to useEffect logic.
			radius: 0,
			gutter: 0,
			gutterMobile: 0,
			pageDots: false,
		},
		scope: [ 'block' ],
	},
	{
		name: 'full-arrows-lrg',
		title: __( 'Full Autoplay', 'coblocks' ),
		icon: icons.fullAutoplay,
		attributes: {
			thumbnails: false,
			alignCells: false,
			align: 'full',
			autoPlay: true,
			draggable: false,
			freeScroll: false,
			prevNextButtons: true,
			gridSize: 'lrg',
			autoPlaySpeed: 3000,
		},
		scope: [ 'block' ],
	},
	{
		name: 'full-scroll-dots-lrg',
		title: __( 'Full Scroll', 'coblocks' ),
		icon: icons.fullScroll,
		attributes: {
			thumbnails: false,
			alignCells: true,
			align: 'full',
			autoPlay: true,
			prevNextButtons: true,
			gridSize: 'lrg',
			autoPlaySpeed: 3000,
			responsiveHeight: true,
			pageDots: true,
			freeScroll: true,
			draggable: true,
			pauseHover: true,
		},
		scope: [ 'block' ],
	},
	{
		name: 'wide-lightbox-lrg',
		title: __( 'Lightbox', 'coblocks' ),
		icon: icons.lightbox,
		attributes: {
			thumbnails: false,
			alignCells: true,
			align: 'wide',
			autoPlay: true,
			prevNextButtons: true,
			gridSize: 'lrg',
			autoPlaySpeed: 3000,
			responsiveHeight: true,
			pageDots: false,
			freeScroll: true,
			draggable: false,
			pauseHover: true,
			lightbox: true,
		},
		scope: [ 'block' ],
	},
];

/**
 * The Experimental Block Variation Picker functional component for the Carousel Gallery block.
 *
 * @constant FunctionalComponent
 * @param {Object} props Props passed from Carousel Gallery block.
 */
const CarouselGalleryVariationPicker = ( props ) => {
	const { name, setAttributes, clientId } = props;
	const blockType = useSelect( ( select ) => select( 'core/blocks' ).getBlockType( name ), [] );
	const registeredVariations = useSelect( ( select ) => select( 'core/blocks' ).getBlockVariations( name ) ?? null, [] );

	return ( <__experimentalBlockVariationPicker
		icon={ get( blockType, [ 'icon', 'src' ] ) }
		label={ get( blockType, [ 'title' ] ) }
		instructions={ __( 'Select a carousel variation to start with.', 'coblocks' ) }
		variations={ registeredVariations }
		allowSkip
		onSelect={ ( nextVariation = defaultVariation ) => {
			if ( nextVariation?.attributes ) {
				setAttributes( {
					...nextVariation.attributes,

					// This class is assigned dynamically when block attributes have truthy thumbnails.
					// nav class must be set here as well so that only a single undo snapshot is created.
					navForClass: parseNavForClass( nextVariation.attributes?.thumbnails, clientId ),
				} );
			}
		} }
	/>
	);
};

export { CarouselGalleryVariationPicker, variations, hasVariationSet };
