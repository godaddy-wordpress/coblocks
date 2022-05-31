/**
 * External dependencies
 */
import { GalleryOffsetIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { BLOCK_VARIATION_GALLERY_OFFSET } from '../../block-variations/core/gallery';
import deprecated from './deprecated';
// import edit from './edit';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { createBlock, switchToBlockType } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category } = metadata;

// const attributes = {
// 	...GalleryAttributes,
// 	...metadata.attributes,
// 	gutter: {
// 		type: 'string',
// 		default: 'small',
// 	},
// };

function Edit( { clientId } ) {
	const { replaceBlocks } = useDispatch( 'core/block-editor' );
	const { getBlock } = useSelect( ( select ) => select( 'core/block-editor' ) );

	replaceBlocks(
		[ clientId ],
		switchToBlockType( getBlock( clientId ), 'core/gallery' )
	);

	return null;
}

const settings = {
	/* translators: block name */
	title: __( 'Offset', 'coblocks' ),
	// parent: [],
	/* translators: block description */
	// description: __( 'Display images in an offset brick pattern gallery.', 'coblocks' ),
	// category: hasFormattingCategory ? 'coblocks-galleries' : 'media',
	// icon: <Icon icon={ icon } />,
	// keywords: [
	// 	'coblocks',
	// 	/* translators: block keyword */
	// 	__( 'gallery', 'coblocks' ),
	// 	/* translators: block keyword */
	// 	__( 'photos', 'coblocks' ),
	// ],
	// supports: {
	// 	align: [ 'wide', 'full' ],
	// 	gutter: {
	// 		default: 'small',
	// 	},
	// },
	// example: {
	// 	attributes: {
	// 		gutter: 'small',
	// 		images: [
	// 			{ index: 0, url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg' },
	// 			{ index: 1, url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg' },
	// 			{ index: 2, url: 'https://s.w.org/images/core/5.3/Biologia_Centrali-Americana_-_Cantorchilus_semibadius_1902.jpg' },
	// 			{ index: 3, url: 'https://s.w.org/images/core/5.3/Glacial_lakes,_Bhutan.jpg' },
	// 		],
	// 	},
	// },
	transforms: {
		to: [
			{
				blocks: [ 'core/gallery' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock(
						'core/gallery',
						Object.assign( {}, BLOCK_VARIATION_GALLERY_OFFSET.attributes, attributes ),
						innerBlocks
					);
				},
				type: 'block',
			},
		],
	},
	edit: Edit,
	save: () => <InnerBlocks.Content />,
};

export { name, category, metadata, settings };
