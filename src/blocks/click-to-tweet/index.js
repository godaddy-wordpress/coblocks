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
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Click to Tweet', 'block name', 'coblocks' ),
	description: __( 'Add a quote for readers to tweet via Twitter.', 'coblocks' ),
	icon,
	keywords: [ _x( 'share', 'block keyword', 'coblocks' ), _x( 'twitter', 'block keyword', 'coblocks' ), 'coblocks' ],
	example: {
		attributes: {
			content: __( 'The easiest way to promote and advertise your blog, website, and business on Twitter.', 'coblocks' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
