/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import icons from './icons';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'feature';

const title = __( 'Feature' );

const icon = icons.feature;

const blockAttributes = {
	contentAlign: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title,

	description: __( 'A singular child column within a parent features block.' ),

	attributes: blockAttributes,

	parent: [ 'coblocks/features' ],

	supports: {
		inserter: false,
	},

	edit,

	save,
};

export { name, title, icon, settings };
