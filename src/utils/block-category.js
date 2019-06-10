/**
 * WordPress dependencies
 */
const { getCategories, setCategories } = wp.blocks;
const { __, sprintf } = wp.i18n;

/**
 * Internal dependencies
 */
import brandAssets from './brand-assets';

setCategories( [
	{
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: brandAssets.categoryIcon,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks' ),
	{
		slug: 'coblocks-galleries',
		title: __( 'Gallery Blocks' ),
		icon: brandAssets.categoryIcon,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks-galleries' ),
] );