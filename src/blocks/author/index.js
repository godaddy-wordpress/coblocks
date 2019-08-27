
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './edit';
import icons from './../../utils/icons';
import transforms from './transforms';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'author';

const title = __( 'Author' );

const icon = icons.author;

const blockAttributes = {
	biography: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-author__biography',
		default: [],
	},
	heading: {
		type: 'string',
		selector: '.wp-block-coblocks-author__heading',
		default: __( 'Written by...' ),
	},
	name: {
		type: 'string',
		selector: '.wp-block-coblocks-author__name',
	},
	imgId: {
		type: 'number',
	},
	imgUrl: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	textAlign: {
		type: 'string',
	},
};

const settings = {

	title,

	description: __( 'Add an author biography.' ),

	keywords: [ __( 'biography' ), __( 'profile' ), 'coblocks' ],

	attributes: blockAttributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
