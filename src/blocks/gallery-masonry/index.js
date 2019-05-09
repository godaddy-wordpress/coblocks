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
import icons from './components/icons';
import edit from './components/edit';
import { BackgroundStyles } from '../../components/block-gallery/background/';
import { GlobalAttributes, GlobalTransforms, GlobalClasses, GlobalStyles } from '../../components/block-gallery/global/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Block constants
 */
const name = 'masonry';

const title = __( 'Masonry Gallery' );

const icon = icons.masonry;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GlobalAttributes,

	// Block specific attributes.
	gridSize: {
		type: 'string',
		default: 'xlrg',
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in an organized masonry gallery.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'blockgallery/stacked' ],
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
				prefix: ':masonry',
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
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			captions,
		} = attributes;

		const wrapperClasses = classnames(
			...GlobalClasses( attributes ), {
				[ `has-gutter` ] : gutter > 0,
			}
		);

		const wrapperStyles = {
			...BackgroundStyles( attributes ),
		};

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ] : gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			}
		);

		const masonryStyles = {
			...GlobalStyles( attributes ),
		};

		return (
			<div className={ className }>
				<div
					className={ wrapperClasses }
					style={ wrapperStyles }
				>
					<ul
						className={ masonryClasses }
						style={ masonryStyles }
						>
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

							const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

							return (
								<li key={ image.id || image.url } className="blockgallery--item">
									<figure className="blockgallery--figure">
										{ href ? <a href={ href }>{ img }</a> : img }
										{ captions && image.caption && image.caption.length > 0 && (
											<RichText.Content tagName="figcaption" className="blockgallery--caption" value={ image.caption } />
										) }
									</figure>
								</li>
							);
						} ) }
					</ul>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
