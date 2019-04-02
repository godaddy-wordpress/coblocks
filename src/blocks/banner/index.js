/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';
import BackgroundPanel, { BackgroundAttributes, BackgroundClasses, BackgroundTransforms } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;

/**
 * Block constants
 */
const name = 'banner';

const title = __( 'Banner' );

const icon = icons.banner;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'call to action' ),
];

const blockAttributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	layout: {
		type: 'string',
		default: 'full',
	},
	heading: {
		type: 'string',
		default: __( 'Ready to get started?' ),
	},
	content: {
		type: 'string',
		default: __( 'Prompt visitors to take action with a call to action and a button.' ),
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	saveCoBlocksMeta: {
		type: 'boolean',
		default: true,
	},
	paddingSize: {
		type: 'string',
		default: 'huge',
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
	paddingTop: {
		type: 'number',
		default: 60,
	},
	paddingBottom: {
		type: 'number',
		default: 60,
	},
	paddingLeft: {
		type: 'number',
		default: 60,
	},
	paddingRight: {
		type: 'number',
		default: 60,
	},
	customBackgroundColor: {
		type: 'string',
		default: '#f3f3f3',
	},
	...ResponsiveBaseControlAttributes,
	height: {
		type: 'number',
		default: 360,
	},
};

const settings = {

	title: title,

	description: __( 'Prompt visitors to take action with a call to action and a button.' ),

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
				prefix: ':banner',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
	},

	edit: Edit,

	save( { attributes, className } ) {
		const {
				coblocks,
				layout,
				heading,
				content,
				backgroundImg,
				backgroundType,
				paddingSize,
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textColor,
				contentAlign,
				focalPoint,
				hasParallax,
				videoMuted,
				videoLoop,
				height,
			} = attributes;

			const textClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			let classlist = {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				[ `coblocks-banner-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			};

			const classes = classnames( classlist );

			const styles = {
				color: textClass ? undefined : customTextColor,
			};

			const innerClasses = classnames(
				'wp-block-coblocks-banner__inner',
				...BackgroundClasses( attributes ), {
					[ `banner-${ layout }-align` ] : layout,
					'has-text-color': textColor && textColor.color,
					'has-padding': paddingSize && paddingSize != 'no',
					[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
					[ backgroundClass ]: backgroundClass,
					[ `has-${ contentAlign }-content` ]: contentAlign,
			} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				backgroundImage: backgroundImg && backgroundType == 'image' ? `url(${ backgroundImg })` : undefined,
				color: textColor ? textColor.color : undefined,
				backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
				minHeight: height,
			};

			return (
				<div className={ classes } style={ styles } >
					<div className={ innerClasses } style={ innerStyles }>
						{ backgroundType == 'video' ?
							<div className="coblocks-video-background">
								<video playsinline="" autoplay="" muted={ videoMuted } loop={ videoLoop } src={ backgroundImg } ></video>
							</div>
						: null }
						<div className="wp-block-coblocks-banner__content">
							{ ( ! RichText.isEmpty( heading ) ) && (
								<RichText.Content
									tagName="h2"
									className="wp-block-coblocks-banner-title"
									value={ heading }
								/>
							) }

							{ ( ! RichText.isEmpty( content ) ) && (
								<RichText.Content
									tagName="p"
									className="wp-block-coblocks-banner-content"
									value={ content }
								/>
							) }
						</div>

						<div className="wp-block-coblocks-banner__buttons">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
	},
};

export { name, title, icon, settings };
