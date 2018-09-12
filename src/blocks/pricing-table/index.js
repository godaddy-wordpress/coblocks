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
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	count: {
		type: 'number',
		default: 2,
	},
	contentAlign: {
  		type: 'string',
  		default: 'center',
  	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/pricing-table', {

	title: __( 'Pricing Table' ),

	description: __( 'Add pricing tables.' ),

	icon: icons.pricing,

	category: 'coblocks',

	keywords: [
		__( 'landing' ),
		__( 'comparison' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

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
			contentAlign,
			count,
		} = props.attributes;

		const classes = classnames(
			props.className,
			`has-${ count }-columns`,
			`pricing-table--${ contentAlign }`,
		);

		return (

			<div
				className={ classes }
				style={ { textAlign: contentAlign ? contentAlign : null } }
			>
				<div className="wp-block-coblocks-pricing-table__inner">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
