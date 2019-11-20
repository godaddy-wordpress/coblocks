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
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Logos & Badges', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add logos, badges, or certifications to build credibility.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'clients', 'coblocks' ),
		/* translators: block keyword */
		__( 'proof', 'coblocks' ),
		/* translators: block keyword */
		__( 'testimonials', 'coblocks' ),
		/* translators: block keyword */
		__( 'awards', 'coblocks' ),
		/* translators: block keyword */
		__( 'seal', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	example: {
		attributes: {
			align: 'full',
			images: [
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Wordpress-Logo.svg/600px-Wordpress-Logo.svg.png', width: 420 },
				{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/WordPress.svg/640px-WordPress.svg.png', width: 340 },
			],
		},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings, icon };
