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
import icon from './icon';
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

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: __( 'Row' ),
	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.' ),
	icon,
	keywords: [	__( 'rows' ), __( 'columns' ), __( 'layouts' )	],
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		stackedOnMobile: true,
		coBlocksSpacing: true,
	},
	attributes,
	transforms,
	edit,
	getEditWrapperProps,
	save,
	deprecated,
};

export { name, settings };
