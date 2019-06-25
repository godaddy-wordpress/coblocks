/**
 * External dependencies
 */
import get from 'lodash/get';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.blockEditor;
const { join, split, create, toHTMLString } = wp.richText;

/**
 * Block constants
 */
const name = 'click-to-tweet';

const title = __( 'Click to Tweet' );

const icon = icons.twitter;

const keywords = [
	__( 'share' ),
	__( 'twitter' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
		default: [],
	},
	url: {
		type: 'attribute',
	},
	textAlign: {
		type: 'string',
	},
	via: {
		type: 'string',
	},
	buttonText: {
		type: 'string',
		default: __( 'Tweet' ),
	},
	buttonColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customButtonColor: {
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
};

const settings = {

	title: title,

	description: __( 'Add a quote for readers to tweet via Twitter.' ),

	keywords: keywords,

	attributes: blockAttributes,

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
				transform: ( { value, ...attrs } ) => {

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
				transform: ( { value, ...attrs } ) => {

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

	edit: Edit,

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

		const viaUrl = via ? `&via=${via}` : '';

		const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=${url}${viaUrl}`;

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
			'has-button-color':  buttonColor || customButtonColor,
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

export { name, title, icon, settings };
