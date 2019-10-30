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
import transforms from './transforms';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Highlight', 'block name', 'coblocks' ),
	description: __( 'Draw attention and emphasize important narrative.', 'coblocks' ),
	icon,
	keywords: [ _x( 'text', 'block keyword', 'coblocks' ), _x( 'paragraph', 'block keyword', 'coblocks' ), 'coblocks' ],
	example: {
		attributes: {
			content: __( 'Add a highlight effect to paragraph text in order to grab attention and emphasize important narrative.', 'coblocks' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
