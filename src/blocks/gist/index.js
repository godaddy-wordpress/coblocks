/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import icons from './../../utils/icons';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.github;

const title = __( 'Gist' );

const settings = {
	title,

	description: __( 'Embed GitHub gists by adding the gist link.' ),

	keywords: [ __( 'code' ), __( 'github' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		html: false,
		align: [ 'wide' ],
	},

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings };
