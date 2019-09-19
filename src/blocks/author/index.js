/**
 * Styles.
 */
import './styles/style.scss';
import './styles/editor.scss';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
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
	title: _x( 'Author', 'block name' ),
	description: __( 'Add an author biography to build credibility and authority.' ),
	icon,
	keywords: [ _x( 'biography', 'block keyword' ), _x( 'profile', 'block keyword' ), 'coblocks' ],
	example: {
		attributes: {
			name: 'Jane Doe',
			biography: __( 'Born to express, not to impress. A maker making the world I want.' ),
			imgUrl: '/wp-content/plugins/coblocks/dist/images/examples/author.jpg',
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
