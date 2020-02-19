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
		slug: 'coblocks-galleries',
		title: __( 'Galleries', 'coblocks' ),
	},
	...getCategories().filter( ( { slug } ) => slug !== 'coblocks-galleries' ),
] );
