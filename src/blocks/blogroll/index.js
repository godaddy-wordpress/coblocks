/**
 * Internal dependencies
 */
import edit from './edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

const name = 'blogroll';

const title = __( 'Blogroll' );

const icon = icons.blog;

const settings = {
	title: title,
	description: __( 'Display a list of your most recent posts.' ),
	icon,
	keywords: [ __( 'blog posts' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit,
};

export { name, title, icon, settings };
