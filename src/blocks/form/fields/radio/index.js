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
	title: __( 'Radio', 'coblocks' ),
	keywords: [
		/* translators: block keyword.  */
		__( 'Choose', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'Select', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'Option', 'coblocks' ) ],
	description: __( 'A field with multiple options where only one choice can be made.', 'coblocks' ),
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
