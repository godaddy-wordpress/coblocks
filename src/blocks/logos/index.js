/**
 * Styles
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'logos';

const title = __( 'Logos & Badges' );

const icon = icons.logos;

const keywords = [
	__( 'clients' ),
	__( 'proof' ),
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
			width: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-width',
			},
		},
		default: [],
	},
	grayscale: {
		type: 'boolean',
		default: false,
	},
};

const settings = {
	title: title,
	description: __( 'Add logos, badges, or certifications to build credibility.' ),
	keywords: keywords,
	attributes: blockAttributes,
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit: edit,
	save: save,
};

export { name, title, icon, settings };
