/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
			gutter: {
				type: 'string',
				default: 'medium',
			},
			stacked: {
				type: 'boolean',
				default: false,
			},
		},
		save( { attributes, className } ) {
			const {
				gutter,
				stacked,
				contentAlign,
				isStackedOnMobile,
			} = attributes;

			const innerClasses = classnames(
				'wp-block-coblocks-buttons__inner', {
					[ `flex-align-${ contentAlign }` ]: contentAlign,
					[ `has-${ gutter }-gutter` ]: gutter,
					'is-stacked': stacked,
					'is-stacked-on-mobile': isStackedOnMobile,
				}
			);

			return (
				<div className={ className }>
					<div className={ innerClasses }>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
