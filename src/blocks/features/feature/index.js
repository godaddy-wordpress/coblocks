/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import icon from './icon';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'coblocks/feature';

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
	title: __( 'Feature' ),
	description: __( 'A singular child column within a parent features block.' ),
	icon,
	parent: [ 'coblocks/features' ],
	supports: {
		inserter: false,
	},
	attributes: blockAttributes,
	edit,
	save,
};

export { name, settings };
