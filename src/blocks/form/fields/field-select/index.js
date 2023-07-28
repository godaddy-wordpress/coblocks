/**
 * External dependencies
 */
import { FormSelectIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
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
	title: __( 'Select', 'coblocks' ),
	/* translators: block description */
	description: __( 'A dropdown field with multiple options where only one choice can be made.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'dropdown', 'coblocks' ),
		/* translators: block keyword */
		__( 'option', 'coblocks' ),
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
	edit: editMultiField( 'select' ),
	save: () => null,
};

export { name, category, metadata, settings };
