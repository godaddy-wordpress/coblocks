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
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import { __ } from '@wordpress/i18n';

const save = ( { attributes, className } ) => {
	const {
		animation,
		captions,
		gridSize,
		images,
		lightbox,
		linkTo,
		rel,
		target,
		gutter,
		gutterCustom,
	} = attributes;

	const wrapperClasses = classnames(
		className, {
			'has-lightbox': lightbox,
		}
	);

	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			[ `has-${ gridSize }-images` ]: gridSize,
		},
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate` ]: animation,
		}
	);

	return (
		<div aria-label={ __( `Offset Gallery`, 'coblocks' ) }
			className={ wrapperClasses }>
			<GutterWrapper { ...attributes }>
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

						const img = <img alt={ image.alt } className={ imgClasses } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } src={ image.url } />;

						const noGutterSpacing = gutter === 'custom' && gutterCustom === '0' ? { margin: 0 } : {};

						return (
							<li className={ itemClasses } data-coblocks-animation={ animation } key={ image.id || image.url } style={ noGutterSpacing } >
								<figure className="wp-block-coblocks-gallery-offset__figure" style={ noGutterSpacing } >
									{ href ? <a href={ href } rel={ rel } target={ target }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content className="coblocks-gallery--caption" tagName="figcaption" value={ image.caption } />
									) }
								</figure>
							</li>
						);
					} ) }
				</ul>
			</GutterWrapper>
		</div>
	);
};

export default save;
