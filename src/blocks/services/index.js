/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Services', 'block name' ),
	description: __( 'Add up to four columns of services to display.' ),
	icon,
	keywords: [ _x( 'features', 'block keyword' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		reusable: false,
		html: false,
	},
	example: {
		attributes: {
			align: 'full',
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
