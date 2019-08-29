/**
 * Styles.
 */
import './styles/style.scss';
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Author' ),
	description: __( 'Add an author biography to build credibility and authority.' ),
	icon,
	keywords: [ __( 'biography' ), __( 'profile' ), 'coblocks' ],
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
