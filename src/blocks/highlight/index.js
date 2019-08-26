/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './../../utils/icons';
import edit from './edit';
import metadata from './block.json';
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

const title = __( 'Highlight' );

const icon = icons.highlight;

const settings = {
	title,

	description: __( 'Highlight text.' ),

	keywords: [ __( 'text' ), __( 'paragraph' ), __( 'coblocks' ) ],

	attributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
