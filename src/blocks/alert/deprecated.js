/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';

const deprecated = [
	{
		attributes: {
			...currentBlock.attributes,
			borderColor: {
				type: 'string',
			},
			customBorderColor: {
				type: 'string',
			},
			type: {
				type: 'string',
				default: 'default',
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
				textAlign,
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
	{
		attributes: currentBlock.attributes,
		save( { attributes } ) {
			const {
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textAlign,
				textColor,
				title,
				value,
			} = attributes;

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const textClass = getColorClassName( 'color', textColor );

			const classes = classnames( {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customTextColor,
				textAlign: textAlign ? textAlign : null,
			};

			return (
				<div
					className={ classes }
					style={ styles }
				>
					{ ! RichText.isEmpty( title ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__title"
						value={ title }
					/>
					}
					{ ! RichText.isEmpty( value ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__text"
						value={ value }
					/>
					}
				</div>
			);
		},
	},
	{
		attributes: currentBlock.attributes,
		save( { attributes } ) {
			const {
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textAlign,
				textColor,
				title,
				value,
			} = attributes;

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const textClass = getColorClassName( 'color', textColor );

			const classes = classnames( {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				[ `has-text-align-${ textAlign }` ]: textAlign,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customTextColor,
			};

			return (
				<div
					className={ classes }
					style={ styles }
				>
					{ ! RichText.isEmpty( title ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__title"
						value={ title }
					/>
					}
					{ ! RichText.isEmpty( value ) &&
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-alert__text"
						value={ value }
					/>
					}
				</div>
			);
		},
	},
];

export default deprecated;
