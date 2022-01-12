/**
 * External dependencies
 */
import { EventsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import example from './example';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies.
 */
import { __, _x } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	title: _x( 'Events', 'block name', 'coblocks' ),
	description: __( 'Add a list of events or display events from a public calendar.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'calendar', 'coblocks' ),
		/* translators: block keyword */
		__( 'date', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	// example,
	transforms,
	edit,
	save,
	deprecated
};

export { metadata, name, category, settings };
