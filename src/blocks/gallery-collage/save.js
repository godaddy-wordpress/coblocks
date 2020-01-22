/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
	const {
		captions,
		captionStyle,
		filter,
		gutter,
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
		<div className={ classnames( className, {
			[ `has-${ gutter }-gutter` ]: gutter,
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
					const img = typeof image.url === 'undefined' ? null : ( <img src={ image.url } alt={ image.alt } data-index={ image.index } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } /> );

					return (
						<li
							key={ `image-${ index }` }
							className={ classnames( 'wp-block-coblocks-gallery-collage__item', `item-${ index + 1 }` ) }
						>
							{ img &&
								<figure className={ classes }>
									{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
									{ captions && image.caption && (
										<RichText.Content tagName="figcaption" className="wp-block-coblocks-gallery-collage__caption" value={ image.caption } />
									) }
								</figure>
							}
						</li>
					);
				} ) }
			</ul>
		</div>
	);
};

export default save;
