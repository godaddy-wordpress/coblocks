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

const settings = {
	title: 'Gist',
	description: __( 'Embed GitHub gists by adding a gist link.' ),
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

export { name, icon, settings };
