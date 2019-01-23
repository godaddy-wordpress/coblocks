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
import icons from './../../utils/icons';
import Edit from './components/edit';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses, BackgroundImageTransforms } from '../../components/background';
import ResizableSpacer, { ResizableSpacerTransforms } from '../../components/resizable-spacer/';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;

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
	contentAlign: {
		type: 'string',
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

	description: __( 'Add an image card with an offset text block.' ),

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
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		]
	},

	styles: [
		{ name: 'left', label: __( 'Left' ), isDefault: true },
		{ name: 'right', label: __( 'Right' ) },
	],

	edit: Edit,

	save( { attributes, className } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			contentAlign,
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
			isStackedOnMobile,
			align,
		} = attributes;

		// Media.
		const mediaTypeRenders = {
			image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
			video: () => <video controls src={ mediaUrl } />,
		};

		const isStyleRight = includes( className, 'is-style-right' );
		const mediaPosition = isStyleRight ? 'right' : 'left';

		let gridTemplateColumns;
		if ( mediaWidth !== 55 ) {
			gridTemplateColumns = mediaPosition === 'right' ? `auto ${ mediaWidth }%` : `${ mediaWidth }% auto`;
		}

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( {
			[ `coblocks-media-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			'has-no-media': ! mediaUrl || null,
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

		const wrapperClasses = classnames(
			'wp-block-coblocks-media-card__wrapper',
			...BackgroundClasses( attributes ), {
		} );

		const wrapperStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
		};

		const innerClasses = classnames(
			'wp-block-coblocks-media-card__inner', {
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			gridTemplateColumns,
			maxWidth: maxWidth ? ( 'full' == align || 'wide' == align ) && maxWidth : undefined,
		};

		const cardBackgroundClasses = classnames(
			'wp-block-coblocks-media-card__content', {
			'has-shadow': hasCardShadow,
		} );

		const cardStyles = {
			textAlign: contentAlign ? contentAlign : null,
		};

		return (
			<div className={ classes }>
				<div className={ wrapperClasses } style={ wrapperStyles } >
					<div className={ innerClasses } style={ innerStyles }>
						<figure className={ classnames(
								'wp-block-coblocks-media-card__media', {
									'has-shadow': hasImgShadow,
								}
							) }
						>
							{ ( mediaTypeRenders[ mediaType ] || noop )() }
							{ ! mediaUrl ? icons.logo : null }
						</figure>
						<div className={ cardBackgroundClasses } style={ cardStyles }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
