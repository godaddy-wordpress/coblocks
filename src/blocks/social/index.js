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
	__( 'icon' ),
	__( 'coblocks' ),
];

const settings = {

	title: title,

	description: __( 'Add social sharing buttons to help you get likes and shares.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	styles: [
		{ name: 'icon', label: __( 'Icon' ), isDefault: true },
		// { name: 'mask', label: __( 'Mask' ), isDefault: true },
		{ name: 'text', label: __( 'Text' ) },
		{ name: 'icon-and-text', label: __( 'Icon & Text' ) },
	],

	edit: Edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
