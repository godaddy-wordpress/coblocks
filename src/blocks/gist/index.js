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
const { __ } = wp.i18n;
/**
 * Block constants
 */
const { attributes, name } = metadata;

const settings = {
	title: 'Gist',
	description: __( 'Embed GitHub gists by adding a gist link.' ),
	icon,
	keywords: [ __( 'code' ), 'github', 'coblocks' ],
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

export { name, metadata, settings };
