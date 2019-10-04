/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/**
 * Internal dependencies
 */
import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/spacer' ],
			transform: ( { height } ) => createBlock( metadata.name, {
				height: height,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/separator' ],
			transform: () => createBlock( metadata.name ),
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/spacer' ],
			transform: ( { height } ) => createBlock( 'core/spacer', {
				height: height,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/separator' ],
			transform: () => createBlock( 'core/separator' ),
		},
	],
};

export default transforms;
