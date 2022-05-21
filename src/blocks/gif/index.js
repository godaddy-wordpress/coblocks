/**
 * External dependencies
 */
import { GifIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import { hasFormattingCategory } from '../../utils/block-helpers';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	attributes,
	category: hasFormattingCategory ? 'common' : 'media',
	deprecated,
	/* translators: block description */
	description: __( 'Pick a gif, any gif.', 'coblocks' ),
	edit,
	example: {
		attributes: {
			url: 'https://media4.giphy.com/media/rHR8qP1mC5V3G/giphy.gif',
		},
	},
	getEditWrapperProps( atts ) {
		const { align, width } = atts;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
		/* translators: block keyword */
		__( 'animated', 'coblocks' ),
	],
	save,
	supports: {
		customClassName: false,
		html: false,
	},
	/* translators: block name */
	title: __( 'Gif', 'coblocks' ),
};

export { name, category, metadata, settings };
