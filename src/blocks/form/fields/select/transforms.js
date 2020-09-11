/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-checkbox', 'coblocks/field-radio' ],
			transform: ( attributes, innerBlocks ) => {
				return [
					createBlock( 'coblocks/field-select',  attributes, innerBlocks ),
				];
			},
		},
	],
};

export default transforms;
