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
	title: __( 'Email', 'coblocks' ),
	description: __( 'A field for collecting a validated email address.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'e-mail', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'mail', 'coblocks' ) ],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		multiple: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
