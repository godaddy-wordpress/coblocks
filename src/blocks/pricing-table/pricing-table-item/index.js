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
import transforms from './transforms';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Pricing Table Item' ),
	description: __( 'A pricing table to help visitors compare products and plans.' ),
	icon,
	keywords: [ __( 'landing' ), __( 'comparison' ), 'coblocks' ],
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
