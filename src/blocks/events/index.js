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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	title: _x( 'Events', 'block name', 'coblocks' ),
	description: __( 'Add a list of events or display events from a public calendar.', 'coblocks' ),
	icon,
	keywords: [ _x( 'calendar', 'block keyword', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
};

export { metadata, name, category, settings };
