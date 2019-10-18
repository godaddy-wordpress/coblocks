/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

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
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Shape Divider', 'block name', 'coblocks' ),
	description: __( 'Add a shape divider to visually distinquish page sections.', 'coblocks' ),
	icon,
	keywords: [ _x( 'separator', 'block keyword', 'coblocks' ), 'hr', 'svg' ],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,

	},
	styles: [
		{ name: 'wavy', label: _x( 'Wavy', 'block style', 'coblocks' ), isDefault: true },
		{ name: 'hills', label: _x( 'Hills', 'block style', 'coblocks' ) },
		{ name: 'waves', label: _x( 'Waves', 'block style', 'coblocks' ) },
		{ name: 'angled', label: _x( 'Angled', 'block style', 'coblocks' ) },
		{ name: 'sloped', label: _x( 'Sloped', 'block style', 'coblocks' ) },
		{ name: 'rounded', label: _x( 'Rounded', 'block style', 'coblocks' ) },
		{ name: 'triangle', label: _x( 'Triangle', 'block style', 'coblocks' ) },
		{ name: 'pointed', label: _x( 'Pointed', 'block style', 'coblocks' ) },
	],
	example: {
		attributes: {
			height: 100,
		},
	},
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
