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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Map', 'block name', 'coblocks' ),
	description: __( 'Add an address or location to drop a pin on a Google map.', 'coblocks' ),
	icon,
	keywords: [ _x( 'address', 'block keyword', 'coblocks' ), _x( 'maps', 'block keyword', 'coblocks' ), _x( 'google', 'block keyword', 'coblocks' ) ],
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
