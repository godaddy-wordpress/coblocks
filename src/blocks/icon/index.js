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
import svg from './icons/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.editor;

/**
 * Set the default value for icon size.
 */
export const DEFAULT_ICON_SIZE = 40;

/**
 * Block constants
 */
const name = 'icon';

const title = __( 'Icon' );

const icon = icons.icon;

const keywords = [
	__( 'icons' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	icon: {
		type: 'string',
		default: 'heart',
	},
	iconSize: {
		type: 'string',
		default: 'medium',
	},
	style: {
		type: 'string',
		default: 'filled',
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	height: {
		type: 'number',
		default: 60, // Medium
	},
	width: {
		type: 'number',
		default: 60, // Medium
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
	padding: {
		type: 'number',
		default: 0,
	},
};

const settings = {

	title: title,

	description: __( 'Add a stylized graphic symbol to communicate something more.' ),

	keywords: keywords,

	attributes: blockAttributes,

	edit: Edit,

	styles: [
		{ name: 'filled', label: __( 'Filled' ), isDefault: true },
		{ name: 'outlined', label: __( 'Outlined' ) },
	],

	save( { attributes, className } ) {

		const {
			icon,
			style,
			backgroundColor,
			customBackgroundColor,
			customTextColor,
			contentAlign,
			textColor,
			height,
			width,
			borderRadius,
			padding,
		} = attributes;

		let iconStyle = 'filled';

		if( attributes.className ){
			if( attributes.className.includes( 'is-style-outlined' ) ){
				iconStyle = 'outlined';
			} else if( attributes.className.includes( 'is-style-rounded' ) ){
				iconStyle = 'rounded';
			}
		}

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 'wp-block-coblocks-icon__inner', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			fill: textClass ? undefined : customTextColor,
			height: height,
			width: width,
			borderRadius: borderRadius ? borderRadius + 'px' : undefined,
			padding: padding ? padding + 'px' : undefined,
		};

		return (
			<div className={ className } style={ { textAlign: contentAlign ? contentAlign : undefined } }>
				<div className={ classes } style={ styles }>
					{ svg[ iconStyle ][ icon ].icon }
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
