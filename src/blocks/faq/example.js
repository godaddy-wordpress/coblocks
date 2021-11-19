/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const example = {
	attributes: {},
	innerBlocks: [
		{
			attributes: {},
			innerBlocks: [
				{
					attributes: {
						className: 'wp-block-coblocks-faq__title',
						content: __( 'FAQ', 'coblocks' ),
						level: 3,
					},
					name: 'core/heading',
				},
				{
					attributes: {
						answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat convallis porta.',
						question: __( 'I am sick and I need to visit my doctor today. Can I get a priority appointment?', 'coblocks' ),
					},
					name: 'coblocks/faq-item',
				},
				{
					attributes: {
						answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat convallis porta.',
						question: __( 'When can I get my lab results?', 'coblocks' ),
					},
					name: 'coblocks/faq-item',
				},
			],
			name: 'coblocks/faq',
		},
	],
};

export default example;
