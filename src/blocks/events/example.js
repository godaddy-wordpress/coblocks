/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const example = {
	attributes: {},
	innerBlocks: [
		{
			name: 'coblocks/events',
			attributes: {},
			innerBlocks: [
				{
					name: 'coblocks/event-item',
					attributes: {
						title: __( 'Soccer Practice', 'coblocks' ),
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat convallis porta.',
						eventDay: '21',
						eventMonth: __( 'April', 'coblocks' ),
						eventYear: '2021',
						eventTime: __( '10:30 AM', 'coblocks' ),
						eventLocation: __( 'Middle School', 'coblocks' ),
					},
				},
				{
					name: 'coblocks/event-item',
					attributes: {
						title: __( 'Soccer Practice', 'coblocks' ),
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat convallis porta.',
						eventDay: '21',
						eventMonth: __( 'April', 'coblocks' ),
						eventYear: '2021',
						eventTime: __( '10:30 AM', 'coblocks' ),
						eventLocation: __( 'Middle School', 'coblocks' ),
					},
				},
			],
		},
	],
};

export default example;
