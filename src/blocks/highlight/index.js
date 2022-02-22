/**
 * External dependencies
 */
import { HighlightIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

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
	attributes,
	/* translators: block description */
	description: __( 'Draw attention and emphasize important narrative.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			content: __( 'Add a highlight effect to paragraph text in order to grab attention and emphasize important narrative.', 'coblocks' ),
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'text', 'coblocks' ),
		/* translators: block keyword */
		__( 'paragraph', 'coblocks' ),
	],
	save,
	/* translators: block name */
	title: __( 'Highlight', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };
