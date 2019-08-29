/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icon from './icon';
import edit from './edit';
import metadata from './block.json';
import transforms from './transforms';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

// const icon = icons.highlight;

const settings = {
	title: __( 'Highlight' ),
	description: __( 'Highlight text.' ),
	icon,
	keywords: [ __( 'text' ), __( 'paragraph' ), 'coblocks' ],
	attributes,
	transforms,
	edit,
	save,
};

export { name, settings };
