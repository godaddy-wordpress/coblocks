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
	title: __( 'Posts', 'coblocks' ),
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.', 'coblocks' ),
	icon,
	keywords: [ __( 'blog', 'coblocks' ), __( 'rss', 'coblocks' ), __( 'latest', 'coblocks' ) ],
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
