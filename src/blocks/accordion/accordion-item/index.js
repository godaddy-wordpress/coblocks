/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import save from './save';
import icons from './../../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.accordionItem;

const settings = {
	title: __( 'Accordion Item' ),

	description: __( 'Add collapsable accordion items to accordions.' ),

	keywords: [ __( 'tabs' ), __( 'faq' ), __( 'coblocks' ) ],

	parent: [ 'coblocks/accordion' ],

	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},

	attributes,

	edit,

	save,
};

export { name, icon, settings };
