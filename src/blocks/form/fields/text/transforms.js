/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-name', 'coblocks/field-date', 'coblocks/field-textarea', 'coblocks/field-phone', 'coblocks/field-website', 'coblocks/field-hidden' ],
			transform: ( attributes, innerBlocks ) => {
				return [
					createBlock( 'coblocks/field-text',  attributes, innerBlocks ),
				];
			},
		},
	],
};

export default transforms;
