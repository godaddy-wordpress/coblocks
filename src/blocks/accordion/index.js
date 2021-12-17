/**
 * External dependencies a
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
import { InnerBlocks } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Accordion', 'coblocks' ),
	/* translators: block description */
	description: __( 'Organize content within collapsable accordion items.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'tabs', 'coblocks' ),
		/* translators: block keyword (abbreviation for "frequently asked questions") */
		__( 'faq', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	attributes,
	example: {
		attributes: {
			count: 2,
		},
	},
	transforms,
	edit,
	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, category, metadata, settings };
