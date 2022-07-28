/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			blocks: [ 'coblocks/field-date', 'coblocks/field-textarea', 'coblocks/field-phone', 'coblocks/field-text', 'coblocks/field-website', 'coblocks/field-hidden' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock( 'coblocks/field-name', {
					label: __( 'Name', 'coblocks' ),
				}, innerBlocks );
			},
			type: 'block',
		},
	],
};

export default transforms;
