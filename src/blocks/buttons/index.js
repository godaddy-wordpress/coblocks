/**
 * Styles
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
	title: __( 'Buttons', 'coblocks' ),
	description: __( 'Prompt visitors to take action with multiple buttons, side by side.', 'coblocks' ),
	icon,
	keywords: [ __( 'link', 'coblocks' ), __( 'cta', 'coblocks' ), 'coblocks' ],
	attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, category, metadata, settings };
