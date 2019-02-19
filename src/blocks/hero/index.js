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
	...DimensionsAttributes,
	...BackgroundAttributes,
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

	edit: Edit,

	save( { attributes, className } ) {
		return null;
	},
};

export { name, title, icon, settings };
