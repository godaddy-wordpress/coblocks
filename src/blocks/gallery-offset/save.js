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
import { RichText } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
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

					const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } />;

					return (
						<li key={ image.id || image.url } className="coblocks-gallery--item">
							<figure className="wp-block-coblocks-gallery-offset__figure">
								{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
								{ captions && image.caption && image.caption.length > 0 && (
									<RichText.Content tagName="figcaption" className="coblocks-gallery--caption" value={ image.caption } />
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
