/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const example = {
	attributes: {},
	innerBlocks: [
		{
			name: 'coblocks/service',
			attributes: {
				imageUrl: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg',
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						content: __( 'Design', 'coblocks' ),
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'We allow beautiful design to unfold as a reflection of a project’s unique vision, desires, and place in the landscape.', 'coblocks' ),
					},
				},
			],
		},
		{
			name: 'coblocks/service',
			attributes: {
				imageUrl: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg',
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						content: __( 'Landscape', 'coblocks' ),
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'We believe that the best innovative landscape architecture is a blend of both art and science, with a touch of wild.', 'coblocks' ),
					},
				},
			],
		},
	],
};

export default example;
