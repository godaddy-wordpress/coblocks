/**
 * External dependencies
 */
import { GithubIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';
import { hasFormattingCategory } from '../../utils/block-helpers';

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
	title: __( 'Gist', 'coblocks' ),
	/* translators: block description */
	description: __( 'Embed a GitHub Gist.', 'coblocks' ),
	category: hasFormattingCategory ? 'common' : 'embed',
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		'github',
		/* translators: block keyword */
		__( 'code', 'coblocks' ),
	],
	supports: {
		html: false,
		align: [ 'wide' ],
	},
	attributes,
	transforms,
	edit,
	save: () => null,
	deprecated,
};

export { name, category, metadata, settings };
