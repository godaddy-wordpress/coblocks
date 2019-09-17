/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import { BackgroundAttributes } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Column', 'block name' ),
	description: __( 'An immediate child of a row.' ),
	icon,
	parent: [ 'coblocks/row' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		const { paddingSize } = attributes;

		// If the column block has children, return the following.
		if ( paddingSize !== 'advanced' && paddingSize === 'no' ) {
			return { 'data-background-dropzone': false };
		}
	},
	save,
	deprecated,
};

export { name, category, metadata, settings };
