/**
 * Internal dependencies
 */
import edit from './edit';
import icons from './icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name, category, supports } = metadata;

const title = __( 'Blogroll' );

const icon = icons.blog;

const settings = {
	title: title,
	description: __( 'Display a list of your most recent posts.' ),
	icon,
	keywords: [ __( 'posts' ), __( 'articles' ), 'coblocks' ],
	supports,
	edit,
	save: function( props ) {
		return null;
	},
};

export { name, category, title, icon, settings };
