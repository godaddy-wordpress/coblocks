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

const icon = icons.imageCard;

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
		default: 50,
	},
	contentAlign: {
		type: 'string',
	},
	hasImgShadow: {
		type: 'boolean',
		default: false,
	},
	hasCardShadow: {
		type: 'boolean',
		default: false,
	},
	isStackedOnMobile: {
		type: 'boolean',
		default: true,
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
			isStackedOnMobile,
		} = attributes;

		// Media.
		const mediaTypeRenders = {
			image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
			video: () => <video controls src={ mediaUrl } />,
		};

		const isStyleRight = includes( className, 'is-style-right' );
		const mediaPosition = isStyleRight ? 'right' : 'left';

		let gridTemplateColumns;
		if ( mediaWidth !== 50 ) {
			gridTemplateColumns = mediaPosition === 'right' ? `auto ${ mediaWidth }%` : `${ mediaWidth }% auto`;
		}

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( {
			[ `coblocks-media-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			'has-no-image': ! mediaUrl || null,
			'is-stacked-on-mobile': isStackedOnMobile,
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-media-card__inner',
			...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			gridTemplateColumns,
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,

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
				<div className={ innerClasses } style={ innerStyles }>
					<figure className={ classnames(
							'wp-block-coblocks-media-card__media', {
								'has-shadow': hasImgShadow,
							}
						) }
					>
						{ ( mediaTypeRenders[ mediaType ] || noop )() }
					</figure>
					<div className={ cardBackgroundClasses } style={ cardStyles }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
