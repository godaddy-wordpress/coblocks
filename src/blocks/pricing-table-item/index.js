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

		const tableClasses = classnames( {
				'has-background': tableBackground || customTableBackground,
				[ tableBackgroundClass ]: tableBackgroundClass,
			}
		);

		const tableStyle = {
			backgroundColor: tableBackgroundClass ? undefined : customTableBackground,
			color: tableColorClass ? undefined : customTableColor,
		};

		const textClasses = classnames( {
				'has-text-color': tableColor || customTableColor,
				[ tableColorClass ]: tableColorClass,
			}
		);

		const textStyle = {
			color: tableColorClass ? undefined : customTableColor,
		};

		return (
			<div
				className={ tableClasses }
				style={ tableStyle }
			>
				{ ! RichText.isEmpty( title ) && (
					<RichText.Content
						tagName="h4"
						className={ classnames( 'pricing-table__title', textClasses ) }
						value={ title }
						style={ textStyle }
					/>
				) }
				{ ! RichText.isEmpty( amount ) && (
					<div className={ 'pricing-table__price' }>
						{ ! RichText.isEmpty( currency ) && (
							<RichText.Content
								tagName="span"
								className={ classnames( 'pricing-table__currency', textClasses ) }
								value={ currency }
								style={ textStyle }
							/>
						) }
						<RichText.Content
							tagName="h5"
							className={ classnames( 'pricing-table__amount', textClasses ) }
							value={ amount }
							style={ textStyle }
						/>
					</div>
				) }
				{ ! RichText.isEmpty( features ) && (
					<RichText.Content
						tagName="ul"
						className={ classnames( 'pricing-table__features', textClasses ) }
						value={ features }
						style={ textStyle }
					/>
				) }
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
