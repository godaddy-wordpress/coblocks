/**
 * Internal dependencies
 */
import edit from './edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

const name = 'blog';

const title = __( 'Blog' );

const icon = icons.blog;

const settings = {
	title: title,
	description: __( 'Display a list of your most recent posts.' ),
	icon,
	category: 'widgets',
	keywords: [ __( 'blog posts' ) ],
	styles: [
		{ name: 'grid', label: _x( 'Grid', 'block style' ), isDefault: true },
		{ name: 'list', label: _x( 'List', 'block style' ) },
		{ name: 'carousel', label: _x( 'Carousel', 'block style' ) },
	],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit,
};

export { name, title, icon, settings };
