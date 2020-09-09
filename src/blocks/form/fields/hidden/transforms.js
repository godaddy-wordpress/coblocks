/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-name', 'coblocks/field-date', 'coblocks/field-textarea', 'coblocks/field-phone', 'coblocks/field-text', 'coblocks/field-website' ],
			transform: ( attributes, innerBlocks ) => {
				return [
					createBlock( 'coblocks/field-hidden',  attributes, innerBlocks ),
				];
			},
		},
	],
};

export default transforms;
