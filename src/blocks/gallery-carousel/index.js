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
import { GlobalAttributes, GlobalTransforms, GlobalClasses } from '../../components/block-gallery/global/';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { getColorClassName, RichText } = wp.editor;

/**
 * Block constants
 */
const name = 'carousel';

const title = __( 'Carousel Gallery' );

const icon = icons.carousel;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GlobalAttributes,

	// Override global attributes.
	gutter: {
		type: 'number',
		default: 5,
	},
	gutterMobile: {
		type: 'number',
		default: 5,
	},

	// Block specific attributes.
	gridSize: {
		type: 'string',
		default: 'lrg',
	},
	height: {
		type: 'number',
		default: 400,
	},

	// Slider attributes.
	pageDots: {
		type: 'boolean',
		default: false,
	},
	prevNextButtons: {
		type: 'boolean',
		default: true,
	},
	autoPlay: {
		type: 'boolean',
		default: false,
	},
	autoPlaySpeed: {
		type: 'string',
		default: 3000,
	},
	draggable: {
		type: 'boolean',
		default: true,
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in a beautiful carousel gallery.' ),

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
						gridSize: 'lrg',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/masonry' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
						gridSize: 'lrg',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/thumbnails' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
						gridSize: 'lrg',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/offset' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
						gridSize: 'lrg',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'blockgallery/auto-height' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
						gridSize: 'lrg',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ( attributes ) => (
					createBlock( `blockgallery/${ name }`, {
						...GlobalTransforms( attributes ),
						gridSize: 'lrg',
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
				prefix: ':carousel',
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
			autoPlay,
			autoPlaySpeed,
			captionColor,
			customCaptionColor,
			draggable,
			gridSize,
			gutter,
			gutterMobile,
			height,
			images,
			pageDots,
			prevNextButtons,
			primaryCaption,
		} = attributes;

		const wrapperClasses = classnames(
			'is-cropped',
			...GlobalClasses( attributes ), {
				[ `has-horizontal-gutter` ] : gutter > 0,
			}
		);

		const wrapperStyles = {
			...BackgroundStyles( attributes ),
		};

		const flickityClasses = classnames(
			`has-carousel`,
			`has-carousel-${ gridSize }`, {}
		);

		const flickityStyles = {
			height: height ? height + 'px' : undefined,
		};

		const figureClasses = classnames(
			'blockgallery--figure', {
				[ `has-margin-left-${ gutter }` ] : gutter > 0,
				[ `has-margin-left-mobile-${ gutterMobile }` ] : gutterMobile > 0,
				[ `has-margin-right-${ gutter }` ] : gutter > 0,
				[ `has-margin-right-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			}
		);

		const flickityOptions = {
			autoPlay: autoPlay && autoPlaySpeed ? parseFloat( autoPlaySpeed ) : false,
			draggable: draggable,
			pageDots: pageDots,
			prevNextButtons: prevNextButtons,
			wrapAround: true,
			arrowShape: {
				x0: 10,
				x1: 60, y1: 50,
				x2: 65, y2: 45,
				x3: 20
			},
		};

		const captionColorClass = getColorClassName( 'color', captionColor );

		const captionClasses = classnames(
			'blockgallery--caption',
			'blockgallery--primary-caption',
			captionColorClass, {
				'has-caption-color': captionColorClass,

			}
		);

		const captionStyles = {
			color: captionColorClass ? undefined : customCaptionColor,
		};

		// Return early if there are no images.
		if ( images.length <= 0 ) {
			return;
		}

		return (
			<div className={ className }>
				<div
					className={ wrapperClasses }
					style={ wrapperStyles }
				>
					<div
						className={ flickityClasses }
						style={ flickityStyles }
						data-flickity={ JSON.stringify( flickityOptions ) }
					>
						{ images.map( ( image ) => {

							const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

							return (
								<div key={ image.id || image.url } className="blockgallery--item">
									<figure className={ figureClasses }>
										{ img }
									</figure>
								</div>
							);
						} ) }
					</div>
				</div>
				{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } style={ captionStyles }/> }
			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				...blockAttributes,
			},

			save( { attributes, className } ) {

				const {
					autoPlay,
					autoPlaySpeed,
					captionColor,
					customCaptionColor,
					draggable,
					gridSize,
					gutter,
					gutterMobile,
					height,
					images,
					pageDots,
					prevNextButtons,
					primaryCaption,
				} = attributes;

				const wrapperClasses = classnames(
					'is-cropped',
					...GlobalClasses( attributes ), {
						[ `has-horizontal-gutter` ] : gutter > 0,
					}
				);

				const wrapperStyles = {
					...BackgroundStyles( attributes ),
				};

				const flickityClasses = classnames(
					`has-carousel`,
					`has-carousel-${ gridSize }`, {}
				);

				const flickityStyles = {
					height: height ? height + 'px' : undefined,
				};

				const figureClasses = classnames(
					'blockgallery--figure', {
						[ `has-margin-left-${ gutter }` ] : gutter > 0,
						[ `has-margin-left-mobile-${ gutterMobile }` ] : gutterMobile > 0,
						[ `has-margin-right-${ gutter }` ] : gutter > 0,
						[ `has-margin-right-mobile-${ gutterMobile }` ] : gutterMobile > 0,
					}
				);

				const flickityOptions = {
					autoPlay: autoPlay && autoPlaySpeed ? autoPlaySpeed : false,
					draggable: draggable,
					pageDots: pageDots,
					prevNextButtons: prevNextButtons,
					wrapAround: true,
					arrowShape: {
						x0: 10,
						x1: 60, y1: 50,
						x2: 65, y2: 45,
						x3: 20
					},
				};

				const captionColorClass = getColorClassName( 'color', captionColor );

				const captionClasses = classnames(
					'blockgallery--caption',
					'blockgallery--primary-caption',
					captionColorClass, {
						'has-caption-color': captionColorClass,

					}
				);

				const captionStyles = {
					color: captionColorClass ? undefined : customCaptionColor,
				};

				// Return early if there are no images.
				if ( images.length <= 0 ) {
					return;
				}

				return (
					<div className={ className }>
						<div
							className={ wrapperClasses }
							style={ wrapperStyles }
						>
							<div
								className={ flickityClasses }
								style={ flickityStyles }
								data-flickity={ JSON.stringify( flickityOptions ) }
							>
								{ images.map( ( image ) => {

									const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

									return (
										<li key={ image.id || image.url } className="blockgallery--item">
											<figure className={ figureClasses }>
												{ img }
											</figure>
										</li>
									);
								} ) }
							</div>
						</div>
						{ ! RichText.isEmpty( primaryCaption ) && <RichText.Content tagName="figcaption" className={ captionClasses } value={ primaryCaption } style={ captionStyles }/> }
					</div>
				);
			},
		}
	],
}

export { name, title, icon, settings };
