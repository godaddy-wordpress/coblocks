/**
 * External dependencies
 */
import { FormRadioIcon as icon } from '@godaddy-wordpress/coblocks-icons';

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
	title: __( 'Radio', 'coblocks' ),
	/* translators: block description */
	description: __( 'A field with multiple options where only one choice can be made.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'choose', 'coblocks' ),
		/* translators: block keyword */
		__( 'select', 'coblocks' ),
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
	edit: editMultiField( 'radio' ),
	save: () => null,
};

export { name, category, metadata, settings };
