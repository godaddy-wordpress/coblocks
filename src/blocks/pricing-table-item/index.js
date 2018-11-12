/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, getColorClassName, InnerBlocks } = wp.editor;

/**
 * Block constants
 */
const name = 'pricing-table-item';

const title = __( 'Pricing Table Item' );

const icon = icons.pricing;

const keywords = [
	__( 'landing' ),
	__( 'comparison' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	title: {
		source: 'children',
		selector: '.wp-block-coblocks-pricing-table-item__title',
	},
	features: {
		source: 'children',
		selector: '.wp-block-coblocks-pricing-table-item__features',
	},
	currency: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-pricing-table-item__currency',
	},
	amount: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-pricing-table-item__amount',
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

	save( { attributes } ) {

		const {
			amount,
			columns,
			currency,
			customTableBackground,
			customTableColor,
			features,
			tableBackground,
			tableColor,
			title,
		} = attributes;

		const tableBackgroundClass = getColorClassName( 'background-color', tableBackground );
		const tableColorClass = getColorClassName( 'color', tableColor );

		const classes = classnames( {
				'has-background': tableBackground || customTableBackground,
				[ tableBackgroundClass ]: tableBackgroundClass,
				'has-text-color': tableColor || customTableColor,
				[ tableColorClass ]: tableColorClass,
			}
		);

		const styles = {
			backgroundColor: tableBackgroundClass ? undefined : customTableBackground,
			color: tableColorClass ? undefined : customTableColor,
		};

		return (
			<div
				className={ classes }
				style={ styles }
			>
				{ ! RichText.isEmpty( title ) && (
					<RichText.Content
						tagName="h4"
						className="wp-block-coblocks-pricing-table-item__title"
						value={ title }
					/>
				) }
				{ ! RichText.isEmpty( amount ) && (
					<div className={ 'wp-block-coblocks-pricing-table-item__price-wrapper' }>
						{ ! RichText.isEmpty( currency ) && (
							<RichText.Content
								tagName="span"
								className="wp-block-coblocks-pricing-table-item__currency"
								value={ currency }
							/>
						) }
						<RichText.Content
							tagName="h5"
							className="wp-block-coblocks-pricing-table-item__amount"
							value={ amount }
						/>
					</div>
				) }
				{ ! RichText.isEmpty( features ) && (
					<RichText.Content
						tagName="ul"
						className="wp-block-coblocks-pricing-table-item__features"
						value={ features }
					/>
				) }
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
