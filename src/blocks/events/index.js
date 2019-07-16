/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import edit from './edit';
import icons from './icons';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { name } = metadata;

const icon = icons.events;

const settings = {
	title: __( 'Events' ),
	description: __( 'Add events or display any public calendar.' ),
	keywords: [ __( 'events' ), __( 'calendar' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
};

export { metadata, name, icon, settings };
