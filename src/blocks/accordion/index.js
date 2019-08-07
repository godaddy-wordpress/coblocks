
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Accordion' );

const icon = icons.accordion;

const settings = {

	title,

	description: __( 'Organize content within collapsable accordion items.' ),

	keywords: [	__( 'tabs' ), __( 'faq' ), __( 'coblocks' ) ],

	attributes,

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
