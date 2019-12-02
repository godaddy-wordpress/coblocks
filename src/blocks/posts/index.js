/**
 * Styles
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Posts', 'coblocks' ),
	/* translators: block description */
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'posts', 'coblocks' ),
		/* translators: block keyword */
		__( 'blog', 'coblocks' ),
		/* translators: block keyword */
		__( 'latest', 'coblocks' ),
		/* translators: block keyword */
		__( 'rss', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	transforms,
	edit,
	save() {
		return null;
	},
};

export { name, category, settings };
