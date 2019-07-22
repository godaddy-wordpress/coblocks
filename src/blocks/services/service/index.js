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
const { name } = metadata;

const icon = icons.service;

const settings = {
	title: __( 'Service' ),
	description: __( 'service description' ),
	keywords: [],
	attributes: metadata.attributes,
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	edit,
	save,
};

export { metadata, name, icon, settings };
