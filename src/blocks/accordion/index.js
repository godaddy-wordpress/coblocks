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

const settings = {
	title: __( 'Accordion' ),
	description: __( 'Organize content within collapsable accordion items.' ),
	icon,
	keywords: [ __( 'tabs' ), __( 'faq' ), 'coblocks' ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	attributes,
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

export { name, metadata, settings };
