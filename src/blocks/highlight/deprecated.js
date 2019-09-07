/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName, getFontSizeClass } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';
const { attributes } = metadata;

const deprecated = [
	{
		attributes: {
			...attributes,
			content: {
				type: 'string',
				source: 'html',
				selector: 'mark',
			},
		},
		save( { attributes } ) {
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
				fontSize: fontSizeClass ? undefined : customFontSize,
			};

			return RichText.isEmpty( content ) ? null : (
				<p style={ { textAlign: align } }>
					<RichText.Content
						tagName="mark"
						className={ classes }
						style={ styles }
						value={ content }
					/>
				</p>
			);
		},
	},
];

export default deprecated;
