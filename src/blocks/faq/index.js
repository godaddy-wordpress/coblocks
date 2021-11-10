/**
 * External dependencies
 */
import { FaqIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import example from './example';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { Icon } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const settings = {
	description: __( 'Add a list of questions and answers.', 'coblocks' ),
	edit,
	example,
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'FAQ', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide', 'full' ],
		multiple: false,
	},
	title: _x( 'FAQ', 'block name', 'coblocks' ),
};

export { metadata, name, category, settings };
