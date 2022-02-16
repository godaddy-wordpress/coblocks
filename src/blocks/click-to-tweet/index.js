/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { Icon } from '@wordpress/components';
import { TwitterIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	deprecated,
	/* translators: block description */
	description: __( 'Add a quote for readers to tweet via Twitter.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			content: __( 'The easiest way to promote and advertise your blog, website, and business on Twitter.', 'coblocks' ),
		},
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'share', 'coblocks' ),
		/* translators: block keyword */
		__( 'twitter', 'coblocks' ),
	],
	save,
	/* translators: block name */
	title: __( 'Click to Tweet', 'coblocks' ),
	transforms,
};

export { name, category, metadata, settings };
