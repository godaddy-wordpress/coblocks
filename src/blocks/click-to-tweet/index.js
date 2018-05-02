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
import ClickToTweet from './components/click-to-tweet';
import ClicktoTweetBlock from './components/edit';
import icons from './components/icons';
import fontSizes from './components/font-sizes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { withFallbackStyles } = wp.components;

/**
 * Block constants
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Block registration
 */
registerBlockType( 'coblocks/click-to-tweet', {

	title: __( 'Click to Tweet' ),

	description: __( 'Add a quote for readers to tweet via Twitter.' ),

	icon: 'twitter',

	category: 'common',

	keywords: [
		__( 'social' ),
		__( 'twitter' ),
		__( 'coblocks' ),
	],

	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		url: {
			type: 'attribute',
		},
		textAlign: {
			type: 'string',
		},
		fontSize: {
			type: 'string',
		},
		customFontSize: {
			type: 'number',
		},
		buttonColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		via: {
			type: 'string',
		},
		buttonText: {
			type: 'string',
			default: __( 'Click to Tweet' ),
		},
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'coblocks/click-to-tweet', { content: content } );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( { value, citation } ) => {
					// transforming an empty click to share element
					if ( ( ! value || ! value.length ) && ! citation ) {
						return createBlock( 'coblocks/click-to-tweet' );
					}
					// transforming a click to share element with content
					return ( value || [] ).map( item => createBlock( 'coblocks/click-to-tweet', {
						content: [ get( item, 'children.props.children', '' ) ],
					} ) ).concat( citation ? createBlock( 'core/paragraph', {
						content: citation,
					} ) : [] );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ( { value, citation } ) => {
					// transforming an empty click to share element
					if ( ( ! value || ! value.length ) && ! citation ) {
						return createBlock( 'coblocks/click-to-tweet' );
					}
					// transforming a click to share element with content
					return ( value || [] ).map( item => createBlock( 'coblocks/click-to-tweet', {
						content: [ get( item, 'children.props.children', '' ) ],
					} ) ).concat( citation ? createBlock( 'core/paragraph', {
						content: citation,
					} ) : [] );
				},
			},
			{
				type: 'block',
				blocks: [ 'coblocks/click-to-share' ],
				transform: ( { content } ) => {
					// transforming an empty click to share element
					if ( ! content || ! content.length ) {
						return createBlock( 'coblocks/click-to-tweet' );
					}
					// transforming a click to share element with content
					return ( content || [] ).map( item => createBlock( 'coblocks/click-to-tweet', {
						content: content,
					} ) );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					// transforming an empty click to share element
					if ( ! content || ! content.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming a click to share element with content
					return ( content || [] ).map( item => createBlock( 'core/paragraph', {
						content: content,
					} ) );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ( { content } ) => {
					// transforming a click to share element with content
					return createBlock( 'core/quote', {
						value: [
							{ children: <p key="1">{ content }</p> },
						],
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ( { content } ) => {
					// transforming a click to share element with content
					return createBlock( 'core/pullquote', {
						value: [
							{ children: <p key="1">{ content }</p> },
						],
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'coblocks/click-to-share' ],
				transform: ( { content } ) => {
					// transforming an empty click to share element
					if ( ! content || ! content.length ) {
						return createBlock( 'coblocks/click-to-share' );
					}
					// transforming a click to share element with content
					return ( content || [] ).map( item => createBlock( 'coblocks/click-to-share', {
						content: content,
					} ) );
				},
			},
		],
	},

	edit: FallbackStyles( ClicktoTweetBlock ),

	save: function( props ) {

		const {
			buttonColor,
			buttonText,
			content,
			customFontSize,
			fontSize,
			textColor,
			url,
			via,
		} = props.attributes;

		const viaUrl = via ? `&via=${via}` : '';

		const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( content ) }&url=${url}${viaUrl}`;

		const textClass = classnames( {
			[ `wp-block-coblocks-click-to-tweet__text` ]: content,
			[ `is-${ fontSize }-text` ]: fontSize && fontSizes[ fontSize ],
		} );

		const textStyle = {
			fontSize: ! fontSize && customFontSize ? customFontSize : undefined,
			color: textColor,
		};

		if ( content && content.length > 0 ) {
			return (
				<ClickToTweet { ...props }>

					<p className={ textClass ? textClass : undefined } style={ textStyle }>
						{ content }
					</p>

					<a className={ 'wp-block-coblocks-click-to-tweet__twitter-btn' } href={ tweetUrl } target="_blank" style={ { backgroundColor: buttonColor } }>
						{ buttonText }
					</a>

				</ClickToTweet>
			);
		}

		return null;
	},
} );
