/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared';
import { BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { RichText, getFontSizeClass, getColorClassName } = wp.blockEditor;

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...metadata.attributes,
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
			lightbox,
		} = attributes;

		const classes = classnames(
			className, {
				'has-lightbox': lightbox,
			}
		);

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
			<div className={ classes }>
				{ BackgroundVideo( attributes ) }
				<ul className={ innerClasses } style={ innerStyles }>
					{ images.map( ( image, index ) => {
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

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } data-index={ index } className={ imgClasses } />;

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
];

export default deprecated;
