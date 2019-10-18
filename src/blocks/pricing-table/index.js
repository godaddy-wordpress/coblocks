/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Pricing Table', 'block name', 'coblocks' ),
	description: __( 'Add pricing tables to help visitors compare products and plans.', 'coblocks' ),
	icon,
	keywords: [ _x( 'landing', 'block keyword', 'coblocks' ), _x( 'comparison', 'block keyword', 'coblocks' ), 'coblocks' ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	example: {
		attributes: {
			count: 1,
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
