/**
 * Styles.
 */
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Map', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add an address or location to drop a pin on a Google map.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'address', 'coblocks' ),
		/* translators: block keyword */
		__( 'maps', 'coblocks' ),
		/* translators: block keyword */
		__( 'google', 'coblocks' ),
		/* translators: block keyword */
		__( 'directions', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			align: 'wide',
			address: 'Scottsdale, Arizona',
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
