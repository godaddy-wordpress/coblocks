/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name.  */
	title: __( 'Date', 'coblocks' ),
	keywords: [
		/* translators: block keyword.  */
		__( 'calendar', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'day month year', 'coblocks' ) ],
	description: __( 'A field for requesting date selections with a date picker.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
