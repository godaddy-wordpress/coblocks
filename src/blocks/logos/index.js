/**
 * Styles
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icons from './icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { name } = metadata;

const icon = icons.logos;

const settings = {
	title: __( 'Logos & Badges' ),
	description: __( 'Add logos, badges, or certifications to build credibility.' ),
	keywords: [ __( 'clients' ), __( 'proof' ), __( 'testimonials' ) ],
	attributes: metadata.attributes,
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
};

export { name, icon, settings };
