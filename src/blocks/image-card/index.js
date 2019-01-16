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
import ResizableSpacer, { ResizableSpacerTransforms } from '../../components/resizable-spacer/';;
import ButtonPanel, { ButtonPanelAttributes, ButtonPanelClasses, ButtonTransforms } from '../../components/button-panel';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;

/**
 * Use either the block's imgUrl as a fallback if no backgroundImg is uploaded.
 * @type {Object}
 */
function CustomTransformAttributes( attributes ) {
	if ( attributes.backgroundImg ) {
		return {
			backgroundImg: attributes.backgroundImg,
		};
	} else {
		return {
			backgroundImg: attributes.imgUrl,
		};
	}
};

/**
 * Block constants
 */
const name = 'image-card';

const title = __( 'Image Card' );

const icon = icons.imageCard;

const keywords = [
	__( 'gallery' ),
	__( 'feature' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	heading: {
		source: 'children',
		selector: '.wp-block-coblocks-image-card__heading',
	},
	content: {
		source: 'children',
		selector: '.wp-block-coblocks-image-card__content',
	},
	imgUrl: {
		type: 'string',
	},
	alt: {
		attribute: 'alt',
		selector: 'img',
		source: 'attribute',
		type: 'string',
	},
	align: {
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
	padding: {
		type: 'number',
		default: 0,
	},
	cardBackgroundColor: {
		type: 'string',
	},
	customCardBackgroundColor: {
		type: 'string',
	},
	spacerHeading: {
		type: 'number',
		default: 13,
	},
	spacerContent: {
		type: 'number',
		default: 13,
	},
	...BackgroundAttributes,
	...ButtonPanelAttributes,
};

const settings = {

	title: title,

	description: __( 'Add an image card with an offset text block.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms: ( getBlockType( 'coblocks/image-panel' ) ) ? {
		to: [
			{
				type: 'block',
				blocks: [ 'coblocks/image-panel' ],
				transform: ( attributes ) => {
					return createBlock( 'coblocks/image-panel', {

						// General transforms used throughout our blocks
						...BackgroundImageTransforms( attributes ),
						...HeadingTransforms( attributes ),
						...TypographyTransforms( attributes ),
						...ResizableSpacerTransforms( attributes ),

						// Override BackgroundImageTransforms
						backgroundImg: attributes.imgUrl,

						// RichText
						heading: attributes.heading,
						content: attributes.content,
						button: attributes.button,
						buttonUrl: attributes.buttonUrl,
						buttonTitle: attributes.buttonTitle,

						// Standard
						align: attributes.align,
						contentAlign: attributes.contentAlign,

						// Background
						backgroundColor: attributes.cardBackgroundColor,
						customBackgroundColor: attributes.customCardBackgroundColor,

						// Colors (other than typographic)
						buttonColor: attributes.buttonColor,
						customButtonColor: attributes.customButtonColor,
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'coblocks/call-to-action' ],
				transform: ( attributes ) => {
					return createBlock( 'coblocks/call-to-action', {

						// General transforms used throughout our blocks.
						...BackgroundImageTransforms( attributes ),
						...HeadingTransforms( attributes ),
						...TypographyTransforms( attributes ),
						...ResizableSpacerTransforms( attributes ),

						// RichText
						heading: attributes.heading,
						content: attributes.content,
						button: attributes.button,
						buttonUrl: attributes.buttonUrl,
						buttonTitle: attributes.buttonTitle,

						// Standard
						align: attributes.align,
						contentAlign: attributes.contentAlign,

						// Background
						backgroundColor: attributes.cardBackgroundColor,
						customBackgroundColor: attributes.customCardBackgroundColor,

						// Colors
						buttonColor: attributes.buttonColor,
						customButtonColor: attributes.customButtonColor,

						// Set custom attributes
						...CustomTransformAttributes( attributes ),
					} );
				},
			},
			{
				type: 'block',
				blocks: [ 'coblocks/image-box' ],
				transform: ( attributes ) => {
					return createBlock( 'coblocks/image-box', {

						// General transforms used throughout our blocks
						...BackgroundImageTransforms( attributes ),
						...HeadingTransforms( attributes ),
						...TypographyTransforms( attributes ),
						...ResizableSpacerTransforms( attributes ),

						// RichText
						heading: attributes.heading,
						content: attributes.content,
						button: attributes.button,
						buttonUrl: attributes.buttonUrl,
						buttonTitle: attributes.buttonTitle,

						// Standard
						align: attributes.align,
						contentAlign: attributes.contentAlign,

						// Background
						backgroundColor: attributes.backgroundColor,
						customBackgroundColor: attributes.customBackgroundColor,

						// Colors (other than typographic)
						buttonColor: attributes.buttonColor,
						customButtonColor: attributes.customButtonColor,
						boxBackgroundColor: attributes.cardBackgroundColor,
						customBoxBackgroundColor: attributes.customCardBackgroundColor,

						// Set custom attributes
						...CustomTransformAttributes( attributes ),
					} );
				},
			},
		],
		from: [
			{
				type: 'raw',
				selector: 'div.wp-block-coblocks-image-card',
				schema: {
					div: {
						classes: [ 'wp-block-coblocks-image-card' ],
					},
				},
			},
		],
	} : {},

	styles: [
		{ name: 'left', label: __( 'Left' ), isDefault: true },
		{ name: 'right', label: __( 'Right' ) },
	],

	edit: Edit,

	save( { attributes, className } ) {

		const {
			alt,
			backgroundColor,
			backgroundImg,
			button,
			buttonBackground,
			buttonBorderRadius,
			buttonColor,
			buttonFontFamily,
			buttonFontSize,
			buttonLineHeight,
			buttonTitle,
			buttonUrl,
			cardBackgroundColor,
			content,
			contentAlign,
			customBackgroundColor,
			customButtonBackground,
			customButtonColor,
			customButtonFontSize,
			customCardBackgroundColor,
			customFontSize,
			customHeadingColor,
			customHeadingFontSize,
			customTextColor,
			fontFamily,
			fontSize,
			hasCardShadow,
			hasImgShadow,
			heading,
			headingColor,
			headingFontFamily,
			headingFontSize,
			headingLevel,
			headingLineHeight,
			imgUrl,
			lineHeight,
			openTab,
			padding,
			spacerContent,
			spacerHeading,
			textColor,
		} = attributes;

		const tagName = 'h' + headingLevel;

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const cardBackgroundClass = getColorClassName( 'background-color', cardBackgroundColor );
		const buttonBackgroundClass = getColorClassName( 'background-color', buttonBackground );
		const headingClass = getColorClassName( 'color', headingColor );
		const buttonClass = getColorClassName( 'color', buttonColor );
		const buttonFontSizeClass = getFontSizeClass( buttonFontSize );
		const headingFontSizeClass = getFontSizeClass( headingFontSize );

		const backgroundClasses = classnames(
			className,
			...BackgroundClasses( attributes ), {
		} );

		const backgroundStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			padding: padding ? padding + '%' : undefined,
		};

		const cardBackgroundClasses = classnames(
			'wp-block-coblocks-image-card__card', {
			'has-background': cardBackgroundColor || customCardBackgroundColor,
			[ cardBackgroundClass ]: cardBackgroundClass,
			'has-shadow': hasCardShadow,
		} );

		const cardStyles = {
			backgroundColor: cardBackgroundClass ? undefined : customCardBackgroundColor,
			textAlign: contentAlign ? contentAlign : null,
		};

		const headingClasses = classnames(
			'wp-block-coblocks-image-card__heading', {
				'has-text-color': headingColor || customHeadingColor,
				[ headingClass ]: headingClass,
			}
		);

		const headingStyles = {
			color: headingClass ? undefined : customHeadingColor,
			fontSize: headingFontSizeClass ? undefined : customHeadingFontSize,
			fontFamily: headingFontFamily || null,
			lineHeight: headingLineHeight || null,
			marginBottom: spacerHeading ? spacerHeading + 'px' : undefined,
		};

		// Paragraph color class and styles.
		const contentClass = getColorClassName( 'color', textColor );
		const fontSizeClass = getFontSizeClass( fontSize );

		const contentClasses = classnames(
			'wp-block-coblocks-image-card__content', {
				'has-text-color': textColor || customTextColor,
				[ contentClass ]: contentClass,
			}
		);

		const contentStyles = {
			color: contentClass ? undefined : customTextColor,
			fontSize: fontSizeClass ? undefined : customFontSize,
			fontFamily: fontFamily || null,
			lineHeight: lineHeight || null,
			marginBottom: spacerContent ? spacerContent + 'px' : undefined,
		};

		const buttonClasses = classnames(
			'wp-block-coblocks__button',
			'block-coblocks__button', {
			'has-text-color': buttonColor || customButtonColor,
			[ buttonClass ]: buttonClass,
			'has-background': buttonBackground || customButtonBackground,
			[ buttonBackgroundClass ]: buttonBackgroundClass,
		} );

		const buttonStyles = {
			backgroundColor: buttonBackgroundClass ? undefined : customButtonBackground,
			color: buttonClass ? undefined : customButtonColor,
			fontSize: buttonFontSizeClass ? undefined : customButtonFontSize,
			fontFamily: buttonFontFamily || null,
			lineHeight: buttonLineHeight || null,
			borderRadius: buttonBorderRadius ? buttonBorderRadius + 'px' : null,
		};

		const buttonTarget = ( openTab ) ? '_blank' : null;

		return (

			<div
				className={ backgroundClasses }
				style={ backgroundStyles }
			>
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
						{ ! RichText.isEmpty( heading ) && (
							<RichText.Content
								tagName={ tagName }
								className={ headingClasses }
								value={ heading }
								style={ headingStyles }
							/>
						) }
						{ ! RichText.isEmpty( content ) && (
							<RichText.Content
								tagName="p"
								className={ contentClasses }
								value={ content }
								style={ contentStyles }
							/>
						) }
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
