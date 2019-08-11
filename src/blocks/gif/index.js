/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Gif' );

const icon = icons.gif;

const settings = {
	title,

	description: __( 'Pick a gif, any gif.' ),

	keywords: [ __( 'animated' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		customClassName: false,
		html: false,
	},

	getEditWrapperProps( attributes ) {
		const { align, width } = attributes;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},

	edit,

	save,
};

export { name, title, icon, settings };

