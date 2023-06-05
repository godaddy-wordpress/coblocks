/* global coblocksBlockData */

/**
 * External dependencies
 */
import { FormIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import variations from './variations';

/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

const { name, category, attributes } = metadata;
let conditionalBlockAttributes = { ...attributes };
if ( typeof coblocksBlockData !== 'undefined' ) {
	conditionalBlockAttributes = {
		...conditionalBlockAttributes,
		subject: {
			default: coblocksBlockData.form.emailSubject,
			type: 'string',
		},
		successText: {
			default: coblocksBlockData.form.successText,
			type: 'string',
		},
		to: {
			default: coblocksBlockData.form.adminEmail,
			type: 'string',
		},
	};
}

const settings = {
	attributes: conditionalBlockAttributes,
	edit,
	icon: <Icon icon={ icon } />,
	save: InnerBlocks.Content,
	variations,
};

export { name, category, metadata, settings };
