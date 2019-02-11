/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
// import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;


/**
 * Block constants
 */
const name = 'buttons';

const title = __( 'Buttons' );

const icon = icons.buttons;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	gutter: {
		type: 'string',
		default: 'large',
	},
	items: {
		type: 'number',
		default: 2,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
};

const settings = {

	title: title,

	description: __( 'Prompt visitors to take action with multiple buttons, side by side.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		stackedOnMobile: true
	},

	edit: Edit,

	save( { attributes, className } ) {
		return null;
	},
};

export { name, title, icon, settings };
