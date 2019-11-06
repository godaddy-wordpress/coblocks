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
	/* translators: block name. */
	title: __( 'Map', 'coblocks' ),
	description: __( 'Add an address or location to drop a pin on a Google map.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword. */
		__( 'address', 'coblocks' ),
		/* translators: block keyword. */
		__( 'maps', 'coblocks' ),
		/* translators: block keyword. */
		__( 'google', 'coblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	example: {
		attributes: {
			align: 'wide',
			address: 'Scotsdale, Arizona',
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
