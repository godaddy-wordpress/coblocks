/**
 * External dependencies
 */
import { FeatureIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import { BackgroundAttributes } from '../../components/background';

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
	title: __( 'Features', 'coblocks' ),
	/* translators: block description */
	description: __( 'Add up to four columns of small notes for your product or service.', 'coblocks' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblocks',
	],
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
		gutter: {
			default: 'medium',
		},
	},
	example: {
		attributes: {
			align: 'wide',
		},
	},
	attributes,
	transforms,
	edit,
	getEditWrapperProps( wrapperAttributes ) {
		const { id, layout, columns } = wrapperAttributes;

		// If no layout is seleted, return the following.
		if ( ! layout ) {
			return { 'data-id': id, 'data-columns': columns };
		}

		return { 'data-id': id, 'data-columns': columns };
	},
	save,
	deprecated,
};

export { name, category, metadata, settings };
