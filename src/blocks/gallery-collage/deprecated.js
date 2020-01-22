/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../components/background';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const deprecated =
[ {
	attributes: {
		...GalleryAttributes,
		...BackgroundAttributes,
		...metadata.attributes,
		gutter: {
			type: 'number',
			default: 2,
		},
	},
	migrate( attributes ) {
		let newGutter = '';
		switch ( attributes.gutter ) {
			case 0:
				newGutter = 'no';
				break;
			case 1:
				newGutter = 'small';
				break;
			case 2:
				newGutter = 'small';
				break;
			case 3:
				newGutter = 'large';
				break;
			case 4:
				newGutter = 'huge';
				break;
		}
		return {
			...attributes,
			gutter: newGutter,
		};
	},
	save( { attributes } ) {
		const {
			captionStyle,
			captions,
			gutter,
			filter,
			images,
			linkTo,
			rel,
			target,
			shadow,
			lightbox,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ shadow }` ]: shadow && shadow !== 'none',
		} );

		return (
			<div className={ classnames( attributes.className, {
				[ `has-filter-${ filter }` ]: filter !== 'none',
				[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
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

						let gutterClasses;

						switch ( index ) {
							case 0:
								gutterClasses = `pb-${ gutter } sm:pb-${ gutter } lg:pb-${ gutter }`;
								break;
							case 1:
								gutterClasses = `pb-${ gutter } sm:pb-${ gutter } lg:pb-${ gutter } pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 2:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 3:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
							case 4:
								gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
								break;
						}

						if ( attributes.className ) {
							if ( attributes.className.includes( 'is-style-tiled' ) ) {
								switch ( index ) {
									case 0:
										gutterClasses = '';
										break;
									case 1:
										gutterClasses = `pl-${ gutter } sm:pl-${ gutter } lg:pl-${ gutter }`;
										break;
									case 2:
										gutterClasses = `pt-${ gutter } sm:pt-${ gutter } lg:pt-${ gutter } pr-${ gutter } sm:pr-${ gutter } lg:pr-${ gutter }`;
										break;
									case 3:
										gutterClasses = `pt-${ gutter } sm:pt-${ gutter } lg:pt-${ gutter }`;
										break;
								}
							}
						}

						if ( attributes.className ) {
							if ( attributes.className.includes( 'is-style-layered' ) ) {
								gutterClasses = null;
							}
						}

						return (
							<li
								key={ `image-${ index }` }
								className={ classnames( 'wp-block-coblocks-gallery-collage__item', gutterClasses ) }
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
	},
} ];

export default deprecated;
