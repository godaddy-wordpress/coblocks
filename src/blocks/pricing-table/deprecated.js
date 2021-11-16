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
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

const deprecated = [
	{
		attributes: currentBlock.attributes,
		save( { attributes } ) {
			const {
				contentAlign,
				count,
			} = attributes;

			const classes = classnames(
				{
					[ `has-text-align-${ contentAlign }` ]: contentAlign,
				}
			);

			const innerClasses = classnames( 'wp-block-coblocks-pricing-table__inner',
				{
					'has-columns': count > 1,
					[ `has-${ count }-columns` ]: count,
					'has-responsive-columns': count > 1,
				}
			);

			return (
				<div className={ classes }>
					<GutterWrapper { ...attributes } >
						<div className={ innerClasses }>
							<InnerBlocks.Content />
						</div>
					</GutterWrapper>
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
