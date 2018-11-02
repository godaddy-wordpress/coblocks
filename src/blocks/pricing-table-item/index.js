/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import PricingTable from './components/pricing-table';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'pricing-table-item';

const title = __( 'Pricing Table Item' );

const icon = icons.accordion;

const keywords = [
	__( 'landing' ),
	__( 'comparison' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	title: {
		source: 'children',
		selector: '.pricing-table__title',
	},
	features: {
		source: 'children',
		selector: '.pricing-table__features',
	},
	currency: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__currency',
	},
	amount: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__amount',
	},
	tableBackground: {
		type: 'string',
	},
	tableColor: {
		type: 'string',
	},
	customTableBackground: {
		type: 'string',
	},
	customTableColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'A column placed within the pricing table block.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	parent: [ 'coblocks/pricing-table' ],

	attributes: blockAttributes,

	transforms: {
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
	},

	edit: Edit,

	save: function( props ) {

		const {
			amount,
			columns,
			currency,
			features,
			title,
		} = props.attributes;

		return (
			<PricingTable { ...props }
				amount={ amount }
				currency={ currency }
				features={ features }
				title={ title }
			>
			</PricingTable>
		);
	},
};

export { name, title, icon, settings };