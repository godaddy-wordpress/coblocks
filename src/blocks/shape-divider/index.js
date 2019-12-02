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
	/* translators: block name */
	title: __( 'Shape Divider', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add a shape divider to visually distinquish page sections.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		'hr',
		'svg',
		/* translators: block keyword */
		__( 'separator', 'coblocks' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},
	styles: [
		{
			name: 'wavy',
			/* translators: block style */
			label: __( 'Wavy', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'hills',
			/* translators: block style */
			label: __( 'Hills', 'coblocks' ),
		},
		{
			name: 'waves',
			/* translators: block style */
			label: __( 'Waves', 'coblocks' ),
		},
		{
			name: 'angled',
			/* translators: block style */
			label: __( 'Angled', 'coblocks' ),
		},
		{
			name: 'sloped',
			/* translators: block style */
			label: __( 'Sloped', 'coblocks' ),
		},
		{
			name: 'rounded',
			/* translators: block style */
			label: __( 'Rounded', 'coblocks' ),
		},
		{
			name: 'triangle',
			/* translators: block style */
			label: __( 'Triangle', 'coblocks' ),
		},
		{
			name: 'pointed',
			/* translators: block style */
			label: __( 'Pointed', 'coblocks' ),
		},
	],
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
