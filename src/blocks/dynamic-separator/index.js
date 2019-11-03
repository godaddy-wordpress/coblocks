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
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Dynamic HR', 'coblocks' ),
	description: __( 'Add a resizable spacer between other blocks.', 'coblocks' ),
	icon,
	keywords: [ __( 'spacer', 'coblocks' ), 'hr', 'coblocks' ],
	styles: [
		{ name: 'dots', label: __( 'Dot', 'coblocks' ), isDefault: true },
		{ name: 'line', label: __( 'Line', 'coblocks' ) },
		{ name: 'fullwidth', label: __( 'Fullwidth', 'coblocks' ) },
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
};

export { name, category, metadata, settings };
