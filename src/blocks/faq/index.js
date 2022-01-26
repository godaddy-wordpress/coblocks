/**
 * External dependencies
 */
import { FaqIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies.
 */
import edit from './edit';
import example from './example';
import { getBlockIconColor } from '../../utils/helper';
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
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'FAQ', 'coblocks' ),
		/* translators: block keyword */
		__( 'Frequently asked questions', 'coblocks' ),
	],
	save,
	supports: {
		align: [ 'wide', 'full' ],
		multiple: false,
	},
	title: _x( 'FAQ - Frequently Asked Questions', 'block name', 'coblocks' ),
};

export { metadata, name, category, settings };
