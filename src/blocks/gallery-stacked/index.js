/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './edit';
import icons from './icons';
import transforms from './transforms';
import { GalleryAttributes, GalleryClasses, GalleryStyles } from '../../components/block-gallery/shared';
import { BackgroundAttributes, BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, getFontSizeClass, getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'gallery-stacked';

const title = __( 'Stacked' );

const icon = icons.stacked;

const keywords = [
	__( 'gallery' ),
	__( 'photos' ),
];

const blockAttributes = {
	...GalleryAttributes,
	...BackgroundAttributes,

	// Block specific attributes and overrides.
	align: {
		type: 'string',
		default: 'full',
	},
	captionStyle: {
		type: 'string',
	},
	fullwidth: {
		type: 'boolean',
		default: true,
	},
	gutter: {
		type: 'number',
		default: 0,
	},
	gutterMobile: {
		type: 'number',
		default: 0,
	},
};

const settings = {

	title: title,

	description: __( 'Display multiple images in an single column stacked gallery.' ),

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
			captionColor,
			captions,
			customCaptionColor,
			customFontSize,
			fontSize,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
			hasParallax,
			backgroundType,
			focalPoint,
			backgroundImg,
			customBackgroundColor,
			backgroundColor,
			target,
			rel,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', captionColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				[ `has-margin` ] : gutter > 0,
			}
		);

		const innerStyles = {
			...GalleryStyles( attributes ),
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customCaptionColor,
		};

		const fontSizeClass = getFontSizeClass( fontSize );

		const figureClasses = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-bottom-${ gutter }` ] : gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ] : gutterMobile > 0,
				[ fontSizeClass ]: fontSizeClass,
		} );

		const captionClasses = classnames(
			'coblocks-gallery--caption', {
				[ fontSizeClass ]: fontSizeClass,
		} );

		const captionStyles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<div className={ className }>
				{ BackgroundVideo( attributes ) }
				<ul className={ innerClasses } style={ innerStyles }>
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
								[ `has-shadow-${ shadow }` ] : shadow != 'none' || shadow != undefined ,
						} );

						const img = <img src={ image.url } alt={ image.alt } data-id={ image.id } data-imglink={ image.imgLink } data-link={ image.link } className={ imgClasses } />;

						return (
							<li key={ image.id || image.url } className="coblocks-gallery--item">
								<figure className={ figureClasses }>
									{ href ? <a href={ href } target={ target } rel={ rel }>{ img }</a> : img }
									{ captions && image.caption && image.caption.length > 0 && (
										<RichText.Content tagName="figcaption" className={ captionClasses } value={ image.caption } styles={ captionStyles }/>
									) }
								</figure>
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
};

export { name, title, icon, settings };
