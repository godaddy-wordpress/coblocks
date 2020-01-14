/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { GalleryAttributes, GalleryClasses } from '../../components/block-gallery/shared';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...metadata.attributes,
	},
	save( { attributes, className } ) {
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
			...GalleryClasses( attributes ),
			'mb-0',
			'ml-1',
			'-mb-1', {
				[ `sm:ml-${ gutter }` ]: gutter,
				[ `sm:-mb-${ gutter }` ]: gutter,
				[ `coblocks-gallery--${ gridSize }` ]: gridSize,
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

						let gutterClasses;

						switch ( gutter ) {
							case 0:
								gutterClasses = 'm-0';
								break;
							case 1:
								gutterClasses = 'mr-1 mb-1';
								break;
							case 2:
								gutterClasses = 'mr-1 sm:mr-2 md:mr-3 mb-1 sm:mb-2 md:mb-3';
								break;
							case 3:
								gutterClasses = 'mr-1 sm:mr-2 md:mr-3 lg:mr-4 mb-1 sm:mb-2 md:mb-3 lg:mb-4';
								break;
						}

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-link={ image.link } className={ imgClasses } />;

						return (
							<li key={ image.id || image.url } className="coblocks-gallery--item">
								<figure className={ classnames( 'wp-block-coblocks-gallery-offset__figure', gutterClasses ) }>
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
	},
} ];

export default deprecated;
