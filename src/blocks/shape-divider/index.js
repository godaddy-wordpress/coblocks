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
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Shape Divider', 'coblocks' ),
	description: __( 'Add a shape divider to visually distinquish page sections.', 'coblocks' ),
	icon,
	keywords: [ __( 'separator', 'coblocks' ), 'hr', 'svg' ],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,

	},
	styles: [
		{ name: 'wavy', label: __( 'Wavy', 'coblocks' ), isDefault: true },
		{ name: 'hills', label: __( 'Hills', 'coblocks' ) },
		{ name: 'waves', label: __( 'Waves', 'coblocks' ) },
		{ name: 'angled', label: __( 'Angled', 'coblocks' ) },
		{ name: 'sloped', label: __( 'Sloped', 'coblocks' ) },
		{ name: 'rounded', label: __( 'Rounded', 'coblocks' ) },
		{ name: 'triangle', label: __( 'Triangle', 'coblocks' ) },
		{ name: 'pointed', label: __( 'Pointed', 'coblocks' ) },
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
