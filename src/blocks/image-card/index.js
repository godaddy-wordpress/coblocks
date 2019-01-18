/**
 * External dependencies
 */
import classnames from 'classnames';

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
const name = 'image-card';

const title = __( 'Image Card' );

const icon = icons.imageCard;

const keywords = [
	__( 'image' ),
	__( 'feature' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	imgUrl: {
		type: 'string',
	},
	alt: {
		attribute: 'alt',
		selector: 'img',
		source: 'attribute',
		type: 'string',
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
			alt,
			backgroundColor,
			backgroundImg,
			cardBackgroundColor,
			contentAlign,
			customBackgroundColor,
			customCardBackgroundColor,
			hasCardShadow,
			hasImgShadow,
			imgUrl,
			paddingSize,
		} = attributes;


		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const backgroundClasses = classnames(
			className,{
				[ `coblocks-image-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-image-card__inner',
			...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
		};

		const cardBackgroundClasses = classnames(
			'wp-block-coblocks-image-card__card', {
			'has-background': cardBackgroundColor || customCardBackgroundColor,
			'has-shadow': hasCardShadow,
		} );

		const cardStyles = {
			textAlign: contentAlign ? contentAlign : null,
		};

		return (
			<div className={ backgroundClasses }>
				<div className={ innerClasses } style={ innerStyles }>
					<div className="wp-block-coblocks-image-card__intrinsic">
						<div
							className={ classnames(
								'wp-block-coblocks-image-card__img-wrapper', {
									'has-shadow': hasImgShadow,
									'has-no-image': ! imgUrl || null,
								}
							) }
						>
							{ imgUrl &&
								<img src={ imgUrl } alt={ alt } />
							}
						</div>
					</div>
					<div className="wp-block-coblocks-image-card__card-wrapper">
						<div
							className={ cardBackgroundClasses }
							style={ cardStyles }
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
