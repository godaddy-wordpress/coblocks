/**
 * WordPress dependencies
 */
import { getCategories, setCategories, registerBlockCollection } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { supportsCollections } from './block-helpers';
import CoBlocksIcon from '@godaddy-wordpress/coblocks-icons';

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
		icon: CoBlocksIcon,
	} );
} else {
	categories.unshift( {
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: CoBlocksIcon,
	}, );
}

setCategories( categories );
