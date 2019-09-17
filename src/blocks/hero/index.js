/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import CSSGridAttributes from '../../components/grid-control/attributes';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
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
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Hero', 'block name' ),
	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.' ),
	icon,
	keywords: [ _x( 'button', 'block keyword' ), _x( 'cta', 'block keyword' ), _x( 'call to action', 'block keyword' ) ],
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

export { name, category, metadata, settings, attributes };
