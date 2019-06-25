/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'form';

const title = __( 'Form' );

const icon = icons.form;

const keywords = [
	__( 'email' ),
	__( 'about' ),
	__( 'contact' ),
];

const blockAttributes = {
	subject: {
		type: 'string',
		default: null,
	},
	to: {
		type: 'string',
		default: null,
	},
	submitButtonText: {
		type: 'string',
		default: __( 'Submit' ),
	},
	customBackgroundButtonColor: {
		type: 'string',
	},
	customTextButtonColor: {
		type: 'string',
	},
	submitButtonClasses: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add a simple form to your page.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		reusable: false,
		html: false,
	},

	className: false,

	edit: edit,

	save: InnerBlocks.Content,

};

export { name, title, icon, settings };
