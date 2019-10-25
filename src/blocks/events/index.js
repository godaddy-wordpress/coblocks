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
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const icon = icons.events;

const settings = {
	title: __( 'Events', 'coblocks' ),
	description: __( 'Add events or display any public calendar.', 'coblocks' ),
	icon,
	keywords: [ __( 'events', 'coblocks' ), __( 'calendar', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
};

export { metadata, name, category, settings };
