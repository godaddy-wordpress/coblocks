/**
 * External dependencies
 */
import { AccordionItemIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Accordion Item', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add collapsable accordion items to accordions.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'tabs', 'coblocks' ),
		/* translators: block keyword (abbreviation for "frequently asked questions") */
		__( 'faq', 'coblocks' ),
	],
	parent: [ 'coblocks/accordion' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
