/**
 * External dependencies
 */
import { LogosIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import { getBlockIconColor } from '../../utils/helper';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Logos', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add logos, badges, or certifications to build credibility.', 'coblocks' ),
	icon: {
		foreground: getBlockIconColor(),
		src: <Icon icon={ icon } />,
	},
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
	styles: [
		{
			name: 'default',
			/* translators: block style */
			label: __( 'Default', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'grayscale',
			/* translators: block style */
			label: __( 'Grayscale', 'coblocks' ),
		},
		{
			name: 'black-and-white',
			/* translators: block style */
			label: __( 'Black & White', 'coblocks' ),
		},
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
	deprecated,
};

export { name, category, metadata, settings };
