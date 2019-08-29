
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { attributes, name } = metadata;

// const icon = icons.form;

const settings = {
	title: __( 'Form' ),
	description: __( 'Add a simple form to your page.' ),
	icon,
	keywords: [ __( 'email' ), __( 'about' ), __( 'contact' ) ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes,
	edit,
	save: InnerBlocks.Content,
};

export { name, settings };
