/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

const save = ( { attributes } ) => {
	const {
		animation,
		captions,
		captionStyle,
		filter,
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
		<GutterWrapper { ...attributes }>
			<div aria-label={ __( `Collage Gallery`, 'coblocks' ) }
				className={ classnames( {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captions && captionStyle !== undefined,
					'has-lightbox': lightbox,
				} ) }>
				<ul>
					{ images.sort( ( a, b ) => parseInt( a.index ) - parseInt( b.index ) )
						// Limit images output based on he selector style.
						.filter( ( image ) => parseInt( image.index ) < ( [ 'is-style-tiled', 'is-style-layered' ].includes( attributes.className ) ? 4 : 5 ) )
						.map( ( image, index ) => {
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

							const itemClasses = classnames(
								'wp-block-coblocks-gallery-collage__item',
								`item-${ index + 1 }`,
								{
									[ `coblocks-animate` ]: animation,
								}
							);
							const imgClasses = classnames( image.id && [ `wp-image-${ image.id }` ] );
							const img = typeof image.url === 'undefined' ? null : ( <img alt="Gallery Image" className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-index={ image.index } data-link={ image.link } src={ image.url } /> );

							return (
								<li
									className={ itemClasses }
									data-coblocks-animation={ animation }
									key={ `image-${ index }` }
								>
									{ img &&
									<figure className={ classes }>
										{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
										{ captions && image.caption && (
											<RichText.Content className="wp-block-coblocks-gallery-collage__caption" tagName="figcaption" value={ image.caption } />
										) }
									</figure>
									}
								</li>
							);
						} )
					}
				</ul>
			</div>
		</GutterWrapper>
	);
};

export default save;
