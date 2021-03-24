/**
 * Internal dependencies.
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Service Column', 'coblocks' ),
	/* translators: block description */
	description: __( 'A column intended to list service items within a services block.', 'coblocks' ),
	keywords: [],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
		selection: false,
	},
	example: {
		attributes: {},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

