/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

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
	title: _x( 'Feature', 'block name' ),
	description: __( 'A singular child column within a parent features block.' ),
	icon,
	parent: [ 'coblocks/features' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
