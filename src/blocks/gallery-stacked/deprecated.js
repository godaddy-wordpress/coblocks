/* eslint-disable react/jsx-sort-props */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundAttributes, BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';
import { GalleryAttributes, GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName, getFontSizeClass, RichText } from '@wordpress/block-editor';

const originalDeprecatedAttributes = {
	align: {
		default: 'full',
		type: 'string',
	},
	captionStyle: {
		type: 'string',
	},
	fullwidth: {
		default: true,
		type: 'boolean',
	},
	gutter: {
		default: 0,
		type: 'number',
	},
	gutterMobile: {
		default: 0,
		type: 'number',
	},
};

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...originalDeprecatedAttributes,
	},
	save( { attributes, className } ) {
		const {
			align,
			backgroundPadding,
			backgroundPaddingMobile,
			captionColor,
			captions,
			captionStyle,
			customCaptionColor,
			customFontSize,
			filter,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			radius,
			rel,
			shadow,
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

		const classes = classnames(
			className, {}
		);

		// Body color class and styles.
		const textClass = getColorClassName( 'color', captionColor );

		const innerClasses = classnames(
			galleryClassesDeprecated,
			...BackgroundClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				'has-margin': gutter > 0,
			}
		);

		const innerStyles = {
			...GalleryStyles( attributes ),
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customCaptionColor,
		};

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionClasses = classnames(
			'coblocks-gallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={ classes }>
				{ BackgroundVideo( attributes ) }
				<ul className={ innerClasses } style={ innerStyles }>
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
							image.id ? [ `wp-image-${ image.id }` ] : null, {
								[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
							} );

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } />;

						return (
							<li key={ image.id || image.url } className="coblocks-gallery--item">
								<figure className={ figureClasses }>
									{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content tagName="figcaption" className={ captionClasses } value={ image.caption } styles={ captionStyles } />
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
		...BackgroundAttributes,
		...originalDeprecatedAttributes,
	},
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
			target,
			rel,
			linkTo,
			shadow,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', captionColor );

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				'has-margin': gutter > 0,
			}
		);

		const innerStyles = {
			...GalleryStyles( attributes ),
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customCaptionColor,
		};

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionClasses = classnames(
			'coblocks-gallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={ className }>
				{ BackgroundVideo( attributes ) }
				<ul className={ innerClasses } style={ innerStyles }>
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
							image.id ? [ `wp-image-${ image.id }` ] : null, {
								[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
							} );

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } />;

						return (
							<li key={ image.id || image.url } className="coblocks-gallery--item">
								<figure className={ figureClasses }>
									{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content tagName="figcaption" className={ captionClasses } value={ image.caption } styles={ captionStyles } />
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
		...BackgroundAttributes,
		...originalDeprecatedAttributes,
	},
	save: ( { attributes, className } ) => {
		const {
			animation,
			captions,
			customFontSize,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			lightbox,
			linkTo,
			rel,
			shadow,
			target,
		} = attributes;

		const classes = classnames(
			className, {
				'has-lightbox': lightbox,
			}
		);

		// Body color class and styles.
		const innerClasses = classnames(
			...GalleryClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				'has-margin': gutter > 0,
			}
		);

		const itemClasses = classnames(
			'coblocks-gallery--item', {
				[ `coblocks-animate` ]: animation,
			}
		);

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionClasses = classnames(
			'coblocks-gallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={ classes }>
				<ul className={ innerClasses }>
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
							image.id ? [ `wp-image-${ image.id }` ] : null, {
								[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
							} );

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } />;

						return (
							<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
								<figure className={ figureClasses }>
									{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content className={ captionClasses } style={ captionStyles } tagName="figcaption" value={ image.caption } />
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
		...originalDeprecatedAttributes,
	},
	migrate( attributes ) {
		return {
			...attributes,
			gutter: 'custom',
		};
	},
	save: ( { attributes, className } ) => {
		const {
			animation,
			captions,
			customFontSize,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			lightbox,
			linkTo,
			rel,
			shadow,
			target,
		} = attributes;

		const classes = classnames(
			className, {
				'has-lightbox': lightbox,
			}
		);

		// Body color class and styles.
		const innerClasses = classnames(
			...GalleryClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				'has-margin': gutter > 0,
			}
		);

		const itemClasses = classnames(
			'coblocks-gallery--item', {
				[ `coblocks-animate` ]: animation,
			}
		);

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionClasses = classnames(
			'coblocks-gallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
			} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div
				aria-label={ __( `Stacked Gallery`, 'coblocks' ) }
				className={ classes }>
				<ul className={ innerClasses }>
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
							image.id ? [ `wp-image-${ image.id }` ] : null, {
								[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
							} );

						const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

						return (
							<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url }>
								<figure className={ figureClasses }>
									{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content className={ captionClasses } style={ captionStyles } tagName="figcaption" value={ image.caption } />
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
];

export default deprecated;
