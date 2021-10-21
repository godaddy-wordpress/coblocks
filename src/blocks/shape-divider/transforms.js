/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'prefix',
			prefix: ':divider',
			transform() {
				return createBlock( metadata.name );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/spacer' ],
			transform: ( { height } ) => createBlock( metadata.name, {
				shapeHeight: height,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'coblocks/dynamic-separator' ],
			transform: ( { height } ) => createBlock( metadata.name, {
				shapeHeight: height,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/separator' ],
			transform: () => createBlock( metadata.name ),
		},
	],
};

export default transforms;
