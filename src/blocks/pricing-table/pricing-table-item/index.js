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
					console.log( attributes );

					const heading  = createBlock( 'core/paragraph', { content: attributes.title, align: 'center', style: { 'typography': { fontStyle: 'normal', fontWeight: '700', fontSize: 'medium' } } } );
					const price    = createBlock( 'core/paragraph', { content: '<sup>' + attributes.currency + '</sup>' + attributes.amount, align: 'center', style: { 'typography': { fontStyle: 'normal', fontSize: '5em' } } } );
					const features = attributes.features.map( function( feature ) {
						return createBlock( 'core/paragraph', { content: feature, align: 'center' } );
					} );

					const button = createBlock( 'core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, innerBlocks );

					return createBlock( 'core/column', attributes, [ heading, price, ...features, button ] );
				},
				type: 'block',
			},
		],
	},
};

export { name, metadata, settings };
