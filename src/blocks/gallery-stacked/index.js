/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './components/edit';
import icons from './components/icons';
import { BackgroundStyles } from '../../components/block-gallery/background/';
import { GlobalAttributes, GlobalTransforms, GlobalClasses, GlobalStyles } from '../../components/block-gallery/global/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getFontSizeClass } = wp.editor;

/**
 * Block constants
 */
const name = 'gallery-stacked';

const title = __( 'Stacked Gallery' );

const icon = icons.stacked;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GlobalAttributes,

	// Block specific attributes and overrides.
	align: {
		type: 'string',
		default: 'full',
	},
	captionStyle: {
		type: 'string',
	},
	fullwidth: {
		type: 'boolean',
		default: true,
	},
	gutter: {
		type: 'number',
		default: 0,
	},
	gutterMobile: {
		type: 'number',
		default: 0,
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in an single column stacked gallery.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'blockgallery/masonry' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/carousel' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/thumbnails' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/offset' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/auto-height' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
					} )
				),
			},
			{
				type: 'block',
				isMultiBlock: true,
				blocks: [ 'core/image' ],
				transform: ( attributes ) => {
					const validImages = filter( attributes, ( { id, url } ) => id && url );
					if ( validImages.length > 0 ) {
						return createBlock( `blockgallery/${ name }`, {
							images: validImages.map( ( { id, url, alt, caption } ) => ( { id, url, alt, caption } ) ),
							ids: validImages.map( ( { id } ) => id ),
						} );
					}
					return createBlock( `blockgallery/${ name }` );
				},
			},
			{
				type: 'prefix',
				prefix: ':stacked',
				transform: function( content ) {
					return createBlock( `blockgallery/${ name }`, {
						content,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => (
					createBlock( 'core/gallery', {
						...GlobalTransforms( attributes ),
					} )
				),
			},
		],
	},

	edit,

	save( { attributes, className } ) {

		const {
			captionColor,
			captions,
			customCaptionColor,
			customFontSize,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
		} = attributes;

		const wrapperClasses = classnames(
			...GlobalClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				[ `has-margin` ] : gutter > 0,
			}
		);

		const wrapperStyles = {
			...GlobalStyles( attributes ),
			...BackgroundStyles( attributes ),
		};

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'blockgallery--figure', {
				[ `has-margin-bottom-${ gutter }` ] : gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ] : gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
		} );

		const captionClasses = classnames(
			'blockgallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
		} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={ className }>
				<ul className={ wrapperClasses } style={ wrapperStyles }>
					{ images.map( ( image ) => {
						let href;

						switch ( linkTo ) {
							case 'media':
								href = image.url;
								break;
							case 'attachment':
								href = image.link;
								break;
						}

						const imgClasses = classnames(
							image.id ? [ `wp-image-${ image.id }` ] : null, {
								[ `has-shadow-${ shadow }` ] : shadow != 'none' || shadow != undefined ,
						} );

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ imgClasses } />;

						return (
							<li key={ image.id || image.url } className="blockgallery--item">
								<figure className={ figureClasses }>
									{ href ? <a href={ href }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content tagName="figcaption" className={ captionClasses } value={ image.caption } styles={ captionStyles }/>
									) }
								</figure>
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
};

export { name, title, icon, settings };
