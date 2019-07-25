/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './components/edit';
import icons from './../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.blockEditor;
const { split, create, toHTMLString } = wp.richText;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.twitter;

const settings = {
	title: __( 'Click to Tweet' ),
	description: __( 'Add a quote for readers to tweet via Twitter.' ),
	keywords:  [ __( 'share' ), __( 'twitter' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => createBlock( `coblocks/${ name }`, {
					content: content,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ( { value } ) => {
					const pieces = split( create( { html: value, multilineTag: 'p' } ), '\u2028' );

					return [
						createBlock( `coblocks/${ name }`, {
							content: toHTMLString( { value: pieces[ 0 ] } ),
						} ),
					];
				},
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( { value } ) => {
					const pieces = split( create( { html: value, multilineTag: 'p' } ), '\u2028' );

					return [
						createBlock( `coblocks/${ name }`, {
							content: toHTMLString( { value: pieces[ 0 ] } ),
						} ),
					];
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => createBlock( 'core/paragraph', {
					content: content,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ( { content } ) => createBlock( 'core/pullquote', {
					value: `<p>${ content }</p>`,
				} ),
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( { content } ) => createBlock( 'core/quote', {
					value: `<p>${ content }</p>`,
				} ),
			},
		],
	},
	edit,
	save( { attributes } ) {
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
		} = attributes;

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
				<blockquote style={ { textAlign: textAlign } }>
					<RichText.Content
						tagName="p"
						className={ textClasses }
						style={ textStyles }
						value={ content }
					/>
					<RichText.Content
						tagName="a"
						className={ buttonClasses }
						style={ buttonStyles }
						value={ buttonText }
						href={ tweetUrl }
						target="_blank"
						rel="noopener noreferrer"
					/>
				</blockquote>
			)
		);
	},
};

export { name, icon, settings };
