/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		attributes: {
			layout: {
				type: 'boxy',
			},
		},
		isActive: ( blockAttributes ) => ! blockAttributes.layout || blockAttributes.layout?.type === 'boxy',
		name: 'boxy',
		title: __( 'Boxy', 'coblocks' ),
	},
	{
		attributes: {
			layout: {
				type: 'conversation',
			},
		},
		isActive: ( blockAttributes ) => ! blockAttributes.layout || blockAttributes.layout?.type === 'conversation',
		name: 'conversation',
		title: __( 'Conversation', 'coblocks' ),
	},
	{
		attributes: {
			layout: {
				type: 'Horizontal',
			},
		},
		isActive: ( blockAttributes ) => ! blockAttributes.layout || blockAttributes.layout?.type === 'Horizontal',
		name: 'Horizontal',
		title: __( 'Horizontal', 'coblocks' ),
	},
];

export default variations;
