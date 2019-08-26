
/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import metadata from './block.json';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.accordion;

const settings = {
	title: __( 'Accordion' ),

	description: __( 'Organize content within collapsable accordion items.' ),

	keywords: [ __( 'tabs' ), __( 'faq' ), __( 'coblocks' ) ],

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

export { name, icon, settings };
