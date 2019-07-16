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
const { createBlock } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'pricing-table';

const title = __( 'Pricing Table' );

const icon = icons.pricing;

const keywords = [
	__( 'landing' ),
	__( 'comparison' ),
	__( 'coblocks' ),
];

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

const settings = {

	title: title,

	description: __( 'Add pricing tables.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		html: false,
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
			{
				type: 'prefix',
				prefix: ':pricing',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save( { attributes } ) {

		const {
			contentAlign,
			count,
		} = attributes;

		const classes = classnames(
			`has-${ count }-columns`,
			`has-${ contentAlign }-content`,
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
};

export { name, title, icon, settings };

