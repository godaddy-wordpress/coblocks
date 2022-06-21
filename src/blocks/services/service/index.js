import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const { name, category, attributes: serviceAttributes } = metadata;

const settings = {
	attributes: serviceAttributes,
	edit: () => null,
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					const formattedInnerBlocks = [ ...innerBlocks ];

					const imageBlockAttributes = {
						align: 'full',
						className: 'is-style-service',
					};

					if ( attributes.imageUrl ) {
						const imageBlock = createBlock( 'core/image', { url: attributes.imageUrl, ...imageBlockAttributes } );
						formattedInnerBlocks.unshift( imageBlock );
					} else {
						const imageBlock = createBlock( 'core/image', { url: '', ...imageBlockAttributes } );
						formattedInnerBlocks.unshift( imageBlock );
					}

					return createBlock( 'core/column', attributes, formattedInnerBlocks );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };
