
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.form;

const settings = {
	title: __( 'Form' ),
	description: __( 'Add a simple form to your page.' ),
	keywords: [ __( 'email' ), __( 'about' ), __( 'contact' ) ],
	attributes: metadata.attributes,
	supports: {
		reusable: false,
		html: false,
	},
	edit,
	save: InnerBlocks.Content,

};

export { name, icon, settings };
