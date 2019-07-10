/**
 * Internal dependencies
 */
import './styles/editor.scss';
import Edit from './components/edit';
import Save from './components/save';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;

/**
 * Block constants
 */
const name = 'logo';

const title = __( 'Logos' );

const icon = icons.logos;

const keywords = [
	__( 'logo' ),
	__( 'logos' ),
	__( 'badge' ),
];

const blockAttributes = {
	images: {
		type: 'array',
		default: [],
	},
	blackAndWhite: {
		type: 'boolean',
		default: false,
	},
	align: {
		type: 'string',
		default: 'wide',
	},
	fullwidth: {
		type: 'boolean',
		default: true,
	},
	height: {
		type: 'number',
		default: 100,
	},
	width: {
		type: 'number',
		default: 300,
	},
};

const settings = {

	title: title,

	description: __( 'Add a set of logos or badges' ),

	keywords: keywords,

	category: 'coblocks-galleries',

	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: blockAttributes,

	edit: Edit,

	save: Save,

	deprecated: [],
};

export { name, title, icon, settings };
