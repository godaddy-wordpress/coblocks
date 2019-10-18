/**
 * Styles.
 */
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import transforms from './transforms';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Pricing Table Item', 'block name', 'coblocks' ),
	description: __( 'A pricing table to help visitors compare products and plans.', 'coblocks' ),
	icon,
	keywords: [ _x( 'landing', 'block keyword', 'coblocks' ), _x( 'comparison', 'block keyword', 'coblocks' ), 'coblocks' ],
	parent: [ 'coblocks/pricing-table' ],
	supports: {
		html: false,
		inserter: false,
		reusable: false,
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
