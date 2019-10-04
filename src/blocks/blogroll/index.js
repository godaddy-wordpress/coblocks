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

/**
 * WordPress dependencies
 */
const { __, _x} = wp.i18n;

/**
 * Block constants
 */
const { name, category, supports } = metadata;

const settings = {
	title: _x( 'Blogroll', 'block name' ),
	description: __( 'Display a list of your most recent posts or an external blog feed.' ),
	icon,
	keywords: [ _x( 'posts', 'block keyword' ), _x( 'articles', 'block keyword' ) ],
	supports,
	edit,
	save: function() {
		return null;
	},
};

export { name, category, metadata, settings };
