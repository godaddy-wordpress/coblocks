
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './edit';
import icons from './../../utils/icons';
import transforms from './transforms';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Author' );

const icon = icons.author;

const settings = {

	title,

	description: __( 'Add an author biography.' ),

	keywords: [	__( 'biography' ),	__( 'profile' ), __( 'coblocks' ) ],

	attributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
