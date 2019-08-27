
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'accordion';

const title = __( 'Accordion' );

const icon = icons.accordion;

const blockAttributes = {
	count: {
		type: 'number',
		default: 1,
	},
	polyfill: {
		type: 'boolean',
		default: false,
	},
};

const settings = {

	title,

	description: __( 'Organize content within collapsable accordion items.' ),

	keywords: [	__( 'tabs' ), __( 'faq' ), 'coblocks' ],

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},

	transforms,

	edit,

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
