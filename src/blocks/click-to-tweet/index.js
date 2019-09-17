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
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Click to Tweet', 'block name' ),
	description: __( 'Add a quote for readers to tweet via Twitter.' ),
	icon,
	keywords: [ _x( 'share', 'block keyword' ), _x( 'twitter', 'block keyword' ), 'coblocks' ],
	example: {
		attributes: {
			content: __( 'The easiest way to promote and advertise your blog, website, and business on Twitter.' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
