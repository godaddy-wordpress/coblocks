/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import { Icon } from '@wordpress/components';
import { TwitterIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Click to Tweet', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a quote for readers to tweet via Twitter.', 'coblocks' ),
	icon: <Icon icon={ TwitterIcon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'share', 'coblocks' ),
		/* translators: block keyword */
		__( 'twitter', 'coblocks' ),
	],
	example: {
		attributes: {
			content: __( 'The easiest way to promote and advertise your blog, website, and business on Twitter.', 'coblocks' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
