/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText, getColorClassName } = wp.blockEditor;

const save = ( props ) => {
	const { attributes, className } = props;

	const {
		captionColor,
		customCaptionColor,
		captionStyle,
		captions,
		gutter,
		gutterMobile,
		filter,
		images,
	} = attributes;

	const captionColorClass = getColorClassName( 'color', captionColor );

	const innerStyles = {
		color: ! captionColorClass && customCaptionColor,
	};

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
			'has-caption-color': captionColorClass || customCaptionColor,
			captionColorClass,
			[ captionColorClass ]: captionColorClass,
		} ) }>
			<ul style={ innerStyles }>
				{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) ).map( ( image, index ) => {
					const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
					const img = ( <img src={ image.url } alt={ image.alt } data-index={ image.index } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } /> );

					return (
						<li key={ `image-${ index }` } className="wp-block-coblocks-gallery-collage__item">
							<figure className={ figureClasses }>
								{ image.url ? img : '' }
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
