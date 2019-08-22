/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import transforms from './transforms';
import deprecated from './deprecated';
import save from './save';
import metadata from './block.json';
import getEditWrapperProps from './getEditWrapperProps';
import icons from './../../utils/icons';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Row' );

const icon = icons.row;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.' ),

	keywords: [	__( 'rows' ), __( 'columns' ), __( 'layouts' )	],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},

	transforms,

	edit,

	getEditWrapperProps,

	save,

	deprecated,
};

export { name, title, icon, settings };
