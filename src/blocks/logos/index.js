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
import save from './save';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Logos & Badges', 'block name' ),
	description: __( 'Add logos, badges, or certifications to build credibility.' ),
	icon,
	keywords: [ _x( 'clients', 'block keyword' ), _x( 'proof', 'block keyword' ), _x( 'testimonials', 'block keyword' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	example: {
		attributes: {
			align: 'full',
			images: [
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/logo-1.jpg', width: 420 },
				{ url: '/wp-content/plugins/coblocks/dist/images/examples/logo-2.jpg', width: 340 },
			],
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
