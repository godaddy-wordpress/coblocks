/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import metadata from './block.json';
import icons from './icons';
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

const icon = icons.service;

const settings = {
	title: __( 'Service' ),
	description: __( 'A single service item within a services block.' ),
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

export { name, icon, settings };
