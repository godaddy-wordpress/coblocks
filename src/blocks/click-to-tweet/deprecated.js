/* eslint-disable sort-keys */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, getFontSizeClass, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { default as currentBlock } from './block.json';
import { deprecateTypographyControls } from '../../extensions/typography/deprecated';

const deprecated = [
	{
		attributes: {
			...currentBlock.attributes,
			url: {
				type: 'attribute',
			},
		},
		save( props ) {
			const {
				buttonColor,
				buttonText,
				customButtonColor,
				customTextColor,
				content,
				customFontSize,
				fontSize,
				textColor,
				textAlign,
				url,
				via,
			} = props.attributes;

			const viaUrl = via ? `&via=${ via }` : '';

			const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=${ url }${ viaUrl }`;

			const textColorClass = getColorClassName( 'color', textColor );

			const fontSizeClass = getFontSizeClass( fontSize );

			const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
				'has-text-color': textColor || customTextColor,
				[ fontSizeClass ]: fontSizeClass,
				[ textColorClass ]: textColorClass,
			} );

			const blockquoteClasses = classnames( { [ `has-text-align-${ textAlign }` ]: textAlign } );

			const textStyles = {
				fontSize: fontSizeClass ? undefined : customFontSize,
				color: textColorClass ? undefined : customTextColor,
			};

			const buttonColorClass = getColorClassName( 'background-color', buttonColor );

			const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
				'has-button-color': buttonColor || customButtonColor,
				[ buttonColorClass ]: buttonColorClass,
			} );

			const buttonStyles = {
				backgroundColor: buttonColorClass ? undefined : customButtonColor,
			};

			return (
				! RichText.isEmpty( content ) && (
					<blockquote className={ blockquoteClasses }>
						<RichText.Content
							className={ textClasses }
							style={ textStyles }
							tagName="p"
							value={ content }
						/>
						<RichText.Content
							className={ buttonClasses }
							href={ tweetUrl }
							rel="noopener noreferrer"
							style={ buttonStyles }
							tagName="a"
							target="_blank"
							value={ buttonText }
						/>
					</blockquote>
				)
			);
		},
	},
	{
		attributes: deprecateTypographyControls( currentBlock.attributes ),
		save( { attributes: saveAttributes } ) {
			const {
				buttonColor,
				buttonText,
				customButtonColor,
				customTextColor,
				content,
				customFontSize,
				fontSize,
				textColor,
				textAlign,
				via,
			} = saveAttributes;

			const viaUrl = via ? `&via=${ via }` : '';

			// See PHP filter render_block_coblocks/click-to-tweet for [post_permalink] token replacement.
			const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=[post_permalink]${ viaUrl }`;

			const textColorClass = getColorClassName( 'color', textColor );

			const fontSizeClass = getFontSizeClass( fontSize );

			const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
				'has-text-color': textColor || customTextColor,
				[ fontSizeClass ]: fontSizeClass,
				[ textColorClass ]: textColorClass,
			} );

			const blockquoteClasses = classnames( { [ `has-text-align-${ textAlign }` ]: textAlign } );

			const textStyles = {
				fontSize: fontSizeClass ? undefined : customFontSize,
				color: textColorClass ? undefined : customTextColor,
			};

			const buttonColorClass = getColorClassName( 'background-color', buttonColor );

			const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
				'has-button-color': buttonColor || customButtonColor,
				[ buttonColorClass ]: buttonColorClass,
			} );

			const buttonStyles = {
				backgroundColor: buttonColorClass ? undefined : customButtonColor,
			};

			return (
				! RichText.isEmpty( content ) && (
					<blockquote className={ blockquoteClasses }>
						<RichText.Content
							className={ textClasses }
							style={ textStyles }
							tagName="p"
							value={ content }
						/>
						<RichText.Content
							className={ buttonClasses }
							href={ tweetUrl }
							rel="noopener noreferrer"
							style={ buttonStyles }
							tagName="a"
							target="_blank"
							value={ buttonText }
						/>
					</blockquote>
				)
			);
		},
	},
	{
		attributes: currentBlock.attributes,
		save( props ) {
			const {
				buttonColor,
				buttonText,
				customButtonColor,
				customTextColor,
				content,
				customFontSize,
				fontSize,
				textColor,
				textAlign,
				url,
				via,
			} = props.attributes;

			const viaUrl = via ? `&via=${ via }` : '';

			const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=${ url }${ viaUrl }`;

			const textColorClass = getColorClassName( 'color', textColor );

			const fontSizeClass = getFontSizeClass( fontSize );

			const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
				'has-text-color': textColor || customTextColor,
				[ fontSizeClass ]: fontSizeClass,
				[ textColorClass ]: textColorClass,
			} );

			const textStyles = {
				fontSize: fontSizeClass ? undefined : customFontSize,
				color: textColorClass ? undefined : customTextColor,
			};

			const buttonColorClass = getColorClassName( 'background-color', buttonColor );

			const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
				'has-button-color': buttonColor || customButtonColor,
				[ buttonColorClass ]: buttonColorClass,
			} );

			const buttonStyles = {
				backgroundColor: buttonColorClass ? undefined : customButtonColor,
			};

			return (
				! RichText.isEmpty( content ) && (
					<blockquote style={ { textAlign } }>
						<RichText.Content
							className={ textClasses }
							style={ textStyles }
							tagName="p"
							value={ content }
						/>
						<RichText.Content
							className={ buttonClasses }
							href={ tweetUrl }
							rel="noopener noreferrer"
							style={ buttonStyles }
							tagName="a"
							target="_blank"
							value={ buttonText }
						/>
					</blockquote>
				)
			);
		},
	},
	{
		attributes: {
			...currentBlock.attributes,
			customFontSize: { type: 'number' },
			fontSize: { type: 'string' },
		},
		supports: {},
		save: ( props ) => {
			const { attributes: saveAttributes } = props;
			const {
				buttonColor,
				buttonText,
				customButtonColor,
				customTextColor,
				content,
				customFontSize,
				fontSize,
				textColor,
				textAlign,
				via,
			} = saveAttributes;

			const viaUrl = via ? `&via=${ via }` : '';

			// See PHP filter render_block_coblocks/click-to-tweet for [post_permalink] token replacement.
			const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=[post_permalink]${ viaUrl }`;

			const textColorClass = getColorClassName( 'color', textColor );

			const fontSizeClass = getFontSizeClass( fontSize );

			const textClasses = classnames( 'wp-block-coblocks-click-to-tweet__text', {
				'has-text-color': textColor || customTextColor,
				[ fontSizeClass ]: fontSizeClass,
				[ textColorClass ]: textColorClass,
			} );

			const blockquoteClasses = classnames( { [ `has-text-align-${ textAlign }` ]: textAlign } );

			const textStyles = {
				fontSize: fontSizeClass ? undefined : customFontSize,
				color: textColorClass ? undefined : customTextColor,
			};

			const buttonColorClass = getColorClassName( 'background-color', buttonColor );

			const buttonClasses = classnames( 'wp-block-coblocks-click-to-tweet__twitter-btn', {
				'has-button-color': buttonColor || customButtonColor,
				[ buttonColorClass ]: buttonColorClass,
			} );

			const buttonStyles = {
				backgroundColor: buttonColorClass ? undefined : customButtonColor,
			};

			return (
				! RichText.isEmpty( content ) && (
					<blockquote className={ blockquoteClasses }>
						<RichText.Content
							className={ textClasses }
							style={ textStyles }
							tagName="p"
							value={ content }
						/>
						<RichText.Content
							className={ buttonClasses }
							href={ tweetUrl }
							rel="noopener noreferrer"
							style={ buttonStyles }
							tagName="a"
							target="_blank"
							value={ buttonText }
						/>
					</blockquote>
				)
			);
		},
	},
];

export default deprecated;
