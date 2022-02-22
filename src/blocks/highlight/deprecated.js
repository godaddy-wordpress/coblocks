/* eslint-disable sort-keys */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, getFontSizeClass, RichText } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'mark',
			},
			align: {
				type: 'string',
			},
			backgroundColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			fontSize: {
				type: 'string',
			},
			customFontSize: {
				type: 'number',
			},
		},
		save: ( { attributes } ) => {
			const {
				backgroundColor,
				content,
				customBackgroundColor,
				customFontSize,
				customTextColor,
				fontSize,
				align,
				textColor,
			} = attributes;

			const textClass = getColorClassName( 'color', textColor );

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			const fontSizeClass = getFontSizeClass( fontSize );

			const classes = classnames( 'wp-block-coblocks-highlight__content', {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
				[ fontSizeClass ]: fontSizeClass,
			} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customTextColor,
				fontSize: customFontSize ?? undefined,
			};

			return RichText.isEmpty( content ) ? null : (
				<p style={ {
					textAlign: align,
					fontSize: customFontSize ?? undefined,
				} }>
					<RichText.Content
						className={ classes }
						style={ styles }
						tagName="mark"
						value={ content }
					/>
				</p>
			);
		},

	},
];

export default deprecated;
