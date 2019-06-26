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
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, getColorClassName, InnerBlocks } = wp.blockEditor;

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
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'A column placed within the pricing table block.' ),

	keywords: keywords,

	parent: [ 'coblocks/pricing-table' ],

	supports: {
		inserter: false,
	},

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
			customBackgroundColor,
			customTextColor,
			features,
			backgroundColor,
			textColor,
			title,
		} = attributes;

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const textColorClass = getColorClassName( 'color', textColor );

		const classes = classnames( {
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
				'has-text-color': textColor || customTextColor,
				[ textColorClass ]: textColorClass,
			}
		);

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textColorClass ? undefined : customTextColor,
		};

		return (
			<div
				className={ classes }
				style={ styles }
			>
				{ ! RichText.isEmpty( title ) && (
					<RichText.Content
						tagName="span"
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
							tagName="span"
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
