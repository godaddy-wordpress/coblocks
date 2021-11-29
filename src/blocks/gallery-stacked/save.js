/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getFontSizeClass, RichText } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
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
};

export default save;
