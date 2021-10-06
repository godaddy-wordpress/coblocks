/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
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
				<div className="wp-block-coblocks-accordion-item__content" style={ borderStyle } tabIndex="0">
					<InnerBlocks.Content />
				</div>
			</details>
			}
		</div>
	);
};

export default save;
