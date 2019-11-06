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
	/* translators: block name. */
	title: __( 'Shape Divider', 'coblocks' ),
	description: __( 'Add a shape divider to visually distinquish page sections.', 'coblocks' ),
	icon,
	keywords: [ /* translators: block keyword. */ __( 'separator', 'coblocks' ), 'hr', 'svg' ],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,

	},
	styles: [
		{ name: 'wavy', label: /* translators: block style. */ __( 'Wavy', 'coblocks' ), isDefault: true },
		{ name: 'hills', label: /* translators: block style. */ __( 'Hills', 'coblocks' ) },
		{ name: 'waves', label: /* translators: block style. */ __( 'Waves', 'coblocks' ) },
		{ name: 'angled', label: /* translators: block style. */ __( 'Angled', 'coblocks' ) },
		{ name: 'sloped', label: /* translators: block style. */ __( 'Sloped', 'coblocks' ) },
		{ name: 'rounded', label: /* translators: block style. */ __( 'Rounded', 'coblocks' ) },
		{ name: 'triangle', label: /* translators: block style. */ __( 'Triangle', 'coblocks' ) },
		{ name: 'pointed', label: /* translators: block style. */ __( 'Pointed', 'coblocks' ) },
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
