/**
 * External dependencies
 */
import { CounterIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...metadata.attributes,
};

const settings = {
	attributes,
	edit,
	example: {
		attributes: {
			align: 'center',
			counterDescription: ' ',
			counterText: '10 years, 2 months, 20 days, 4 hours',
			fontSize: 'medium',
		},
	},
	icon: <Icon icon={ icon } />,
	save,
	title: __( 'Counter', 'coblocks' ),
};

export { name, category, metadata, settings };

