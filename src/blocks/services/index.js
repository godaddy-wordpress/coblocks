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

// const icon = icons.services;

const settings = {
	title: __( 'Services' ),
	description: __( 'Add up to four columns of services to display.' ),
	icon,
	keywords: [ __( 'features' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		reusable: false,
		html: false,
	},
	attributes,
	edit,
	save,
};

export { name, settings };
