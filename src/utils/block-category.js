/**
 * WordPress dependencies
 */
const { getCategories, setCategories } = wp.blocks;

/**
 * Internal dependencies
 */
import icons from './icons';

setCategories( [
	// Add a CoBlocks block category
	{
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: icons.logo,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks' ),
] );
