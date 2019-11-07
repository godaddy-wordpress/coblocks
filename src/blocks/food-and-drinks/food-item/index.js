/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Food Item', 'coblocks' ),
	/* translators: block description */
	description: __( 'A food and drink item within the Food & Drinks block.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'menu', 'coblocks' ),
	],
	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},
	parent: [ 'coblocks/food-and-drinks' ],
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
