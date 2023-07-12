/**
 * External dependencies
 */
import { FormSubmitIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

const { name, category, attributes } = metadata;

const settings = {
	attributes,
	description: __( 'A button for submitting form data.', 'coblocks' ),
	edit,
	/* translators: block description */
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'submit', 'coblocks' ),
		/* translators: block keyword */
		__( 'button', 'coblocks' ),
	],
	parent: [ 'coblocks/form' ],
	save: () => null,
	styles: [
		{ isDefault: true, label: __( 'Fill', 'coblocks' ), name: 'fill' },
		{ label: __( 'Outline', 'coblocks' ), name: 'outline' },
		{ label: __( 'Circular', 'coblocks' ), name: 'circular' },
		{ label: __( '3D', 'coblocks' ), name: '3d' },
		{ label: __( 'Shadow', 'coblocks' ), name: 'shadow' },
	],
	supports: {
		customClassName: true,
		html: false,
		multiple: false,
		reusable: false,
	},
	/* translators: block name */
	title: __( 'Submit', 'coblocks' ),
};

export { name, category, metadata, settings };
