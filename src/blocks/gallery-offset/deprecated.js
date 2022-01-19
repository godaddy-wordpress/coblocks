/* eslint-disable sort-keys */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryAttributes, GalleryClasses } from '../../components/block-gallery/shared';
import metadata from './block.json';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const deprecated = [
	{
		attributes: {
			...GalleryAttributes,
			...metadata.attributes,
			gridSize: {
				type: 'string',
				default: 'sml',
			},
			gutter: {
				type: 'number',
				default: 1,
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
					newGutter = 'medium';
					break;
				case 3:
					newGutter = 'large';
					break;
				case 4:
					newGutter = 'huge';
					break;
			}
			let newGridSize = '';
			switch ( attributes.gridSize ) {
				case 'sml':
					newGridSize = 'small';
					break;
				case 'med':
					newGridSize = 'medium';
					break;
				case 'lrg':
					newGridSize = 'large';
					break;
			}
			return {
				...attributes,
				gutter: newGutter,
				gridSize: newGridSize,
			};
		},
		save( { attributes, className } ) {
			const {
				captions,
				gutter,
				gridSize,
				images,
				lightbox,
				linkTo,
				rel,
				target,
			} = attributes;

			const wrapperClasses = classnames(
				className, {
					'has-lightbox': lightbox,
				}
			);

			const innerClasses = classnames(
				...GalleryClasses( attributes ),
				'flex',
				'flex-wrap',
				'justify-center',
				'mb-0',
				'ml-1',
				'-mb-1', {
					[ `sm:ml-${ gutter }` ]: gutter,
					[ `sm:-mb-${ gutter }` ]: gutter,
					[ `coblocks-gallery--${ gridSize }` ]: gridSize,
				},
			);

			return (
				<div className={ wrapperClasses }>
					<ul className={ innerClasses } >
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const imgClasses = classnames(
								image.id ? [ `wp-image-${ image.id }` ] : null, {}
							);

							const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-link={ image.link } src={ image.url } />;

							return (
								<li className="coblocks-gallery--item" key={ image.id || image.url }>
									<figure className="wp-block-coblocks-gallery-offset__figure">
										{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
										{ captions && image.caption && image.caption.length > 0 && (
											<RichText.Content className="coblocks-gallery--caption" tagName="figcaption" value={ image.caption } />
										) }
									</figure>
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
			images: {
				...GalleryAttributes.images,
				query: {
					...GalleryAttributes.images.query,
					imgLink: {
						source: 'attribute',
						selector: 'a',
						attribute: 'href',
					},
				},
			},
		},
		save: ( { attributes, className } ) => {
			const {
				captions,
				gutter,
				gridSize,
				images,
				lightbox,
				linkTo,
				rel,
				target,
			} = attributes;

			const wrapperClasses = classnames(
				className, {
					'has-lightbox': lightbox,
				}
			);

			const innerClasses = classnames(
				...GalleryClasses( attributes ), {
					[ `has-${ gridSize }-images` ]: gridSize,
					[ `has-${ gutter }-gutter` ]: gutter,
				},
			);

			return (
				<div className={ wrapperClasses }>
					<ul className={ innerClasses } >
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const imgClasses = classnames(
								image.id ? [ `wp-image-${ image.id }` ] : null, {}
							);

							const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-link={ image.link } src={ image.url } />;

							return (
								<li className="coblocks-gallery--item" key={ image.id || image.url }>
									<figure className="wp-block-coblocks-gallery-offset__figure">
										{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
										{ captions && image.caption && image.caption.length > 0 && (
											<RichText.Content className="coblocks-gallery--caption" tagName="figcaption" value={ image.caption } />
										) }
									</figure>
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
				type: 'string',
				default: 'medium',
			},
		},
		save: ( { attributes, className } ) => {
			const {
				animation,
				captions,
				gridSize,
				images,
				lightbox,
				linkTo,
				rel,
				target,
			} = attributes;

			const wrapperClasses = classnames(
				className, {
					'has-lightbox': lightbox,
				}
			);

			const innerClasses = classnames(
				...GalleryClasses( attributes ), {
					[ `has-${ gridSize }-images` ]: gridSize,
				},
			);

			const itemClasses = classnames(
				'coblocks-gallery--item', {
					[ `coblocks-animate` ]: animation,
				}
			);

			return (
				<div className={ wrapperClasses }>
					<GutterWrapper { ...attributes }>
						<ul className={ innerClasses } >
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

								// If an image has a custom link, override the linkTo selection.
								if ( image.imgLink ) {
									href = image.imgLink;
								}

								const imgClasses = classnames(
									image.id ? [ `wp-image-${ image.id }` ] : null, {}
								);

								const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

								return (
									<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
										<figure className="wp-block-coblocks-gallery-offset__figure">
											{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
											{ captions && image.caption && image.caption.length > 0 && (
												<RichText.Content className="coblocks-gallery--caption" tagName="figcaption" value={ image.caption } />
											) }
										</figure>
									</li>
								);
							} ) }
						</ul>
					</GutterWrapper>
				</div>
			);
		},
	},
	{
		attributes: {
			...GalleryAttributes,
			...metadata.attributes,
			gutter: {
				type: 'string',
				default: 'small',
			},
		},
		save: ( { attributes, className } ) => {
			const {
				animation,
				captions,
				gridSize,
				images,
				lightbox,
				linkTo,
				rel,
				target,
			} = attributes;

			const wrapperClasses = classnames(
				className, {
					'has-lightbox': lightbox,
				}
			);

			const innerClasses = classnames(
				...GalleryClasses( attributes ), {
					[ `has-${ gridSize }-images` ]: gridSize,
				},
			);

			const itemClasses = classnames(
				'coblocks-gallery--item', {
					[ `coblocks-animate` ]: animation,
				}
			);

			return (
				<div className={ wrapperClasses }>
					<GutterWrapper { ...attributes }>
						<ul className={ innerClasses } >
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

								// If an image has a custom link, override the linkTo selection.
								if ( image.imgLink ) {
									href = image.imgLink;
								}

								const imgClasses = classnames(
									image.id ? [ `wp-image-${ image.id }` ] : null, {}
								);

								const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

								return (
									<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
										<figure className="wp-block-coblocks-gallery-offset__figure">
											{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
											{ captions && image.caption && image.caption.length > 0 && (
												<RichText.Content className="coblocks-gallery--caption" tagName="figcaption" value={ image.caption } />
											) }
										</figure>
									</li>
								);
							} ) }
						</ul>
					</GutterWrapper>
				</div>
			);
		},
	},
];

export default deprecated;
