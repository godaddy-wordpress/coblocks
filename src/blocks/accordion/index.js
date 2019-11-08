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
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block title */
	title: __( 'Accordion', 'coblocks' ),
	description: __( 'Organize content within collapsable accordion items.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'tabs', 'coblocks' ),
		/* translators: block keyword */
		__( 'faq', 'coblocks' ),
		'coblocks' ],
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

export { name, category, metadata, settings };
