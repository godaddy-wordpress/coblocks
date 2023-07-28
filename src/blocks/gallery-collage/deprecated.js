/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../components/background';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...metadata.attributes,
		gutter: {
			default: 2,
			type: 'number',
		},
	},
	migrate( attributes ) {
		let newGutter = '';
		switch ( attributes.gutter ) {
			case 0:
				newGutter = 'no';
				break;
			case 1:
				newGutter = 'small';
				break;
			case 2:
				newGutter = 'small';
				break;
			case 3:
				newGutter = 'large';
				break;
			case 4:
				newGutter = 'huge';
				break;
		}
		return {
			...attributes,
			gutter: newGutter,
		};
	},
	save( { attributes } ) {
		const {
			captionStyle,
			captions,
			gutter,
			filter,
			images,
			linkTo,
			rel,
			target,
			shadow,
			lightbox,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ shadow }` ]: shadow && shadow !== 'none',
		} );

		return (
			<div className={ classnames( attributes.className, {
				[ `has-filter-${ filter }` ]: filter !== 'none',
				[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
				'has-lightbox': lightbox,
			} ) }>
				<ul>
					{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) ).map( ( image, index ) => {
						let href;

						switch ( linkTo ) {
							case 'media':
								href = image.url;
								break;
							case 'attachment':
								href = image.link;
								break;
						}

						// If an image has a custom link, override the linkTo selection.
						if ( image.imgLink ) {
							href = image.imgLink;
						}

						const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
						const img = typeof image.url === 'undefined' ? null : ( <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-index={ image.index } data-link={ image.link } src={ image.url } /> );

						let gutterClasses;

						switch ( index ) {
							case 0:
								gutterClasses = `pb-${ gutter } sm:pb-${ gutter } lg:pb-${ gutter }`;
								break;
							case 1:
								gutterClasses = `pb-${ gutter } sm:pb-${ gutter } lg:pb-${ gutter } pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 2:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 3:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 4:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
						}

						if ( attributes.className ) {
							if ( attributes.className.includes( 'is-style-tiled' ) ) {
								switch ( index ) {
									case 0:
										gutterClasses = '';
										break;
									case 1:
										gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
										break;
									case 2:
										gutterClasses = `pt-${ gutter } sm:pt-${ gutter } lg:pt-${ gutter } pr-${ gutter } sm:pr-${ gutter } lg:pr-${ gutter }`;
										break;
									case 3:
										gutterClasses = `pt-${ gutter } sm:pt-${ gutter } lg:pt-${ gutter }`;
										break;
								}
							}
						}

						if ( attributes.className ) {
							if ( attributes.className.includes( 'is-style-layered' ) ) {
								gutterClasses = null;
							}
						}

						return (
							<li
								className={ classnames( 'wp-block-coblocks-gallery-collage__item', gutterClasses ) }
								key={ `image-${ index }` }
							>
								{ img &&
								<figure className={ classes }>
									{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
									{ captions && image.caption && (
										<RichText.Content className="wp-block-coblocks-gallery-collage__caption" tagName="figcaption" value={ image.caption } />
									) }
								</figure>
								}
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...metadata.attributes,
		gutter: {
			default: 1,
			type: 'number',
		},
		gutterCustom: {
			default: 3,
			type: 'number',
		},
		images: {
			...metadata.attributes.images,
			query: {
				...metadata.attributes.images.query,
				caption: {
					...metadata.attributes.images.query.caption,
					type: 'array',
				},
			},
		},
	},
	save( { attributes } ) {
		const {
			captions,
			captionStyle,
			filter,
			images,
			lightbox,
			linkTo,
			rel,
			shadow,
			target,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ shadow }` ]: shadow && shadow !== 'none',
		} );

		return (
			<GutterWrapper { ...attributes }>
				<div className={ classnames( {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captions && captionStyle !== undefined,
					'has-lightbox': lightbox,
				} ) }>
					<ul>
						{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) ).map( ( image, index ) => {
							let href;

							switch ( linkTo ) {
								case 'media':
									href = image.url;
									break;
								case 'attachment':
									href = image.link;
									break;
							}

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
							const img = typeof image.url === 'undefined' ? null : ( <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-index={ image.index } data-link={ image.link } src={ image.url } /> );

							return (
								<li
									className={ classnames( 'wp-block-coblocks-gallery-collage__item', `item-${ index + 1 }` ) }
									key={ `image-${ index }` }
								>
									{ img &&
									<figure className={ classes }>
										{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
										{ captions && image.caption.length !== 0 && (
											<RichText.Content className="wp-block-coblocks-gallery-collage__caption" tagName="figcaption" value={ image.caption } />
										) }
									</figure>
									}
								</li>
							);
						} ) }
					</ul>
				</div>
			</GutterWrapper>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...metadata.attributes,

		gutter: {
			default: 1,
			type: 'number',
		},
		gutterCustom: {
			default: 3,
			type: 'number',
		},
		images: {
			...metadata.attributes.images,
			query: {
				...metadata.attributes.images.query,
				caption: {
					...metadata.attributes.images.query.caption,
					type: 'array',
				},
			},
		},
	},
	save( { attributes } ) {
		const {
			animation,
			captions,
			captionStyle,
			filter,
			images,
			lightbox,
			linkTo,
			rel,
			shadow,
			target,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ shadow }` ]: shadow && shadow !== 'none',
		} );

		return (
			<GutterWrapper { ...attributes }>
				<div className={ classnames( {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captions && captionStyle !== undefined,
					'has-lightbox': lightbox,
				} ) }>
					<ul>
						{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) )
							// Limit images output based on he selector style.
							.filter( ( image ) => parseInt( image.index ) < ( [ 'is-style-tiled', 'is-style-layered' ].includes( attributes.className ) ? 4 : 5 ) )
							.map( ( image, index ) => {
								let href;

								switch ( linkTo ) {
									case 'media':
										href = image.url;
										break;
									case 'attachment':
										href = image.link;
										break;
								}

								// If an image has a custom link, override the linkTo selection.
								if ( image.imgLink ) {
									href = image.imgLink;
								}

								const itemClasses = classnames(
									'wp-block-coblocks-gallery-collage__item',
									`item-${ index + 1 }`,
									{
										[ `coblocks-animate` ]: animation,
									}
								);
								const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
								const img = typeof image.url === 'undefined' ? null : ( <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-index={ image.index } data-link={ image.link } src={ image.url } /> );

								return (
									<li
										className={ itemClasses }
										data-coblocks-animation={ animation }
										key={ `image-${ index }` }
									>
										{ img &&
										<figure className={ classes }>
											{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
											{ captions && image.caption && (
												<RichText.Content className="wp-block-coblocks-gallery-collage__caption" tagName="figcaption" value={ image.caption } />
											) }
										</figure>
										}
									</li>
								);
							} )
						}
					</ul>
				</div>
			</GutterWrapper>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...metadata.attributes,
		gutter: {
			default: 1,
			type: 'number',
		},
		gutterCustom: {
			default: 3,
			type: 'number',
		},
	},
	save: ( { attributes } ) => {
		const {
			animation,
			captions,
			captionStyle,
			images,
			lightbox,
			linkTo,
			rel,
			shadow,
			target,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ shadow }` ]: shadow && shadow !== 'none',
		} );

		return (
			<GutterWrapper { ...attributes }>
				<div aria-label={ __( `Collage Gallery`, 'coblocks' ) }
					className={ classnames( {
						[ `has-caption-style-${ captionStyle }` ]: captions && captionStyle !== undefined,
						'has-lightbox': lightbox,
					} ) }>
					<ul>
						{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) )
							// Limit images output based on he selector style.
							.filter( ( image ) => parseInt( image.index ) < ( [ 'is-style-tiled', 'is-style-layered' ].includes( attributes.className ) ? 4 : 5 ) )
							.map( ( image, index ) => {
								let href;

								switch ( linkTo ) {
									case 'media':
										href = image.url;
										break;
									case 'attachment':
										href = image.link;
										break;
								}

								// If an image has a custom link, override the linkTo selection.
								if ( image.imgLink ) {
									href = image.imgLink;
								}

								const itemClasses = classnames(
									'wp-block-coblocks-gallery-collage__item',
									`item-${ index + 1 }`,
									{
										[ `coblocks-animate` ]: animation,
									}
								);
								const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
								const img = typeof image.url === 'undefined' ? null : ( <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-index={ image.index } data-link={ image.link } src={ image.url } /> );

								return (
									<li
										className={ itemClasses }
										data-coblocks-animation={ animation }
										key={ `image-${ index }` }
									>
										{ img &&
										<figure className={ classes }>
											{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
											{ captions && image.caption && (
												<RichText.Content className="wp-block-coblocks-gallery-collage__caption" tagName="figcaption" value={ image.caption } />
											) }
										</figure>
										}
									</li>
								);
							} )
						}
					</ul>
				</div>
			</GutterWrapper>
		);
	},
},
];

export default deprecated;
