/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name } = metadata;

const settings = {
	edit: () => null,
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					const heading = createBlock( 'core/paragraph', { align: 'center', content: attributes.title ?? '', style: { typography: { fontSize: 'medium', fontStyle: 'normal', fontWeight: '700' } } } );
					const price = createBlock( 'core/paragraph', { align: 'center', content: '<sup>' + ( attributes.currency ?? '' ) + '</sup>' + attributes.amount ?? '', style: { typography: { fontSize: '5em', fontStyle: 'normal' } } } );

					const features = !! attributes.features ? attributes.features.map( function( feature ) {
						return createBlock( 'core/paragraph', { align: 'center', content: feature ? feature : '' } );
					} ) : [ createBlock( 'core/paragraph', { align: 'center', content: '' } ) ];

					const button = createBlock( 'core/buttons', { layout: { justifyContent: 'center', type: 'flex' } }, innerBlocks );

					return createBlock( 'core/column', attributes, [ heading, price, ...features, button ] );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };
