/**
 * External dependencies
 */
import { GifIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { hasFormattingCategory } from '../../utils/block-helpers';

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
	/* translators: block name */
	title: __( 'Gif', 'coblocks' ),
	/* translators: block description */
	description: __( 'Pick a gif, any gif.', 'coblocks' ),
	category: hasFormattingCategory ? 'common' : 'media',
	icon: <Icon icon={ icon } />,
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
	getEditWrapperProps( atts ) {
		const { align, width } = atts;
		if ( 'left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align, 'data-resized': !! width };
		}
	},
	example: {
		attributes: {

		},
	},
	edit,
	save,
};

export { name, category, metadata, settings };
