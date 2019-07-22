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

const icon = icons.services;

const settings = {
	title: __( 'Services' ),
	description: __( 'services description' ),
	keywords: [],
	attributes: metadata.attributes,
	supports: {
		align: [ 'wide', 'full' ],
		reusable: false,
		html: false,
	},
	edit,
	save,
};

export { metadata, name, icon, settings };
