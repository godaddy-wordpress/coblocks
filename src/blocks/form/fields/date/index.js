/**
 * External dependencies
 */
import { FormDateIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Date', 'coblocks' ),
	/* translators: block description */
	description: __( 'A field for requesting date selections with a date picker.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'calendar', 'coblocks' ),
		/* translators: block keyword */
		__( 'day', 'coblocks' ),
		/* translators: block keyword */
		__( 'month', 'coblocks' ),
		/* translators: block keyword */
		__( 'year', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
		labelColor: true,
	},
	attributes,
	transforms,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
