/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-checkbox', 'coblocks/field-radio' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock( 'coblocks/field-select', {
					label: __( 'Select', 'coblocks' ),
					options: attributes.options,
				}, innerBlocks );
			},
		},
	],
};

export default transforms;
