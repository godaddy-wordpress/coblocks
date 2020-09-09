/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-select', 'coblocks/field-checkbox' ],
			transform: ( attributes, innerBlocks ) => {
				return [
					createBlock( 'coblocks/field-radio',  attributes, innerBlocks ),
				];
			},
		},
	],
};

export default transforms;
