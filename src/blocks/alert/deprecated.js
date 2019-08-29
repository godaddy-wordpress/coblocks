/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText, getColorClassName } = wp.blockEditor;

/**
 * Internal dependencies
 */
import { attributes } from './';

const deprecated = [
	{
		attributes: {
			...attributes,
			borderColor: {
				type: 'string',
			},
			customBorderColor: {
				type: 'string',
			},
		},

		save( { attributes, className } ) {
			const {
				align,
				backgroundColor,
				borderColor,
				customBackgroundColor,
				customBorderColor,
				customTextColor,
				customTitleColor,
				textAlign,
				textColor,
				title,
				titleColor,
				type,
				value,
			} = attributes;

			// Background color class and styles.
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const borderClass = getColorClassName( 'border-color', borderColor );

			const backgroundClasses = classnames(
				className,
				`is-${ type }-alert`,
				`align${ align }`, {
					'has-background': backgroundColor || customBackgroundColor,
					[ backgroundClass ]: backgroundClass,
					[ borderClass ]: borderClass,
				} );

			const backgroundStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				borderColor: customBorderColor,
				textAlign: textAlign,
			};

			// Title color class and styles.
			const titleClass = getColorClassName( 'color', titleColor );

			const titleClasses = classnames(
				className,
				'wp-block-coblocks-alert__title', {
					'has-text-color': titleColor || customTitleColor,
					[ titleClass ]: titleClass,
				} );

			const titleStyles = {
				color: titleClass ? undefined : customTitleColor,
			};

			// Text color class and styles.
			const textClass = getColorClassName( 'color', textColor );

			const textClasses = classnames(
				'wp-block-coblocks-alert__text', {
					'has-text-color': textColor || customTextColor,
					[ textClass ]: textClass,
				} );

			const textStyles = {
				color: textClass ? undefined : customTextColor,
			};

			return (
				<div
					className={ backgroundClasses }
					style={ backgroundStyles }
				>
					{ ! RichText.isEmpty( title ) &&
					<RichText.Content
						tagName="p"
						className={ titleClasses }
						value={ title }
						style={ titleStyles }
					/>
					}
					{ ! RichText.isEmpty( value ) &&
					<RichText.Content
						tagName="p"
						className={ textClasses }
						value={ value }
						style={ textStyles }
					/>
					}
				</div>
			);
		},
	},
];

export default deprecated;
