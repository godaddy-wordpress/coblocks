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

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Accordion Item', 'This is an inner block for the Accordion Block.' ),
	description: __( 'Add collapsable accordion items to accordions.' ),
	icon,
	keywords: [ _x( 'tabs', 'block keyword' ), _x( 'faq', 'block keyword' ), 'coblocks' ],
	parent: [ 'coblocks/accordion' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
