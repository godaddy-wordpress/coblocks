import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const { name, category, attributes } = metadata;

const settings = {
	attributes,
	edit: () => null,
	parent: [],
	save: () => null,
	title: metadata.title,
	transforms: {
		to: [
			{
				blocks: [ 'core/column' ],
				transform: ( attributes, innerBlocks ) => {
					console.log( 'creating inner blocks here', {
						attributes,
						innerBlocks,
					} );
					return createBlock( 'core/column', attributes, innerBlocks );
				},
				type: 'block',
			},
		],
	},
};

export { name, category, metadata, settings };
