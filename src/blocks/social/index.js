/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Block constants
 */
const name = 'social';

const title = __( 'Social' );

const icon = icons.social;

const keywords = [
	__( 'share' ),
	__( 'twitter' ),
	__( 'coblocks' ),
];

const settings = {

	title: title,

	description: __( 'Add a social sharing module.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	supports: {
		customClassName: false,
		html: false,
	},

	edit: Edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
