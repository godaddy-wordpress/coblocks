/**
 * Internal dependencies
 */
import { name } from './';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/spacer' ],
			transform: ( { height } ) => createBlock( `coblocks/${ name }`, {
				height: height,
			} ),
		},
		{
			type: 'block',
			blocks: [ 'core/separator' ],
			transform: () => createBlock( `coblocks/${ name }` ),
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
