/**
 * WordPress dependencies
 */
import { getCategories, setCategories } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

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
		/* translators: %s: Plugin title, i.e. CoBlocks */
		title: sprintf( __( '%s Galleries', 'coblocks' ), 'CoBlocks' ),
		icon: brandAssets.categoryIcon,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks-galleries' ),
] );
