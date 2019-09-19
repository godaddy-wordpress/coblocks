/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Gist', 'block name' ),
	description: __( 'Embed GitHub gists by adding a gist link.' ),
	icon,
	keywords: [ _x( 'code', 'block keyword' ), 'github', 'coblocks' ],
	supports: {
		html: false,
		align: [ 'wide' ],
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
