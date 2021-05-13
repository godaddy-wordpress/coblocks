/**
 * External dependencies
 */
import get from 'lodash/get';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const images = [
	{ url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
	{ url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
	{ url: 'https://s.w.org/images/core/5.3/MtBlanc1.jpg' },
];

/**
 * Template option choices for predefined carousel layouts.
 *
 * @constant
 * @type {Array}
 */
const variations = [
	{
		name: 'full-thumbnails-xlrg',
		title: __( 'Full with thumbnails', 'coblocks' ),
		// icon: rowIcons.colOne,
		attributes: {
			thumbnails: true,
			alignCells: true,
			align: 'full',
			images,
			autoPlay: false,
			draggable: false,
			freeScroll: false,
			prevNextButtons: false,
			gridSize: 'xlrg',
		},
		isDefault: true,
		scope: [ 'block' ],
	},
	{
		name: 'full-arrows-lrg',
		title: __( 'Full with auto play', 'coblocks' ),
		// 	icon: rowIcons.layout5050,
		attributes: {
			thumbnails: false,
			alignCells: false,
			align: 'full',
			images,
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
		title: __( 'Full with free scroll', 'coblocks' ),
		// icon: rowIcons.layout6633,
		attributes: {
			thumbnails: false,
			alignCells: true,
			align: 'full',
			images,
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
		title: __( 'Wide with Lightbox', 'coblocks' ),
		// icon: rowIcons.layout6633,
		attributes: {
			thumbnails: false,
			alignCells: true,
			align: 'wide',
			images,
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

const CarouselGalleryVariationPicker = ( props ) => {
	const blockType = useSelect( ( select ) => select( 'core/blocks' ).getBlockType( props.name ), [] );
	const registeredVariations = useSelect( ( select ) => select( 'core/blocks' ).getBlockVariations( props.name ) ?? null, [] );
	const defaultVariation = useSelect( ( select ) => select( 'core/blocks' ).getDefaultBlockVariation( props.name ) ?? null, [] );

	return ( <__experimentalBlockVariationPicker
		icon={ get( blockType, [ 'icon', 'src' ] ) }
		label={ get( blockType, [ 'title' ] ) }
		instructions={ __( 'Select a variation to start with.', 'coblocks' ) }
		variations={ registeredVariations }
		allowSkip
		onSelect={ ( nextVariation = defaultVariation ) => {
			if ( nextVariation.attributes ) {
				props.setAttributes( { ...nextVariation.attributes } );
			}
		} }
	/>
	);
};

export { CarouselGalleryVariationPicker, variations };
