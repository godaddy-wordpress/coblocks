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
const { registerBlockType } = wp.blocks;

/**
 * Block attributes
 */
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
	button: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__button',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__button',
	},
	tableBackground: {
		type: 'string',
	},
	tableColor: {
		type: 'string',
	},
	buttonBackground: {
		type: 'string',
	},
	buttonColor: {
		type: 'string',
	},
	customTableBackground: {
		type: 'string',
	},
	customTableColor: {
		type: 'string',
	},
	customButtonBackground: {
		type: 'string',
	},
	custombButtonColor: {
		type: 'string',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/pricing-table-item', {

	title: __( 'Pricing Table Item' ),

	description: __( 'A column placed within the pricing table block.' ),

	icon: icons.pricing,

	category: 'coblocks',

	keywords: [
		__( 'landing' ),
		__( 'comparison' ),
		__( 'coblocks' ),
	],

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
			button,
			columns,
			currency,
			features,
			title,
			url,
		} = props.attributes;

		return (
			<PricingTable { ...props }
				amount={ amount }
				button={ button }
				currency={ currency }
				features={ features }
				title={ title }
				url={ url }
			>
			</PricingTable>
		);
	},
} );
