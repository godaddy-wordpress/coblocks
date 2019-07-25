/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './components/edit';
import icons from './../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.pricing;

const settings = {
	title: __( 'Pricing Table' ),
	description: __( 'Add pricing tables.' ),
	keywords: [ __( 'landing' ), __( 'comparison' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
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
	edit,
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

export { name, icon, settings };
