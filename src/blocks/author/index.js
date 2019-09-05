/**
 * Styles.
 */
import './styles/style.scss';
import './styles/editor.scss';

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
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Author' ),
	description: __( 'Add an author biography to build credibility and authority.' ),
	icon,
	keywords: [ __( 'biography' ), __( 'profile' ), 'coblocks' ],
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
};

export { name, category, metadata, settings };
