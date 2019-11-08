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
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name.  */
	title: __( 'Author', 'coblocks' ),
	description: __( 'Add an author biography to build credibility and authority.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'biography', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'profile', 'coblocks' ),
		'coblocks' ],
	example: {
		attributes: {
			name: 'Jane Doe',
			biography: __( 'Born to express, not to impress. A maker making the world I want.', 'coblocks' ),
			imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Headey%2C_Lena_%282007%29_%28headshot%29.jpg/383px-Headey%2C_Lena_%282007%29_%28headshot%29.jpg',
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
