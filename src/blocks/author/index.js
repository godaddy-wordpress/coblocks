
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import metadata from './block.json';
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
const { attributes, name } = metadata;

const icon = icons.author;

const settings = {
	title: __( 'Author' ),

	description: __( 'Add an author biography.' ),

	keywords: [ __( 'biography' ), __( 'profile' ), __( 'coblocks' ) ],

	attributes,

	transforms,

	edit,

	save,
};

export { name, icon, settings };
