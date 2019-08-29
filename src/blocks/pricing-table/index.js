/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icon from './icon';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

// const icon = icons.pricing;

const settings = {
	title: __( 'Pricing Table' ),
	description: __( 'Add pricing tables.' ),
	icon,
	keywords: [ __( 'landing' ), __( 'comparison' ), 'coblocks' ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, settings };
