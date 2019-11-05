/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Checkbox', 'block name', 'coblocks' ),
	keywords: [ _x( 'option', 'block keyword', 'coblocks' ) ],
	description: __( 'A checkbox field where multiple checkboxes can be selected.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit: editMultiField( 'checkbox' ),
	save: () => null,
};

export { name, category, metadata, settings };
