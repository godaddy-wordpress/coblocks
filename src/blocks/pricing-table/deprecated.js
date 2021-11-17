/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';

const deprecated = [
	{
		attributes: currentBlock.attributes,
		save( { attributes } ) {
			const {
				contentAlign,
				count,
			} = attributes;

			const classes = classnames(
				`has-${ count }-columns`,
				{ [ `has-text-align-${ contentAlign }` ]: contentAlign }
			);

			return (

				<div className={ classes }>
					<div className="wp-block-coblocks-pricing-table__inner">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: currentBlock.attributes,
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
	},
];

export default deprecated;
