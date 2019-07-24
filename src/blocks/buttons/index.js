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
import icons from './icons';
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
const name = 'buttons';

const icon = icons.buttons;

const settings = {
	title: __( 'Buttons' ),
	description: __( 'Prompt visitors to take action with multiple buttons, side by side.' ),
	keywords: [ __( 'link' ), __( 'cta' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	transforms,
	edit,
	save,
	deprecated,
};

export { name, icon, settings };
