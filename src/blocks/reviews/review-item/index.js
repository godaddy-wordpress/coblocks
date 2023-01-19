/**
 * External dependencies
 */
import { MountainsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies.
 */
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	description: __( 'A review within the reviews block.', 'coblocks' ),
	edit,
	icon: <Icon icon={ icon } />,
	parent: [ 'coblocks/reviews' ],
	save: () => <InnerBlocks.Content />,
	supports: {
		html: false,
		reusable: false,
	},
	title: _x( 'Review Item', 'block name', 'coblocks' ),
};

export { name, category, icon, metadata, settings };
