/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import save from './save';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'accordion-item';

const title = __( 'Accordion Item' );

const icon = icons.accordionItem;

const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-accordion__title',
	},
	open: {
		type: 'boolean',
		default: false,
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	borderColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

const settings = {

	title,

	description: __( 'Add collapsable accordion items to accordions.' ),

	keywords: [	__( 'tabs' ), __( 'faq' ), __( 'coblocks' )	],

	parent: [ 'coblocks/accordion' ],

	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},

	attributes: blockAttributes,

	edit,

	save,
};

export { name, title, icon, settings };
