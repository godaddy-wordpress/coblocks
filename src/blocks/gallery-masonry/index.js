/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import transforms from './transforms';
import { GalleryAttributes, GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared';
import { BackgroundAttributes, BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'gallery-masonry';

const title = __( 'Masonry' );

const icon = icons.masonry;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GalleryAttributes,
	...BackgroundAttributes,

	// Block specific attributes.
	gridSize: {
		type: 'string',
		default: 'xlrg',
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in an organized masonry gallery.' ),

	category: 'coblocks-galleries',

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms,

	edit,

	save( { attributes, className } ) {
		const {
			captions,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
			rel,
			target,
		} = attributes;

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				'has-gutter': gutter > 0,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
		};

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const masonryStyles = {
			...GalleryStyles( attributes ),
		};

		return (
			<div className={ className }>
				<div
					className={ innerClasses }
					style={ innerStyles }
				>
					{ BackgroundVideo( attributes ) }
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
								<li key={ image.id || image.url } className="coblocks-gallery--item">
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
	},
};

export { name, title, icon, settings };
