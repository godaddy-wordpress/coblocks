/**
 * WordPress dependencies
 */
import { getCategories, setCategories, registerBlockCollection } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import brandAssets from './brand-assets';
import { supportsCollections } from './block-helpers';

const categories = [
	{
		slug: 'coblocks-galleries',
		title: __( 'Galleries', 'coblocks' ),
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks-galleries' ),
];

/**
 * Function to register a block collection for our blocks.
 */
if ( supportsCollections() ) {
	registerBlockCollection( 'coblocks', {
		title: 'CoBlocks',
		icon: brandAssets.categoryIcon,
	} );
} else {
	categories.unshift( {
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: brandAssets.categoryIcon,
	}, );
}

setCategories( categories );
