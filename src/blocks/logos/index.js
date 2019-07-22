/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import Save from './components/save';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'logo';

const title = __( 'Logos' );

const icon = icons.logos;

const keywords = [
	__( 'clients' ),
	__( 'badges' ),
	__( 'testimonials' ),
];

const blockAttributes = {
	images: {
		type: 'array',
		source: 'query',
		selector: 'img',
		query: {
			url: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
			},
			alt: {
				type: 'string',
				source: 'attribute',
				attribute: 'alt',
			},
			id: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-id',
			},
		},
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
