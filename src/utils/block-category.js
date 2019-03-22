/**
 * WordPress dependencies
 */
const { getCategories, setCategories } = wp.blocks;

/**
 * Internal dependencies
 */
import brandAssets from './brand-assets';

setCategories( [
	// Add a CoBlocks block category
	{
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: brandAssets.categoryIcon,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks' ),
] );
