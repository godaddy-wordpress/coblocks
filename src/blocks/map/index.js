/**
 * Styles.
 */
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const settings = {
	title: __( 'Map' ),
	description: __( 'Add an address and drop a pin on a Google map.' ),
	icon,
	keywords: [ __( 'address' ), __( 'maps' ), __( 'google' ) ],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, metadata, settings };
