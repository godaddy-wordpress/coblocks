/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { getCategories, setCategories, registerBlockCollection } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { CoblocksIcon } from '@godaddy-wordpress/coblocks-icons';
import { getBlockIconColor } from './helper';
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
		icon: <Icon icon={ CoblocksIcon } style={ { color: getBlockIconColor() } } />,
	} );
} else {
	categories.unshift( {
		slug: 'coblocks',
		title: 'CoBlocks',
		icon: <Icon icon={ CoblocksIcon } style={ { color: getBlockIconColor() } } />,
	}, );
}

setCategories( categories );
