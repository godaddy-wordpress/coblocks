/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { attributes as blockAttributes } from './block.json';

const deprecated = [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes } ) {
			const {
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				open,
				textColor,
				borderColor,
				title,
			} = attributes;

			const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );
			const textColorClass = getColorClassName( 'color', textColor );

			const titleClasses = classnames(
				'wp-block-coblocks-accordion-item__title', {
					'has-background': backgroundColor || customBackgroundColor,
					[ backgroundColorClass ]: backgroundColorClass,
					'has-text-color': textColor || customTextColor,
					[ textColorClass ]: textColorClass,
				} );

			const titleStyles = {
				backgroundColor: backgroundColorClass ? undefined : customBackgroundColor,
				color: textColorClass ? undefined : customTextColor,
			};

			const borderStyle = {
				borderColor: borderColor ? borderColor : customBackgroundColor,
			};

			return (
				<div>
					{ ! RichText.isEmpty( title ) &&
					<details open={ open }>
						<RichText.Content
							tagName="summary"
							className={ titleClasses }
							value={ title }
							style={ titleStyles }
						/>
						<div className="wp-block-coblocks-accordion-item__content" style={ borderStyle }>
							<InnerBlocks.Content />
						</div>
					</details>
					}
				</div>
			);
		},
	},
];

export default deprecated;
