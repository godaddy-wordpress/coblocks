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
	title: __( 'Gif', 'coblocks' ),
	/* translators: block description */
	description: __( 'Pick a gif, any gif.', 'coblocks' ),
	icon,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'animated', 'coblocks' ),
	],
	supports: {
		customClassName: false,
		html: false,
	},
	attributes,
	getEditWrapperProps( attributes ) {
		const { align, width } = attributes;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},
	edit,
	save,
};

export { name, category, metadata, settings };
