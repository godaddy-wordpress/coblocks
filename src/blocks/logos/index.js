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
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { name, attributes } = metadata;

const settings = {
	title: __( 'Logos & Badges' ),
	description: __( 'Add logos, badges, or certifications to build credibility.' ),
	icon,
	keywords: [ __( 'clients' ), __( 'proof' ), __( 'testimonials' ) ],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes,
	edit,
	save,
};

export { name, metadata, settings };
