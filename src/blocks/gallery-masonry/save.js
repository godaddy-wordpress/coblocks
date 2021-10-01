/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = ( { attributes, className } ) => {
	const {
		animation,
		captions,
		gridSize,
		gutter,
		gutterMobile,
		images,
		linkTo,
		lightbox,
		rel,
		target,
	} = attributes;

	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			'has-gutter': gutter > 0,
			'has-lightbox': lightbox,
		}
	);

	const masonryClasses = classnames(
		`has-grid-${ gridSize }`, {
			[ `has-gutter-${ gutter }` ]: gutter > 0,
			[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate` ]: animation,
		}
	);

	const masonryStyles = {
		...GalleryStyles( attributes ),
	};

	const getAriaLabel = () => {
		return __( `Masonry Gallery`, 'coblocks' );
	};

	return (
		<div aria-label={ getAriaLabel() }
			className={ className }>
			<div className={ innerClasses } >
				<ul
					className={ masonryClasses }
					style={ masonryStyles }
				>
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

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ image.id ? `wp-image-${ image.id }` : null } />;

						return (
							<li key={ image.id || image.url } className={ itemClasses } data-coblocks-animation={ animation }>
								<figure className="coblocks-gallery--figure">
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
		</div>
	);
};

export default save;
