/**
 * External dependencies
 */
import { AccordionIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	/* translators: block description */
	description: __( 'Organize content within collapsable accordion items.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			count: 2,
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'tabs', 'coblocks' ),
		/* translators: block keyword (abbreviation for "frequently asked questions") */
		__( 'faq', 'coblocks' ),
	],
	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	/* translators: block name */
	title: __( 'Accordion', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };
