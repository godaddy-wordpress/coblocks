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
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, supports } = metadata;

const settings = {
	title: _x( 'Posts', 'block name' ),
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.' ),
	icon,
	keywords: [ _x( 'blog', 'block keyword' ), _x( 'rss', 'block keyword' ), _x( 'latest', 'block keyword' ) ],
	supports,
	transforms,
	edit,
	save() {
		return null;
	},
};

export { name, category, metadata, settings };
