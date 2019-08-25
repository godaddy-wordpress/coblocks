const transforms = {
	from: [
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-pricing-table',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-pricing-table' ],
				},
			},
		},
	],
};

export default transforms;
