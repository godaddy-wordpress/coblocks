/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { blockStylesToDescend } from '../../utils/helper.js';
import { GalleryClasses } from '../../components/block-gallery/shared';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';

const save = ( { attributes } ) => {
	const {
		animation,
		captions,
		fullwidth,
		images,
		lightbox,
		linkTo,
		shadow,
	} = attributes;

	const saveBlockProps = useBlockProps.save( { className: classnames( { 'has-lightbox': lightbox } ) } );

	// Classes for align, radius, captionStyle, and filter.
	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			'has-fullwidth-images': fullwidth,
		}
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate` ]: animation,
		}
	);

	const figureClasses = classnames( 'coblocks-gallery--figure' );
	const captionClasses = classnames( 'coblocks-gallery--caption' );
	const descendingBlockStyles = blockStylesToDescend( saveBlockProps );

	return (
		<View { ...saveBlockProps }>
			<GutterWrapper { ...attributes }>
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
									{ href ? <a href={ href }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content className={ captionClasses } style={ descendingBlockStyles } tagName="figcaption" value={ image.caption } />
									) }
								</figure>
							</li>
						);
					} ) }
				</ul>
			</GutterWrapper>
		</View>
	);
};

export default save;
