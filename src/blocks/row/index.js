/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import deprecated from './deprecated';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import { getEditWrapperProps } from './utilities';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import { BackgroundAttributes } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

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
	title: _x( 'Row', 'block name', 'coblocks' ),
	description: __( 'Add a structured wrapper for column blocks, then add content blocks you’d like to the columns.', 'coblocks' ),
	icon,
	keywords: [	_x( 'rows', 'block keyword', 'coblocks' ), _x( 'columns', 'block keyword', 'coblocks' ), _x( 'layouts', 'block keyword', 'coblocks' )	],
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

export { name, category, metadata, settings };
