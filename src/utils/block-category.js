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
	{
		slug: 'coblocks-galleries',
		title: sprintf( __( '%s Galleries' ), 'CoBlocks' ),
		icon: brandAssets.categoryIcon,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks-galleries' ),
] );