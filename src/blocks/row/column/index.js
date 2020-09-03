/**
 * External dependencies
 */
import { ColumnIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { BackgroundAttributes } from '../../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name */
	title: __( 'Column', 'coblocks' ),
	/* translators: block description */
	description: __( 'An immediate child of a row.', 'coblocks' ),
	icon: <Icon icon={ ColumnIcon } />,
	parent: [ 'coblocks/row' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	getEditWrapperProps( blockAttributes ) {
		const { paddingSize } = blockAttributes;

		// If the column block has children, return the following.
		if ( paddingSize !== 'advanced' && paddingSize === 'no' ) {
			return { 'data-background-dropzone': false };
		}
	},
	save,
	deprecated,
};

export { name, category, metadata, settings };
