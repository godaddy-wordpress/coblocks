/**
 * WordPress dependencies
*/
import { __ } from '@wordpress/i18n';

const example = {
	attributes: {
		count: 2,
		contentAlign: 'center',
	},
	innerBlocks: [
	{
		name: 'coblocks/pricing-table-item',
		attributes: {
			title: __( 'Basic', 'coblocks' ),
			currency: '$',
			amount: '19',
			features: [
			{
				type: 'li',
				props: {
					children: [
						__( 'Feature one', 'coblocks' ),
					]
				}
			},
			{
				type: 'li',
				props: {
					children: [
						__( 'Feature two', 'coblocks' ),
					]
				}
			}
			]
		},
		innerBlocks: [
		{
			name: 'core/button',
			attributes: {
				text: __( 'Buy now', 'coblocks' ),
			}
		}
		]
	},
	{
		name: 'coblocks/pricing-table-item',
		attributes: {
			title: __( 'Pro', 'coblocks' ),
			currency: '$',
			amount: '49',
			features: [
			{
				type: 'li',
				props: {
					children: [
						__( 'Feature one', 'coblocks' ),
					]
				}
			},
			{
				type: 'li',
				props: {
					children: [
						__( 'Feature two', 'coblocks' ),
					]
				}
			}
			]
		},
		innerBlocks: [
		{
			name: 'core/button',
			attributes: {
				text: __( 'Buy now', 'coblocks' ),
			}
		}
		]
	},
	],
};

export default example;
