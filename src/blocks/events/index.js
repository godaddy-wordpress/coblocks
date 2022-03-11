/**
 * External dependencies
 */
import { EventsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import deprecated from './deprecated';
import edit from './edit';
import example from './example';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies.
 */
import { Icon } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	deprecated,
	description: __( 'Add a list of events or display events from a public calendar.', 'coblocks' ),
	edit,
	example,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'calendar', 'coblocks' ),
		/* translators: block keyword */
		__( 'date', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide', 'full' ],
	},
	title: _x( 'Events', 'block name', 'coblocks' ),
	transforms,
};

export { metadata, name, category, settings };
