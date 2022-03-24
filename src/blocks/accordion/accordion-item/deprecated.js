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
import { default as currentBlock } from './block.json';

const deprecated = [
	{
		attributes: {
			...currentBlock.attributes,
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
							className={ titleClasses }
							style={ titleStyles }
							tagName="summary"
							value={ title }
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
	{
		attributes: {
			...currentBlock.attributes,
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
							className={ titleClasses }
							style={ titleStyles }
							tagName="summary"
							value={ title }
						/>
						<div className="wp-block-coblocks-accordion-item__content" style={ borderStyle } tabIndex="0">
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
