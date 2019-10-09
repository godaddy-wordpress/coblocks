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
	title: _x( 'Post Carousel', 'block name' ),
	description: __( 'Display posts or an external blog feed as a carousel.' ),
	icon,
	keywords: [ _x( 'posts', 'block keyword' ), _x( 'slider', 'block keyword' ), _x( 'latest', 'block keyword' ) ],
	supports,
	transforms,
	edit,
	save() {
		return null;
	},
};

export { name, category, metadata, settings };
