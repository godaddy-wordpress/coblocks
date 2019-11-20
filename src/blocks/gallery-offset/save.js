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
import { RichText, getFontSizeClass } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
	const {
		contentAlign,
		customFontSize,
		fontSize,
		gridSize,
		gutter,
		gutterMobile,
		images,
		target,
		rel,
		linkTo,
		shadow,
		captions,
		lightbox,
	} = attributes;

	const wrapperClasses = classnames(
		className, {
			'has-lightbox': lightbox,
		}
	);

	const innerClasses = classnames(
		...GalleryClasses( attributes ),
		`has-bricks-grid-${ gridSize }`,
		`has-${ contentAlign }-content`, {
			[ `has-gutter-${ gutter }` ]: gutter > 0,
			[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
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
						image.id ? [ `wp-image-${ image.id }` ] : null, {
							[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
						} );

					const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ imgClasses } />;

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
};

export default save;
