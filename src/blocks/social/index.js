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
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/social', {

	title: __( 'Social ' ),

	description: __( 'Add a social sharing module.' ),

	icon: {
		src: icons.social,
	},

	category: 'coblocks',

	keywords: [
		__( 'share' ),
		__( 'twitter' ),
		__( 'coblocks' ),
	],

	supports: {
		customClassName: false,
		html: false,
	},

	edit: Edit,

	save() {
		return null;
	},
} );
