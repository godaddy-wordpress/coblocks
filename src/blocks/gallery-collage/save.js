/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

const save = ( props ) => {
	const { attributes, className } = props;

	const {
		captionStyle,
		captions,
		gutter,
		gutterMobile,
		filter,
		images,
		linkTo,
		rel,
		target,
	} = attributes;

	const figureClasses = classnames(
		'wp-block-coblocks-gallery-collage__figure',
		{
			'has-gutter': !! gutter,
			[ `has-gutter-${ gutter }` ]: !! gutter,
			[ `has-gutter-mobile-${ gutterMobile }` ]: !! gutterMobile,
		}
	);

	return (
		<div className={ classnames( className, {
			[ `has-filter-${ filter }` ]: filter !== 'none',
			[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
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
					const img = ( <img src={ image.url } alt={ image.alt } data-index={ image.index } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } /> );

					return (
						<li key={ `image-${ index }` } className="wp-block-coblocks-gallery-collage__item">
							<figure className={ figureClasses }>
								{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
								{ captions && image.caption && (
									<RichText.Content tagName="figcaption" className="wp-block-coblocks-gallery-collage__caption" value={ image.caption } />
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
