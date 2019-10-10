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
import { __, _x } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Accordion', 'block title' ),
	description: __( 'Organize content within collapsable accordion items.' ),
	icon,
	keywords: [ _x( 'tabs', 'block keyword' ), _x( 'faq', 'block keyword' ), 'coblocks' ],
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
