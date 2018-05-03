/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import PricingTable from './components/pricing-table';
import PricingTableBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/pricing-table', {

	title: __( 'Pricing Table' ),

	description: __( 'Add pricing tables.' ),

	icon: 'editor-table',

	category: 'layout',

	keywords: [
		__( 'landing' ),
		__( 'comparison' ),
		__( 'coblocks' ),
	],

	attributes: {
		title: {
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__title',
		},
		features: {
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__features',
			default: [],
		},
		currency: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__currency',
		},
		amount: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__amount',
		},
		button: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__button',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			selector: '.pricing-table__item--1 .pricing-table__button',
		},
		title_2: {
			source: 'children',
			selector: '.pricing-table__item--2 .pricing-table__title',
		},
		features_2: {
			source: 'children',
			selector: '.pricing-table__item--2 .pricing-table__features',
			default: [],
		},
		currency_2: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--2 .pricing-table__currency',
		},
		amount_2: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--2 .pricing-table__amount',
		},
		button_2: {
			type: 'array',
			source: 'children',
			selector: '.pricing-table__item--2 .pricing-table__button',
		},
		url_2: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
			selector: '.pricing-table__item--2 .pricing-table__button',
		},
		layout: {
			type: 'string',
		},
		align: {
			type: 'string',
			default: 'center',
		},
		columns: {
			type: 'number',
			default: 2,
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
	},

	edit: PricingTableBlock,

	save: function( props ) {

		const {
			align,
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			features,
			features_2,
			layout,
			tableBackground,
			tableColor,
			title,
			title_2,
			url,
			url_2,
		} = props.attributes;

		return (

			<div
				className={ props.className + ' pricing-table pricing-table--' + columns + ' pricing-table--' + align }
				style={ {
					textAlign: align
				} }
			>
				<PricingTable { ...props }
					amount={ amount }
					button={ button }
					className={ 'pricing-table__item pricing-table__item--1' }
					currency={ currency }
					features={ features }
					title={ title }
					url={ url }
				>
				</PricingTable>
				{ columns >= 2 && (
					<PricingTable { ...props }
						amount={ amount_2 }
						button={ button_2 }
						className={ 'pricing-table__item pricing-table__item--2' }
						currency={ currency_2 }
						features={ features_2 }
						title={ title_2 }
						url={ url_2 }
					>
					</PricingTable>
				) }
			</div>
		);
	},
} );
