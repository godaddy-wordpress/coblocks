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
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Pricing Table Item', 'block name' ),
	description: __( 'A pricing table to help visitors compare products and plans.' ),
	icon,
	keywords: [ _x( 'landing', 'block keyword' ), _x( 'comparison', 'block keyword' ), 'coblocks' ],
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
