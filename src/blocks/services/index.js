/**
 * Internal dependencies.
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * External dependencies
 */
import { ServicesIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Services', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add up to four columns of services to display.', 'coblocks' ),
	icon: <Icon icon={ ServicesIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'features', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		gutter: {
			default: 'medium',
			customDefault: 1.6,
		},
		reusable: false,
		html: false,
	},
	example: {
		attributes: {
			align: 'full',
		},
	},
	attributes,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
