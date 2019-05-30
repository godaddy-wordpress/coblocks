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
const { __, _x } = wp.i18n;
const { Component } = wp.element;

/**
 * Block constants
 */
const name = 'social';

const title = __( 'Social' );

const icon = icons.social;

const keywords = [
	__( 'share' ),
	__( 'coblocks' ),
];

const settings = {

	title: title,

	description: __( 'Add social sharing buttons to help you get likes and shares.' ),

	keywords: keywords,

	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style' ) , isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style' ) },
	],

	edit: Edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
