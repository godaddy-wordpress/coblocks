/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/field-select', 'coblocks/field-checkbox' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock( 'coblocks/field-radio', {
					label: __( 'Choose one', 'coblocks' ),
					options: attributes.options,
				}, innerBlocks );
			},
		},
	],
};

export default transforms;
