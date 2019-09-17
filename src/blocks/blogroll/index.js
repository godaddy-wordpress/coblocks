/**
 * Internal dependencies
 */
import edit from './edit';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const name = 'blogroll';

const title = __( 'Blogroll' );

const icon = icons.blog;

const keywords = [
	__( 'posts' ),
	__( 'articles' ),
];

const settings = {
	title: title,
	description: __( 'Display a list of your most recent posts.' ),
	icon,
	keywords: keywords,
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit,
};

export { name, title, icon, settings };
