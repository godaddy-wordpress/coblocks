/**
 * External dependencies
 */
import { MapIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'Add an address or location to drop a pin on a Google map.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			address: 'Tempe, Arizona',
			align: 'wide',
		},
	},
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'address', 'coblocks' ),
		/* translators: block keyword */
		__( 'maps', 'coblocks' ),
		/* translators: block keyword */
		__( 'google', 'coblocks' ),
		/* translators: block keyword */
		__( 'directions', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	/* translators: block name */
	title: __( 'Map', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };
