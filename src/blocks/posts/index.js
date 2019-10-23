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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	title: _x( 'Posts', 'block name', 'coblocks' ),
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.', 'coblocks' ),
	icon,
	keywords: [ _x( 'blog', 'block keyword', 'coblocks' ), _x( 'rss', 'block keyword', 'coblocks' ), _x( 'latest', 'block keyword', 'coblocks' ) ],
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
