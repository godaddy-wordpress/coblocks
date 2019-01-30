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
import iconsSelection from './toolbar-components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.editor;

/**
 * Block constants
 */
const name = 'icon';

const title = __( 'Icon' );

const icon = icons.icon;

const keywords = [
	__( 'icon' ),
	__( 'icons' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	icon: {
		type: 'string',
		default: 'logo',
	},
	align: {
		type: 'string',
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
		default: 100,
	},
	width: {
		type: 'number',
		default: 100,
	},
};

const settings = {

	title: title,

	description: __( 'Content and marketing icons.' ),

	keywords: keywords,

	attributes: blockAttributes,

	edit: Edit,

	save( { attributes, className } ) {

		const {
			icon,
			backgroundColor,
			customBackgroundColor,
			customTextColor,
			textAlign,
			textColor,
			height,
			width,
		} = attributes;

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
			textAlign: textAlign,
			height: height,
			width: width,
		};

		return (
			<div className={ className }>
				<div className={ classes } style={ styles }>
					{ icon ? iconsSelection[ icon ] : iconsSelection.logo }
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
