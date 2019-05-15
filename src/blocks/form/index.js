/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;

/**
 * Block constants
 */
const name = 'form';

const title = __( 'Form' );

const icon = icons.form;

const keywords = [
	__( 'email' ),
	__( 'about' ),
	__( 'feedback' ),
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
	hasFormSettingsSet: {
		type: 'string',
		default: null,
	},
};

const schema = {
	div: {
		classes: [ 'wp-block-coblocks-form' ],
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

	edit: Edit,

	save: InnerBlocks.Content,

};

export { name, title, icon, settings };
