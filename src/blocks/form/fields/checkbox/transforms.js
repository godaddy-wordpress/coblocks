/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-select', 'coblocks/field-radio' ],
			transform: ( attributes, innerBlocks ) => {
				return [
					createBlock( 'coblocks/field-checkbox',  attributes, innerBlocks ),
				];
			},
		},
	],
};

export default transforms;
