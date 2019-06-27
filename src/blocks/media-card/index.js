/**
 * External dependencies
 */
import classnames from 'classnames';
import noop from 'lodash/noop';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import brandAssets from '../../utils/brand-assets';
import Edit from './components/edit';
import { BackgroundStyles, BackgroundAttributes, BackgroundClasses, BackgroundVideo } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { getColorClassName, InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'media-card';

const title = __( 'Media Card' );

const icon = icons.mediaCard;

const keywords = [
	__( 'image' ),
	__( 'video' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	mediaPosition: {
		type: 'string',
		default: 'left',
	},
	mediaAlt: {
		type: 'string',
		source: 'attribute',
		selector: 'figure img',
		attribute: 'alt',
		default: '',
	},
	mediaId: {
		type: 'number',
	},
	mediaUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'div div figure video, div div figure img',
		attribute: 'src',
	},
	mediaType: {
		type: 'string',
	},
	mediaWidth: {
		type: 'number',
		default: 55,
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	maxWidth: {
		type: 'number',
	},
	hasImgShadow: {
		type: 'boolean',
		default: false,
	},
	hasCardShadow: {
		type: 'boolean',
		default: false,
	},
	...BackgroundAttributes,
	...DimensionsAttributes,
};

const settings = {

	title: title,

	description: __( 'Add an image or video with an offset card side-by-side.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: ':card',
				transform: function() {
					return createBlock( `coblocks/${ name }` );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/image' ],
				transform: ( { alt, url, id } ) => (
					createBlock( `coblocks/${ name }`, {
						mediaAlt: alt,
						mediaId: id,
						mediaUrl: url,
						mediaType: 'image',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/video' ],
				transform: ( { src, id } ) => (
					createBlock( `coblocks/${ name }`, {
						mediaId: id,
						mediaUrl: src,
						mediaType: 'video',
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/media-text' ],
				transform: ( { mediaAlt, mediaUrl, mediaId, mediaType, mediaPosition } ) => (
					createBlock( `coblocks/${ name }`, {
						mediaAlt: mediaAlt,
						mediaId: mediaId,
						mediaUrl: mediaUrl,
						mediaType: mediaType,
						mediaPosition: mediaPosition,
					} )
				),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/image' ],
				isMatch: ( { mediaType, mediaUrl } ) => {
					return ! mediaUrl || mediaType === 'image';
				},
				transform: ( { mediaAlt, mediaId, mediaUrl } ) => {
					return createBlock( 'core/image', {
						alt: mediaAlt,
						id: mediaId,
						url: mediaUrl,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/video' ],
				isMatch: ( { mediaType, mediaUrl } ) => {
					return ! mediaUrl || mediaType === 'video';
				},
				transform: ( { mediaId, mediaUrl } ) => {
					return createBlock( 'core/video', {
						id: mediaId,
						src: mediaUrl,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/media-text' ],
				transform: ( { mediaAlt, mediaUrl, mediaId, mediaType, mediaPosition } ) => (
					createBlock( 'core/media-text', {
						mediaAlt: mediaAlt,
						mediaId: mediaId,
						mediaUrl: mediaUrl,
						mediaType: mediaType,
						mediaPosition: mediaPosition,
					} )
				),
			},
		]
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			customBackgroundColor,
			hasCardShadow,
			hasImgShadow,
			paddingSize,
			mediaAlt,
			mediaType,
			mediaUrl,
			mediaWidth,
			mediaId,
			maxWidth,
			mediaPosition,
			isStackedOnMobile,
			align,
			focalPoint,
			hasParallax,
			backgroundType,
		} = attributes;

		// Media.
		const mediaTypeRenders = {
			image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
			video: () => <video controls src={ mediaUrl } />,
		};

		let gridTemplateColumns;
		if ( mediaWidth !== 55 ) {
			gridTemplateColumns = mediaPosition === 'right' ? `auto ${ mediaWidth }%` : `${ mediaWidth }% auto`;
		}

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( {
			[ `coblocks-media-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			[ `is-style-${ mediaPosition }` ] : mediaPosition,
			'has-no-media': ! mediaUrl || null,
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-media-card__inner',
			...BackgroundClasses( attributes ), {
				'has-padding': paddingSize && paddingSize != 'no',
				[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			...BackgroundStyles( attributes ),
		};

		const wrapperStyles = {
			gridTemplateColumns,
			maxWidth: maxWidth ? ( 'full' == align || 'wide' == align ) && maxWidth : undefined,
		};

		const cardClasses = classnames(
			'wp-block-coblocks-media-card__content', {
			'has-shadow': hasCardShadow,
		} );

		return (
			<div className={ classes }>
				<div className={ innerClasses } style={ innerStyles } >
					{ BackgroundVideo( attributes ) }
					<div className="wp-block-coblocks-media-card__wrapper" style={ wrapperStyles }>
						<figure className={ classnames(
								'wp-block-coblocks-media-card__media', {
									'has-shadow': hasImgShadow,
								}
							) }
						>
							{ ( mediaTypeRenders[ mediaType ] || noop )() }
							{ ! mediaUrl ? brandAssets.logo : null }
						</figure>
						<div className={ cardClasses }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
