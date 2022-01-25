/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundAttributes, BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';
import { GalleryAttributes, GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared/index';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const deprecatedAttributes = {
	gridSize: {
		default: 'xlrg',
		type: 'string',
	},
};

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...deprecatedAttributes,
	},
	save( { attributes, className } ) {
		const {
			animation,
			captions,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			lightbox,
			rel,
			target,
		} = attributes;

		const innerClasses = classnames(
			...GalleryClasses( attributes ), {
				'has-gutter': gutter > 0,
				'has-lightbox': lightbox,
			}
		);

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const itemClasses = classnames(
			'coblocks-gallery--item', {
				[ `coblocks-animate` ]: animation,
			}
		);

		const masonryStyles = {
			...GalleryStyles( attributes ),
		};

		return (
			<div className={ className }>
				<div className={ innerClasses } >
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

							return (
								<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
									<figure className="coblocks-gallery--figure">
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
			</div>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...deprecatedAttributes,
	},
	save( { attributes, className } ) {
		const {
			align,
			backgroundPadding,
			backgroundPaddingMobile,
			captions,
			captionStyle,
			filter,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			radius,
			rel,
			target,
		} = attributes;

		const galleryClassesDeprecated = classnames(
			'coblocks-gallery', {
				'has-no-alignment': ! align,
				[ `has-border-radius-${ radius }` ]: radius > 0,
				[ `has-filter-${ filter }` ]: filter !== 'none',
				[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
				[ `has-background-border-radius-${ attributes.backgroundRadius }` ]: attributes.backgroundRadius > 0,
				'has-padding': backgroundPadding > 0,
				[ `has-padding-${ backgroundPadding }` ]: backgroundPadding > 0,
				[ `has-padding-mobile-${ backgroundPaddingMobile }` ]: backgroundPaddingMobile > 0,
			}
		);

		const innerClasses = classnames(
			galleryClassesDeprecated,
			...BackgroundClasses( attributes ), {
				'has-gutter': gutter > 0,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
		};

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const masonryStyles = {
			...GalleryStyles( attributes ),
		};

		return (
			<div className={ className }>
				<div
					className={ innerClasses }
					style={ innerStyles }
				>
					{ BackgroundVideo( attributes ) }
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

							return (
								<li className="coblocks-gallery--item" key={ image.id || image.url }>
									<figure className="coblocks-gallery--figure">
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
			</div>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...deprecatedAttributes,
	},
	save( { attributes, className } ) {
		const {
			captions,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			rel,
			target,
		} = attributes;

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				'has-gutter': gutter > 0,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
		};

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const masonryStyles = {
			...GalleryStyles( attributes ),
		};

		return (
			<div className={ className }>
				<div
					className={ innerClasses }
					style={ innerStyles }
				>
					{ BackgroundVideo( attributes ) }
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

							return (
								<li className="coblocks-gallery--item" key={ image.id || image.url }>
									<figure className="coblocks-gallery--figure">
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
			</div>
		);
	},
},
{
	attributes: {
		...GalleryAttributes,
		...deprecatedAttributes,
	},
	save: ( { attributes, className } ) => {
		const {
			animation,
			captions,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			lightbox,
			rel,
			target,
		} = attributes;

		const innerClasses = classnames(
			...GalleryClasses( attributes ), {
				'has-gutter': gutter > 0,
				'has-lightbox': lightbox,
			}
		);

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const itemClasses = classnames(
			'coblocks-gallery--item', {
				[ `coblocks-animate` ]: animation,
			}
		);

		const masonryStyles = {
			...GalleryStyles( attributes ),
		};

		return (
			<div aria-label={ __( `Masonry Gallery`, 'coblocks' ) }
				className={ className }>
				<div className={ innerClasses } >
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

							// If an image has a custom link, override the linkTo selection.
							if ( image.imgLink ) {
								href = image.imgLink;
							}

							const img = <img alt={ image.alt } className={ image.id ? `wp-image-${ image.id }` : null } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

							return (
								<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
									<figure className="coblocks-gallery--figure">
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
			</div>
		);
	},
},
];

export default deprecated;
