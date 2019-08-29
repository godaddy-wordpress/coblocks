
/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import metadata from './block.json';
import edit from './edit';
import icon from './icon';
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

const settings = {
	title: __( 'Author' ),
	description: __( 'Add an author biography.' ),
	icon,
	keywords: [ __( 'biography' ), __( 'profile' ), 'coblocks' ],
	attributes,
	transforms,
	edit,
	save,
};

export { name, settings };
