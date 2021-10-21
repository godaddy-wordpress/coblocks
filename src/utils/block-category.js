/**
 * WordPress dependencies
 */
import { getCategories, setCategories, registerBlockCollection } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { supportsCollections } from './block-helpers';
import { CoblocksIcon } from '@godaddy-wordpress/coblocks-icons';

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
		icon: CoblocksIcon,
	} );
} else {
	categories.unshift( {
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: CoblocksIcon,
	}, );
}

setCategories( categories );
