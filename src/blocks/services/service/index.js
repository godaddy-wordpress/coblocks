/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { attributes, name } = metadata;

const settings = {
	title: __( 'Service' ),
	description: __( 'A single service item within a services block.' ),
	icon,
	keywords: [],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes,
	edit,
	save,
};

export { name, metadata, settings };
