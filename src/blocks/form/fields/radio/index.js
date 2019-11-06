/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
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
		__( 'choose', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'select', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'option', 'coblocks' ) ],
	description: __( 'A field with multiple options where only one choice can be made.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit: editMultiField( 'radio' ),
	save: () => null,
};

export { name, category, metadata, settings };
