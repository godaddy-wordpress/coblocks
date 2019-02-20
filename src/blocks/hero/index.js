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
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses, BackgroundImageTransforms } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;


/**
 * Block constants
 */
const name = 'hero';

const title = __( 'Hero' );

const icon = icons.hero;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'call to action' ),
];

const blockAttributes = {
	align: {
		type: 'string',
		default: 'full',
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
	layout: {
		type: 'string',
		default: 'center-left',
	},
	fullscreen: {
		type: 'boolean',
		default: false,
	},
	maxWidth: {
		type: 'number',
		default: 300,
	},
	...DimensionsAttributes,
	...BackgroundAttributes,

	saveCoBlocksMeta: {
		type: 'boolean',
		default: true,
	},
	paddingSize: {
		type: 'string',
		default: 'advanced',
	},
	paddingUnit: {
		type: 'string',
		default: '%',
	},
	paddingTop: {
		type: 'number',
		default: 8,
	},
	paddingRight: {
		type: 'number',
		default: 8,
	},
	paddingBottom: {
		type: 'number',
		default: 8,
	},
	paddingLeft: {
		type: 'number',
		default: 8,
	},
	customBackgroundColor: {
		type: 'string',
		default: '#f4e9e0',
	},
};

const settings = {

	title: title,

	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms: {
		from: [
			{
				type: 'prefix',
				prefix: '::hero',
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
				fullscreen,
				maxWidth,
				backgroundImg,
				paddingSize,
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textColor,
			} = attributes;

			const textClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			let classlist = {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				[ `coblocks-hero-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			};

			// if( coblocks && ( typeof coblocks.id != 'undefined' ) ) {
			// 	classlist = Object.assign( classlist, [ `coblocks-hero-${ coblocks.id }` ] );
			// }

			const classes = classnames( classlist );
			
			const styles = {
				color: textClass ? undefined : customTextColor,
			};

			const innerClasses = classnames(
				'wp-block-coblocks-hero__inner',
				...BackgroundClasses( attributes ), {
					[ `hero-${ layout }-align` ] : layout,
					'has-text-color': textColor && textColor.color,
					'has-padding': paddingSize && paddingSize != 'no',
					[ `has-${ paddingSize }-padding` ] : paddingSize && paddingSize != 'advanced',
					[ backgroundClass ]: backgroundClass,
					'is-fullscreen': fullscreen,
			} );
			
			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
				color: textColor ? textColor.color : undefined,
			};

			return (
				<div className={ classes } style={ styles } >
					<div className={ innerClasses } style={ innerStyles }>
						<div className="wp-block-coblocks-hero__box" 
							style={ {
								width: maxWidth ? maxWidth + 'px' : undefined, 
							} }
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
	},
};

export { name, title, icon, settings };
